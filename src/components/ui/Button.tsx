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
  onClick?: () => void;
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 ' +
  'focus:outline-none focus-visible:ring-4 active:scale-[0.98] text-center';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-dark shadow-[0_8px_24px_-8px_rgb(44_160_106/0.55)] hover:shadow-[0_12px_32px_-8px_rgb(44_160_106/0.65)] hover:-translate-y-0.5 focus-visible:ring-accent/40',
  dark:
    'bg-navy text-white hover:bg-navy-800 shadow-soft hover:shadow-lifted hover:-translate-y-0.5 focus-visible:ring-navy/30',
  white:
    'bg-white text-navy hover:bg-paper shadow-soft hover:shadow-lifted hover:-translate-y-0.5 focus-visible:ring-white/40',
  outline:
    'bg-white/60 backdrop-blur border-2 border-line text-brand hover:border-brand hover:bg-white focus-visible:ring-brand/25',
  'outline-light':
    'border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/50 focus-visible:ring-white/30',
  ghost: 'text-brand hover:bg-brand/5 focus-visible:ring-brand/20',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4 text-[15px]',
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
          className="flex-shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1"
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
