import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_HREF } from '@/lib/site';

const HIDDEN_PATHS = ['/angebot', '/karriere/bewerbung', '/admin'];

/** Offizielles WhatsApp-Glyph (lucide hat kein Markenicon). */
function WhatsAppGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.5 1.13 6.744 3.05 9.38L1.05 31.5l6.32-2.018A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.826 32 16S24.83 0 16.004 0Zm9.32 22.598c-.386 1.09-1.92 1.994-3.143 2.258-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.842-.574 1.32-.574.154 0 .292.008.418.014.386.016.58.038.834.646.316.762 1.086 2.658 1.178 2.852.094.194.156.42.026.73-.122.31-.23.448-.424.69-.194.242-.378.428-.572.69-.178.226-.378.47-.162.844.216.366.96 1.582 2.06 2.562 1.42 1.264 2.6 1.656 3.012 1.83.31.13.68.1.91-.146.29-.31.642-.822.998-1.328.252-.362.572-.408.91-.28.344.12 2.176 1.026 2.55 1.212.374.186.622.276.714.43.092.156.092.886-.294 1.976Z" />
    </svg>
  );
}

/**
 * WhatsApp-Sofortkanal als dezenter Floating-Button.
 * Sitzt über der mobilen Sticky-CTA-Leiste, versteckt sich in Funnels.
 */
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);
  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && !hidden && (
        <motion.a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AHAD Cleaning per WhatsApp kontaktieren"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="fixed right-4 z-40 w-12 h-12 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lifted bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-6"
        >
          <WhatsAppGlyph size={22} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
