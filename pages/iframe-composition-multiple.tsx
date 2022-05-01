import { useCallback, useRef, useEffect, useMemo } from 'react';
import Home from '../components/MainApp';

const HomePage = () => {
  const iframesRef = {
    chat: useRef<HTMLIFrameElement>(null),
    toggle: useRef<HTMLIFrameElement>(null),
  };

  const handleIframeMessage = useCallback((event: MessageEvent) => {
    const message = event.data;
    switch (event.data.type) {
      case 'resize': {
        const { name } = message;
        const iframe = iframesRef[name as keyof typeof iframesRef]?.current;
        if (iframe) {
          iframe.style.height = message.height + 'px';
          iframe.style.width = message.width + 'px';
        }
        break;
      }
      case 'switch': {
        const { name } = message;
        const toggle = iframesRef.toggle.current;
        const chat = iframesRef.chat.current;

        // from chat -> toggle
        if (name === 'toggle') {
          toggle?.addEventListener(
            'animationend',
            () => {
              toggle?.classList.remove(
                'animate__animated',
                'animate__fadeInUp',
                'animate__fadeOutDown',
                'pointer-events-none'
              );
            },
            { once: true }
          );

          chat?.addEventListener(
            'animationend',
            () => {
              chat?.classList.remove(
                'animate__animated',
                'animate__fadeInUp',
                'animate__fadeOutDown'
              );
              chat?.classList.add('opacity-0');
            },
            { once: true }
          );

          requestAnimationFrame(() => {
            // show both
            toggle?.classList.remove('opacity-0');
            chat?.classList.remove('opacity-0');

            chat?.classList.add(
              'animate__animated',
              'animate__fadeOutDown',
              'pointer-events-none'
            );
            toggle?.classList.add(
              'animate__animated',
              'animate__fadeInUp',
              'pointer-events-none'
            );
          });
        }

        // from toggle -> chat
        if (name === 'chat') {
          chat?.addEventListener(
            'animationend',
            () => {
              chat?.classList.remove(
                'animate__animated',
                'animate__fadeInUp',
                'animate__fadeOutDown',
                'pointer-events-none'
              );
            },
            { once: true }
          );

          toggle?.addEventListener(
            'animationend',
            () => {
              // hide toggle
              toggle?.classList.remove(
                'animate__animated',
                'animate__fadeOutDown',
                'animate__fadeInUp'
              );
              toggle?.classList.add('opacity-0');
            },
            { once: true }
          );
          // init
          requestAnimationFrame(() => {
            // shop both
            toggle?.classList.remove('opacity-0');
            chat?.classList.remove('opacity-0');

            chat?.classList.add(
              'animate__animated',
              'animate__fadeInUp',
              'pointer-events-none'
            );
            toggle?.classList.add(
              'animate__animated',
              'animate__fadeOutDown',
              'pointer-events-none'
            );
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [handleIframeMessage]);

  const note = `
  Pros:
    - Abstraction for switching iframe
    - React app doesn't need to know current state (no re-render needed)
    - iframe size remains the same, less painting
    - Less likely to have race condition
    - Best painting performance

  Cons:
    - Need to change base assumptions (only one app will activated at a time)
    - Need to be very cautious about browser paint frame update

  Implementation:
    - Hand craft CSS transition outside of React app
  `;

  return (
    <>
      <Home title="Multiple Iframes" note={note} description="Create multiple iframes and handle entry/exit outside of React app" />
      <iframe
        src="/multiple-iframes-chat"
        className="fixed right-0 bottom-0 border-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none ease-in-out"
        ref={iframesRef.chat}
      />
      <iframe
        src="/multiple-iframes-toggle"
        className="fixed right-0 bottom-0 border-0 w-0 h-0 overflow-hidden ease-in-out"
        ref={iframesRef.toggle}
      />
    </>
  );
};

export default HomePage;
