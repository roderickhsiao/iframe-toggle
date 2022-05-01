import { useCallback, useRef, useEffect, memo } from 'react';

import Chat from './Chat';

const ChatWrapper = () => {
  const nodeRef = useRef<HTMLElement>(null);
  const switchIframe = useCallback(() => {
    // window.top refers to parent window
    const message = {
      type: 'switch',
      name: 'toggle',
    };

    window?.top?.postMessage(message, '*');
  }, []);

  const updateIframeSize = useCallback(() => {
    requestAnimationFrame(() => {
      if (nodeRef.current) {
        const message = {
          type: 'resize',
          name: 'chat',
          height: nodeRef.current.getBoundingClientRect().height,
          width: nodeRef.current.getBoundingClientRect().width,
        };
        window?.top?.postMessage(message, '*');
      }
    });
  }, [nodeRef]);

  useEffect(() => {
    updateIframeSize();
  }, [updateIframeSize]);

  return (
    <section className="w-fit m-0 will-change-auto" ref={nodeRef}>
      <Chat onClick={switchIframe} />
    </section>
  );
};

export default memo(ChatWrapper);
