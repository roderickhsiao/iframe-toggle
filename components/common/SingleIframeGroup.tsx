import { memo, useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Toggle from './Toggle';
import Chat from './Chat';

const SingleIframeGroup = () => {
  const [state, setState] = useState('toggle');
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

  const chatNode = useMemo(
    () => (
      <section className="w-fit m-0 will-change-auto" ref={chatRef}>
        <Chat onClick={() => setState('toggle')} />
      </section>
    ),
    []
  );

  const toggleNode = useMemo(
    () => (
      <section
        className="w-fit m-0 absolute bottom-0 right-0 will-change-auto"
        ref={toggleRef}
      >
        <Toggle onClick={() => setState('chat')} />
      </section>
    ),
    []
  );

  const handleAnimationEnd = useCallback(
    (node: HTMLElement, done: VoidFunction) => {
      // use the css transitionend event to mark the finish of a transition
      node.addEventListener('animationend', done, false);
    },
    []
  );

  return (
    <TransitionGroup>
      <CSSTransition
        key={state}
        classNames="switch"
        timeout={300}
        onEnter={
          state === 'chat' ? () => updateIframeSize(chatRef.current) : undefined
        }
        onExited={
          state === 'chat'
            ? () => updateIframeSize(toggleRef.current)
            : undefined
        }
        addEndListener={handleAnimationEnd}
      >
        {state === 'chat' ? chatNode : toggleNode}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default memo(SingleIframeGroup);
