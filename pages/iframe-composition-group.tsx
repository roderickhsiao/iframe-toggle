import { useCallback, useRef, useEffect } from 'react';
import Home from '../components/MainApp';

const HomePage = () => {
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
    - Simpler iframe resizing logic
    - Simpler rendering logic
    - Won't have race condition for re-render and iframe size update

  Cons:
    - Condition rendering might be complicated if we have more items to switch
    - Each child is cloned inside Transition Group
    - Rendering during transition could cause render performance issue
  
  Implementation:
    - Use Transition Group to change single layout

  `;

  return (
    <>
      <Home
        title="Single Iframe TransitionGroup"
        note={note}
        description="Use Single Iframe/Single PWA to handle state change, TransitionGroup"
      />
      <iframe
        src="/single-iframe-group"
        className="fixed right-0 bottom-0 border-0 w-0 h-0 overflow-hidden"
        ref={iframeRef}
      />
    </>
  );
};

export default HomePage;