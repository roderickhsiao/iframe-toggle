import { useCallback, useRef, useEffect } from 'react';
import Home from '../components/MainApp';

const HomePage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const handleIframeResize = useCallback((event: MessageEvent) => {
    const message = event.data;
    switch (event.data.type) {
      case 'resize': {
        requestAnimationFrame(() => {
          if (!iframeRef.current) {
            return;
          }
          iframeRef.current.style.height = message.height + 'px';
          iframeRef.current.style.width = message.width + 'px';
        });

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
    - Similar animation logic for multiple iFrames
    - Use solely CSS and React to handle animation (without css-transition-group)

  Cons:
    - React needs to re-render twice to signal the end of a transition

  Implementation:
    - User Pure CSS + React (keyframe)
    - Toggle Button absolutely positioned
    - Update iframe size on transition end

  `;

  return (
    <>
      <Home
        title="Single Iframe (React + CSS)"
        note={note}
        description="Use Single Iframe/Single PWA to handle state change, use Pure CSS"
      />
      <iframe
        src="/single-iframe-pure-css"
        className="fixed right-0 bottom-0 border-0 w-0 h-0 overflow-hidden"
        ref={iframeRef}
      />
    </>
  );
};

export default HomePage;
