import { cn } from '@/lib/utils';
import Reveal from './Reveal';
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

/** Einheitlicher Sektionskopf: Eyebrow → Titel → Lead, optional nummeriert. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  dark = false,
  className,
  index,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' && 'text-center', className)}>
      {(eyebrow || index) && (
        <div className={cn('eyebrow mb-5', align === 'center' && 'justify-center', dark ? 'text-mint' : 'text-brand')}>
          {index && <span className="font-headline opacity-60">{index}</span>}
          <span className={cn('h-px w-8', dark ? 'bg-mint/50' : 'bg-brand/40')} />
          {eyebrow}
        </div>
      )}
      <h2 className={cn('display-lg', dark ? 'text-white' : 'text-navy')}>{title}</h2>
      {lead && (
        <p
          className={cn(
            'mt-6 text-lg leading-relaxed font-medium max-w-2xl',
            align === 'center' && 'mx-auto',
            dark ? 'text-blue-100/85' : 'text-slate'
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
