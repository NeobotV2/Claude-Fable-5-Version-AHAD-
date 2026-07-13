import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const isInitialRender = useRef(true);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content');
    main?.setAttribute('tabindex', '-1');

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      main?.focus({ preventScroll: true });
      setAnnouncement(document.title);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, search]);

  return (
    <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {announcement}
    </span>
  );
}
