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

  // Implementation:
  // - Only change iframe size on chat enter/exited (larger screen)
  // - Button will be absolute position to prevent jumping on iframe size change 

  return (
    <>
      <CSSTransition
        in={state === 'toggle'}
        classNames="switch"
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <section className="w-fit m-0 absolute bottom-0 right-0 will-change-auto">
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
        onEnter={() => updateIframeSize(chatRef.current)} // only handle resize on chat (larger screen)
        onExited={() => updateIframeSize(toggleRef.current)} // only handle resize on chat (larger screen)
      >
        <section className="w-fit m-0 will-change-auto">
          <div ref={chatRef}>
            <Chat onClick={() => setState('toggle')} />
          </div>
        </section>
      </CSSTransition>
    </>
  );
};

export default SingleIframeSwitch;
