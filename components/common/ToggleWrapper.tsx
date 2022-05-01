import { useCallback, useRef, useEffect } from 'react';

import Toggle from './Toggle';

const ToggleWrapper = () => {
  const nodeRef = useRef<HTMLElement>(null);
  const switchIframe = useCallback(() => {
    // window.top refers to parent window
    const message = {
      type: 'switch',
      name: 'chat',
    };

    window?.top?.postMessage(message, '*');
  }, []);

  const updateIframeSize = useCallback(() => {
    if (nodeRef.current) {
      const message = {
        type: 'resize',
        name: 'toggle',
        height: nodeRef.current.getBoundingClientRect().height,
        width: nodeRef.current.getBoundingClientRect().width,
      };
      window?.top?.postMessage(message, '*');

    }
  }, []);

  useEffect(() => {
    updateIframeSize();
  }, [updateIframeSize]);

  return (
    <section className="w-fit m-0" ref={nodeRef}>
      <Toggle onClick={switchIframe} />
    </section>
  );
};

export default ToggleWrapper;
