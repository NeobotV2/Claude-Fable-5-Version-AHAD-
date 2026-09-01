import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Spätestens nach dieser Zeit wird der Seitentitel angesagt, auch wenn er sich nicht änderte. */
const ANNOUNCE_FALLBACK_MS = 1500;

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
    });

    // Alle Unterseiten laden lazy: Beim Routenwechsel steht im <title> zunächst
    // noch die alte Seite. Angesagt wird deshalb erst, wenn Helmet den Titel
    // geändert hat – spätestens aber nach dem Fallback-Intervall.
    const previousTitle = document.title;
    let announced = false;
    const announce = () => {
      if (announced) return;
      announced = true;
      observer.disconnect();
      window.clearTimeout(fallback);
      setAnnouncement(document.title);
    };
    const observer = new MutationObserver(() => {
      if (document.title !== previousTitle) announce();
    });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    const fallback = window.setTimeout(announce, ANNOUNCE_FALLBACK_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname, search]);

  return (
    <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {announcement}
    </span>
  );
}
