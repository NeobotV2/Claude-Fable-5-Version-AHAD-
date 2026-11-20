import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, FileText } from 'lucide-react';
import { STICKY_CTA_HIDDEN_PATHS as HIDDEN_PATHS, SITE } from '@/lib/site';
import { buttonClasses } from '@/components/ui/Button';

/**
 * Mobile Conversion-Leiste: Anruf + Angebot immer einen Daumen entfernt.
 * Erscheint erst nach dem ersten Scroll, verschwindet auf Funnel-Seiten.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {visible && !hidden && (
        <div
          data-page-action="mobile-sticky-cta"
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)] animate-slide-up"
        >
          {/* auto+1fr statt 50/50: „Anrufen" kompakt, der längere Besichtigungs-CTA
              bekommt die Restbreite und bleibt so auf gängigen Handys einzeilig.
              Falls er auf sehr schmalen Geräten doch umbricht: zentriert statt
              linksbündig hängend (text-center + leading-snug). */}
          <div className="bg-white border-t border-line px-4 py-3 grid grid-cols-[auto_1fr] gap-3">
            <a
              href={SITE.phoneHref}
              aria-label={`AHAD Cleaning anrufen: ${SITE.phone}`}
              className={buttonClasses('dark', 'md', 'px-5 py-3.5 text-sm')}
            >
              <Phone size={17} className="flex-shrink-0" aria-hidden="true" />
              Anrufen
            </a>
            <Link
              to="/angebot"
              aria-label="Besichtigung anfragen"
              className={buttonClasses('primary', 'md', 'px-3 py-3.5 text-sm leading-snug')}
            >
              <FileText size={17} className="flex-shrink-0" aria-hidden="true" />
              Besichtigung anfragen
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
