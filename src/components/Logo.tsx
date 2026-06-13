import { Link } from 'react-router-dom';
import { useId } from 'react';
import { cn } from '@/lib/utils';
import { ICON_PATHS, WORDMARK_PATHS, LOGO_VIEWBOX_LOCKUP } from './logo-paths';

interface LogoProps {
  /** 'light' = Farbversion (Verlauf, digital) für helle Flächen · 'dark' = Negativ Weiß für Navy/dunkle Flächen. */
  variant?: 'light' | 'dark';
  /** Höhe in px. Mindestbreite laut CI: 140px digital (entspricht ~34px Höhe). */
  size?: number;
  className?: string;
  asLink?: boolean;
  onClick?: () => void;
}

const RATIO = 303.664 / 72.598; // Lockup-Seitenverhältnis aus dem Designbook

/**
 * AHAD-Logo (Lockup: Bildzeichen + Wortmarke) nach Markenrichtlinien v2.4.
 * Eingefrorene Originalpfade, Verlauf 1:1 aus der „Logo Final"-Vorlage —
 * Proportionen fix, keine Rotation, keine Effekte, keine fremden Farben.
 */
export default function Logo({ variant = 'light', size = 36, className, asLink = true, onClick }: LogoProps) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const white = variant === 'dark';

  const mark = (
    <svg
      height={size}
      width={size * RATIO}
      viewBox={LOGO_VIEWBOX_LOCKUP}
      role="img"
      aria-label="AHAD Cleaning"
      className="flex-shrink-0"
    >
      {!white && (
        <defs>
          {/* Designbook v2.4: Hauptflächen solid, Falzflächen als weicher
              Navy↔Grün-Verlauf entlang der Falzdiagonale */}
          <linearGradient id={`fg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0B2341" />
            <stop offset="0.5" stopColor="#148A49" />
            <stop offset="1" stopColor="#0D6B38" />
          </linearGradient>
          <linearGradient id={`fn-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0B2341" />
            <stop offset="0.5" stopColor="#123660" />
            <stop offset="1" stopColor="#0D6B38" />
          </linearGradient>
        </defs>
      )}

      {/* Bildzeichen — Navy-Fläche trägt den weißen Kern (evenodd) */}
      <path d={ICON_PATHS.navy} fillRule="evenodd" fill={white ? '#ffffff' : '#0B2341'} />
      <path d={ICON_PATHS.green} fill={white ? '#ffffff' : '#0D6B38'} />
      {/* Falzflächen mit Verlauf — negativ entfallen sie optisch */}
      <path d={ICON_PATHS.falzGreen} fill={white ? '#ffffff' : `url(#fg-${id})`} />
      <path d={ICON_PATHS.falzNavy} fill={white ? '#ffffff' : `url(#fn-${id})`} />

      {/* Wortmarke (pfadkonvertiert, nie als Schrift setzen) */}
      <path d={WORDMARK_PATHS.ahad} fill={white ? '#ffffff' : '#0B2341'} />
      <path d={WORDMARK_PATHS.cleaning} fill={white ? '#ffffff' : '#0D6B38'} />
    </svg>
  );

  if (!asLink) return <span className={cn('inline-flex items-center', className)}>{mark}</span>;

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="AHAD Cleaning — Startseite"
      className={cn('inline-flex items-center transition-opacity hover:opacity-90', className)}
    >
      {mark}
    </Link>
  );
}
