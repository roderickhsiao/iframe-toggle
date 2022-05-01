import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Toggle from './Toggle';
import Chat from './Chat';

const SingleIframe = () => {
  const [state, setState] = useState('toggle');
  const [messageState, setMessageState] = useState('toggle');
  const containerRef = useRef<HTMLElement>(null);

  const updateIframeSize = useCallback(() => {
    const container = containerRef.current;
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
    updateIframeSize()
  }, [updateIframeSize]);

  const node = useMemo(() => {
    if (state === 'chat') {
      return <Chat onClick={() => setState('toggle')} />;
    } else {
      return <Toggle onClick={() => setState('chat')} />;
    }
  }, [state]);

  // Pros:
  // - Simpler iframe resizing logic
  // - Simpler rendering logic
  // - Won't have race condition for re-render and iframe size update

  // Cons:
  // - Animation happens in sequence, not parallel

  return (
    <section className="w-fit" ref={containerRef}>
      <SwitchTransition>
        <CSSTransition
          key={state}
          classNames="fade"
          timeout={300}
          onEnter={updateIframeSize}
          onExited={updateIframeSize}
        >
          {node}
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
};

export default SingleIframe;
