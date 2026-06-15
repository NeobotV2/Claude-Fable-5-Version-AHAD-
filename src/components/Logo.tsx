import { Link } from 'react-router-dom';
import { useId } from 'react';
import { cn } from '@/lib/utils';
import logoArt from './logo-art.json';

interface LogoProps {
  /** 'light' = Farbversion (Verlauf, digital) für helle Flächen · 'dark' = Negativ Weiß für Navy/dunkle Flächen. */
  variant?: 'light' | 'dark';
  /** Höhe in px. */
  size?: number;
  className?: string;
  asLink?: boolean;
  onClick?: () => void;
}

const [, , VB_W, VB_H] = logoArt.viewBoxLockup.split(' ').map(Number);
const RATIO = VB_W / VB_H; // Lockup-Seitenverhältnis aus dem Original-Artwork

/**
 * AHAD-Logo (Lockup: Bildzeichen + Wortmarke) — exakt das offizielle Artwork
 * aus der Designbook-Druckvorlage (src/components/logo-art.json, deterministisch
 * aus den Original-SVGs extrahiert). Inline gerendert: scharf in jeder Größe,
 * keine externe Datei/Basis-Pfad-Abhängigkeit. Falzflächen mit Original-Verlauf;
 * Negativvariante (dark) komplett weiß.
 */
export default function Logo({ variant = 'light', size = 36, className, asLink = true, onClick }: LogoProps) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const white = variant === 'dark';
  const gG = `gFoldG-${id}`;
  const gN = `gFoldN-${id}`;

  const mark = (
    <svg
      height={size}
      width={size * RATIO}
      viewBox={logoArt.viewBoxLockup}
      role="img"
      aria-label="AHAD Cleaning"
      className="flex-shrink-0"
    >
      {!white && (
        <defs>
          {/* Original-Falzverläufe (userSpaceOnUse, in lokaler Bildzeichen-Geometrie) */}
          {(['green', 'navy'] as const).map((key) => {
            const g = logoArt.gradients[key];
            return (
              <linearGradient
                key={key}
                id={key === 'green' ? gG : gN}
                gradientUnits="userSpaceOnUse"
                x1={g.x1}
                y1={g.y1}
                x2={g.x2}
                y2={g.y2}
              >
                {g.stops.map(([offset, color]) => (
                  <stop key={offset} offset={offset} stopColor={color} />
                ))}
              </linearGradient>
            );
          })}
        </defs>
      )}

      {/* Bildzeichen — Original-Gruppe (Rotation/Skalierung aus der Vorlage) */}
      <g transform={logoArt.iconTransform}>
        <path d={logoArt.icon.navy} fillRule="evenodd" fill={white ? '#ffffff' : '#0B2341'} />
        <path d={logoArt.icon.green} fill={white ? '#ffffff' : '#0D6B38'} />
        <path d={logoArt.icon.falzGreen} fill={white ? '#ffffff' : `url(#${gG})`} />
        <path d={logoArt.icon.falzNavy} fill={white ? '#ffffff' : `url(#${gN})`} />
      </g>

      {/* Wortmarke (pfadkonvertiert, nie als Schrift setzen) */}
      <path d={logoArt.wordmark.ahad} fill={white ? '#ffffff' : '#0B2341'} />
      <path d={logoArt.wordmark.cleaning} fill={white ? '#ffffff' : '#0D6B38'} />
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
