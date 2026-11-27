import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartImage from '@/components/ui/SmartImage';

export interface LinkItem {
  to: string;
  title: string;
  sub?: string;
  /** Kleines Foto links neben dem Eintrag. */
  image?: string;
}

interface LinkListProps {
  items: readonly LinkItem[];
  cols?: 1 | 2 | 3;
  /** Überschrift über der Liste (trägt dann die obere Linie). */
  heading?: string;
  /** Größere Titel, z. B. für Hauptverzeichnisse. */
  large?: boolean;
  className?: string;
}

const COLS = {
  1: '',
  2: 'md:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
} as const;

/**
 * Verzeichnis aus Links: eine Zeile je Eintrag, Haarlinien dazwischen,
 * Pfeil rechts. Ersetzt Kachel-Raster für „weitere …"-Listen.
 */
export default function LinkList({ items, cols = 1, heading, large = false, className }: LinkListProps) {
  return (
    <div className={className}>
      {heading && <h3 className="pb-4 border-b border-navy font-semibold text-navy">{heading}</h3>}
      <ul className={cn('grid grid-cols-1 gap-x-8', COLS[cols], !heading && 'border-t border-navy')}>
        {items.map((item) => (
          <li key={item.to} className="border-b border-line">
            <Link to={item.to} className="group flex items-center gap-5 sm:gap-7 py-4">
              {item.image && (
                <SmartImage src={item.image} alt="" sizes="160px" className="w-24 sm:w-36 aspect-[3/2] flex-shrink-0" />
              )}
              <span className="min-w-0 flex-grow">
                <span
                  className={cn(
                    'block text-navy group-hover:text-accent transition-colors',
                    large ? 'text-lg sm:text-xl font-bold' : 'font-semibold'
                  )}
                >
                  {item.title}
                </span>
                {item.sub && <span className="block text-body-sm text-slate mt-0.5">{item.sub}</span>}
              </span>
              <ArrowRight
                size={17}
                className="flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
