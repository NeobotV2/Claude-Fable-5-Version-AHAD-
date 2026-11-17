import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'dark' | 'white' | 'outline' | 'outline-light' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonLinkProps {
  to?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

// Rechteckige, flache Schaltflächen: Farbe wechselt beim Überfahren, sonst
// bewegt sich nichts (kein Schatten, kein Anheben, kein Skalieren).
const base =
  'group/btn inline-flex items-center justify-center gap-2.5 font-semibold rounded-md transition-colors duration-150 ' +
  'focus:outline-none focus-visible:ring-4 text-center';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark focus-visible:ring-accent/40',
  dark: 'bg-navy text-white hover:bg-navy-800 focus-visible:ring-navy/30',
  white: 'bg-white text-navy hover:bg-mint focus-visible:ring-white/40',
  outline:
    'border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white focus-visible:ring-brand/25',
  'outline-light':
    'border border-white/45 text-white hover:bg-white hover:text-navy focus-visible:ring-white/30',
  ghost: 'text-accent hover:text-accent-dark underline-offset-4 decoration-2 hover:underline focus-visible:ring-brand/20',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-6 py-3.5 text-base',
};

export default function ButtonLink({
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className="min-w-0">{children}</span>
      {arrow && (
        <ArrowRight
          size={18}
          className="flex-shrink-0 transition-transform duration-150 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to ?? '/'} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
