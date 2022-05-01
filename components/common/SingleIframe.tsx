import { useState, useMemo, useEffect, useRef, useCallback, memo } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Toggle from './Toggle';
import Chat from './Chat';

const SingleIframe = () => {
  const [state, setState] = useState('toggle');
  const containerRef = useRef<HTMLElement>(null);

  const updateIframeSize = useCallback(() => {
    const container = containerRef.current;
    requestAnimationFrame(() => {
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
    });
  }, []);

  // initial mount
  useEffect(() => {
    updateIframeSize();
  }, [updateIframeSize]);

  const chatNode = useMemo(
    () => <Chat onClick={() => setState('toggle')} />,
    []
  );
  const toggleNode = useMemo(
    () => <Toggle onClick={() => setState('chat')} />,
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
    <section className="w-fit m-0" ref={containerRef}>
      <SwitchTransition>
        <CSSTransition
          key={state}
          classNames="fade"
          timeout={300}
          onEnter={updateIframeSize}
          onExited={updateIframeSize}
          addEndListener={handleAnimationEnd}
        >
          <>{state === 'chat' ? chatNode : toggleNode}</>
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
};

export default memo(SingleIframe);
