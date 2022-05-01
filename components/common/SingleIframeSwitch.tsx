import { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import Toggle from './Toggle';
import Chat from './Chat';

const SingleIframeSwitch = () => {
  const [state, setState] = useState('toggle');

  const chatRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

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
  }, []);

  // Pros:
  // - Could have different animations
  // - Animations are parallel

  // Cons:
  // - Complicated timing handling
  // - Might only have entry animation

  return (
    <>
      <CSSTransition
        in={state === 'toggle'}
        classNames="switch"
        timeout={0}
        mountOnEnter
        unmountOnExit
        onEnter={() => updateIframeSize(toggleRef.current)}
      >
        <section className="w-fit">
          <div ref={toggleRef}>
            <Toggle onClick={() => setState('chat')} />
          </div>
        </section>
      </CSSTransition>
      <CSSTransition
        in={state === 'chat'}
        classNames="switch"
        timeout={300}
        mountOnEnter
        unmountOnExit
        onEnter={() => updateIframeSize(chatRef.current)}
      >
        <section className="w-fit">
          <div ref={chatRef}>
            <Chat onClick={() => setState('toggle')} />
          </div>
        </section>
      </CSSTransition>
    </>
  );
};

export default SingleIframeSwitch;
