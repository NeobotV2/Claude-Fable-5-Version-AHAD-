import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, FileText } from 'lucide-react';
import { SITE } from '@/lib/site';

const HIDDEN_PATHS = ['/angebot', '/karriere/bewerbung', '/admin'];

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
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          data-page-action="mobile-sticky-cta"
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]"
        >
          {/* auto+1fr statt 50/50: „Anrufen" kompakt, der längere Besichtigungs-CTA
              bekommt die Restbreite und bleibt so auf gängigen Handys einzeilig.
              Falls er auf sehr schmalen Geräten doch umbricht: zentriert statt
              linksbündig hängend (text-center + leading-snug). */}
          <div className="glass border-t border-line shadow-[0_-8px_32px_rgb(11_35_65/0.12)] px-4 py-3 grid grid-cols-[auto_1fr] gap-3">
            <a
              href={SITE.phoneHref}
              aria-label={`AHAD Cleaning anrufen: ${SITE.phone}`}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-navy text-white font-bold text-sm active:scale-[0.98] transition-transform"
            >
              <Phone size={17} className="flex-shrink-0" />
              Anrufen
            </a>
            <Link
              to="/angebot"
              aria-label="Besichtigung anfragen"
              className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-xl bg-accent text-white font-bold text-sm shadow-glow active:scale-[0.98] transition-transform text-center leading-snug"
            >
              <FileText size={17} className="flex-shrink-0" />
              Besichtigung anfragen
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
