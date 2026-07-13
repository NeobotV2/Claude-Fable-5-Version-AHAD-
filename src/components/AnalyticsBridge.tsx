import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { rememberAttribution, trackEvent } from '@/lib/analytics';

const destinationPath = (anchor: HTMLAnchorElement) => {
  try {
    return new URL(anchor.href, window.location.origin).pathname;
  } catch {
    return '';
  }
};

export default function AnalyticsBridge() {
  const location = useLocation();

  useEffect(() => {
    rememberAttribution(window.location.href);
  }, []);

  useEffect(() => {
    const seen = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const threshold of [25, 50, 75, 90]) {
        if (depth >= threshold && !seen.has(threshold)) {
          seen.add(threshold);
          trackEvent('Scroll Depth', { path: location.pathname, depth: threshold });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute('href') || '';
      const path = destinationPath(anchor);

      if (href.startsWith('tel:')) {
        trackEvent('Phone Click', { path: location.pathname });
      } else if (href.startsWith('mailto:')) {
        trackEvent('Email Click', { path: location.pathname });
      } else if (href.includes('wa.me')) {
        trackEvent('WhatsApp Click', { path: location.pathname });
      } else if (path === '/angebot') {
        rememberAttribution(window.location.href);
        trackEvent('Offer CTA Click', { path: location.pathname });
      } else if (path === '/karriere/bewerbung') {
        trackEvent('Application CTA Click', { path: location.pathname });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname]);

  return null;
}
