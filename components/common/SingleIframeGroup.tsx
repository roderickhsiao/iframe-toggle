import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Toggle from './Toggle';
import Chat from './Chat';

const SingleIframeGroup = () => {
  const [state, setState] = useState('toggle');
  const [messageState, setMessageState] = useState('toggle');
  const toggleRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLElement>(null);

  const updateIframeSize = useCallback((container: HTMLElement | null) => {
    if (!container) {
      return;
    }
    // window.top refers to parent window
    const message = {
      type: 'resize',
      height: container.getBoundingClientRect().height,
      width: container.getBoundingClientRect().width,
    };

    window?.top?.postMessage(message, '*');
  }, []);

  // initial mount
  useEffect(() => {
    updateIframeSize(state === 'toggle' ? toggleRef.current : chatRef.current);
  }, [updateIframeSize]);

  const node = useMemo(() => {
    if (state === 'chat') {
      return (
        <section className="w-fit m-0 will-change-auto" ref={chatRef}>
          <Chat onClick={() => setState('toggle')} />
        </section>
      );
    }
    return (
      <section className="w-fit m-0 absolute bottom-0 right-0 will-change-auto" ref={toggleRef}>
        <Toggle onClick={() => setState('chat')} />
      </section>
    );
  }, [state]);

  return (
    <TransitionGroup>
      <CSSTransition
        key={state}
        classNames="switch"
        timeout={400}
        onEnter={
          state === 'chat' ? () => updateIframeSize(chatRef.current) : undefined
        }
        onExited={
          state === 'chat'
            ? () => updateIframeSize(toggleRef.current)
            : undefined
        }
      >
        {node}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SingleIframeGroup;
