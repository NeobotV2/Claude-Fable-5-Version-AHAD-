import { Link } from 'react-router-dom';
import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
  asLink?: boolean;
  onClick?: () => void;
}

/** AHAD-Logo — eine Quelle für Header, Footer und Mobile-Menü. */
export default function Logo({ variant = 'light', size = 34, className, asLink = true, onClick }: LogoProps) {
  // Doppelpunkte aus useId entfernen — sie brechen url(#)-Referenzen in SVG.
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const mark = (
    <>
      <svg className="logo-icon-svg flex-shrink-0" height={size} width={size} viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id={`grad-${id}`} x1="15%" x2="85%" y1="15%" y2="85%">
            <stop offset="0%" stopColor="#2ca06a" />
            <stop offset="100%" stopColor="#1e60a9" />
          </linearGradient>
          <mask id={`mask-${id}`}>
            <rect fill="white" height="100" width="100" x="0" y="0" />
            <rect fill="black" height="36" rx="6" transform="rotate(45 50 50)" width="36" x="32" y="32" />
          </mask>
        </defs>
        <rect
          fill={`url(#grad-${id})`}
          height="72"
          mask={`url(#mask-${id})`}
          rx="16"
          transform="rotate(45 50 50)"
          width="72"
          x="14"
          y="14"
        />
      </svg>
      <span className="flex flex-col items-start leading-none font-logo">
        <span
          className={cn(
            'text-xl font-[900] tracking-tighter uppercase',
            variant === 'dark' ? 'text-white' : 'text-brand-light'
          )}
        >
          AHAD
        </span>
        <span className="text-[7px] font-[500] text-accent uppercase -mt-1 tracking-[0.35em]">Cleaning</span>
      </span>
    </>
  );

  if (!asLink) return <span className={cn('flex items-center gap-3', className)}>{mark}</span>;

  return (
    <Link to="/" onClick={onClick} aria-label="AHAD Cleaning — Startseite" className={cn('flex items-center gap-3 logo-hover-effect', className)}>
      {mark}
    </Link>
  );
}
