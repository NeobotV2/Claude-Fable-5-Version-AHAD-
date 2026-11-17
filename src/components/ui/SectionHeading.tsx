import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  index?: string;
}

/** Einheitlicher Sektionskopf: Rubrikzeile → Titel → Lead. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-3', align === 'center' && 'justify-center', dark ? 'text-mint' : 'text-accent')}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn('display-lg', dark ? 'text-white' : 'text-navy')}>{title}</h2>
      {lead && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            dark ? 'text-blue-100/85' : 'text-slate'
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
