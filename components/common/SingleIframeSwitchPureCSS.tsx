import { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';

import Toggle from './Toggle';
import Chat from './Chat';

const SingleIframeSwitchPureCSS = () => {
  const [state, setState] = useState('toggle');
  const [iframeState, setIframeState] = useState('toggle');

  const chatRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const toggleContainerRef = useRef<HTMLDivElement>(null);

  const isTransitioning = useMemo(
    () => state !== iframeState,
    [state, iframeState]
  );

  const fromToggleToChat = useMemo(
    () => isTransitioning && iframeState === 'toggle',
    [isTransitioning, iframeState]
  );
  const fromChatToToggle = useMemo(
    () => isTransitioning && iframeState === 'chat',
    [isTransitioning, iframeState]
  );

  const updateIframeSize = useCallback((container: HTMLElement | null) => {
    // window.top refers to parent window
    if (!container) {
      return;
    }
    const message = {
      type: 'resize',
      height: container.getBoundingClientRect().height,
      width: container.getBoundingClientRect().width,
    };

    window?.top?.postMessage(message, '*');
  }, []);

  const toggleNode = useMemo(
    () => (
      <div ref={toggleRef}>
        <Toggle onClick={() => setState('chat')} />
      </div>
    ),
    []
  );

  const chatNode = useMemo(
    () => (
      <div ref={chatRef}>
        <Chat onClick={() => setState('toggle')} />
      </div>
    ),
    []
  );

  useEffect(() => {
    const handleAnimationEnd = () => {
      setIframeState((prevState) =>
        prevState === 'toggle' ? 'chat' : 'toggle'
      );
    };

    const toggle = toggleContainerRef.current;
    const chat = chatContainerRef.current;
    if (fromToggleToChat) {
      chat?.addEventListener('animationend', handleAnimationEnd, {
        once: true,
      });
    } else if (fromChatToToggle) {
      toggle?.addEventListener('animationend', handleAnimationEnd, {
        once: true,
      });
    }

    return () => {
      toggle?.removeEventListener('animationend', handleAnimationEnd);
      chat?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [fromChatToToggle, fromToggleToChat, setIframeState, state]);

  // transition starts
  useEffect(() => {
    if (isTransitioning) {
      updateIframeSize(chatRef.current);
    }
  }, [updateIframeSize, isTransitioning]);

  // transition end
  useEffect(() => {
    if (!isTransitioning) {
      updateIframeSize(
        iframeState === 'toggle' ? toggleRef.current : chatRef.current
      );
    }
  }, [iframeState, isTransitioning, updateIframeSize]);

  return (
    <>
      <div
        className={clsx('ease-in-out', 'w-fit m-0 absolute bottom-0 right-0', {
          'will-change-auto animate__animated': isTransitioning,
          'opacity-0 pointer-events-none invisible':
            !isTransitioning && iframeState === 'chat',
          animate__fadeInUp: fromChatToToggle,
          animate__fadeOutDown: fromToggleToChat,
        })}
        ref={toggleContainerRef}
      >
        {toggleNode}
      </div>
      <div
        className={clsx('ease-in-out', 'w-fit m-0', {
          'will-change-auto animate__animated': isTransitioning,
          'opacity-0 pointer-events-none invisible':
            !isTransitioning && iframeState === 'toggle',
          animate__fadeInUp: fromToggleToChat,
          animate__fadeOutDown: fromChatToToggle,
        })}
        ref={chatContainerRef}
      >
        {chatNode}
      </div>
    </>
  );
};

export default memo(SingleIframeSwitchPureCSS);
