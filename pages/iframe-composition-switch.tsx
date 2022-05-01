import { useCallback, useRef, useEffect } from 'react';
import Home from '../components/MainApp';

const IframeCompositionSwitch = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const handleIframeResize = useCallback((event: MessageEvent) => {
    if (!iframeRef.current) {
      return;
    }
    const message = event.data;
    switch (event.data.type) {
      case 'resize': {
        iframeRef.current.style.height = message.height + 'px';
        iframeRef.current.style.width = message.width + 'px';
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleIframeResize);

    return () => {
      window.removeEventListener('message', handleIframeResize);
    };
  }, [handleIframeResize]);

  const note = `
  Pros:
    - Could have different animations
    - Animations are parallel
    - Current implementation, no main logics changes

  Cons:
    - Complicated timing handling

  Implementation:
   - Only change iframe size on chat enter/exited (larger screen)
   - Button will be absolute position to prevent jumping on iframe size change 
  `;

  return (
    <>
      <Home title="Single Iframe Switch Layout" note={note} description="Current Implementation, use CSSTransition to toggle two layout"/>
      <iframe
        src="/single-iframe-switch"
        className="fixed right-0 bottom-0 border-0 w-0 h-0 overflow-hidden"
        ref={iframeRef}
      />
    </>
  );
};

export default IframeCompositionSwitch;
