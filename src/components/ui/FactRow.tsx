import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Fact {
  value: ReactNode;
  label: string;
  /** Erläuterung unter der Beschriftung. */
  sub?: ReactNode;
}

interface FactRowProps {
  items: readonly Fact[];
  /** Auf Navy: weiße Zahlen, helle Trennlinien. */
  dark?: boolean;
  /** Haarlinie über und unter der Zeile (für helle Abschnitte). */
  framed?: boolean;
  className?: string;
}

/**
 * Kennzahlen in einer Zeile: gleich breite Spalten, Haarlinien dazwischen,
 * Zahl in Space Grotesk. Die eine Darstellung für Zahlen auf der ganzen Seite.
 */
export default function FactRow({ items, dark = false, framed = false, className }: FactRowProps) {
  const wide = items.length >= 4;
  return (
    <ul
      className={cn(
        'grid',
        wide ? 'grid-cols-2 lg:grid-cols-4 lg:divide-x' : 'grid-cols-1 sm:grid-cols-3 sm:divide-x',
        dark ? 'divide-white/15' : 'divide-line',
        framed && 'border-y border-line',
        className
      )}
    >
      {items.map((item) => (
        <li key={item.label} className={cn('py-7 pr-4', wide ? 'lg:px-8 lg:first:pl-0' : 'sm:px-8 sm:first:pl-0')}>
          <span
            className={cn(
              'block font-accent text-4xl lg:text-figure leading-none font-semibold tracking-tight tabular-nums',
              dark ? 'text-white' : 'text-navy'
            )}
          >
            {item.value}
          </span>
          <span className={cn('block mt-3 text-body-sm font-semibold', dark ? 'text-white' : 'text-navy')}>
            {item.label}
          </span>
          {item.sub && (
            <span className={cn('block mt-0.5 text-caption leading-relaxed', dark ? 'text-ondark/80' : 'text-slate')}>
              {item.sub}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
