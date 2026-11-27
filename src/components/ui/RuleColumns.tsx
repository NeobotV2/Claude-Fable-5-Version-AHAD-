import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RuleItem {
  title: string;
  text: ReactNode;
  /** Kleine Zeile über dem Titel, z. B. eine Jahreszahl oder Rubrik. */
  kicker?: ReactNode;
  /** Macht die Spalte zum Link (mit Pfeil am Titel). */
  to?: string;
  /** Weiterführender Textlink unter dem Text (statt die ganze Spalte zu verlinken). */
  link?: { label: string; to: string };
}

interface RuleColumnsProps {
  items: readonly RuleItem[];
  cols?: 2 | 3 | 4;
  /** Nummeriert die Spalten (1, 2, 3 …). */
  ordered?: boolean;
  /** Überschriften-Ebene der Titel. */
  as?: 'h2' | 'h3';
  className?: string;
}

// Drei Spalten erst ab 1024 px: Auf Tablets sind sie für lange deutsche
// Titel („Industrie- & Produktionsreinigung“) zu schmal.
const COLS = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

/**
 * Spalten mit Haarlinie oben: Titel und ein kurzer Text. Ersetzt die
 * früheren Karten mit Icon. Für Schwerpunkte, Werte, Vorteile, Regionen.
 */
export default function RuleColumns({ items, cols = 3, ordered = false, as: Heading = 'h3', className }: RuleColumnsProps) {
  const List = ordered ? 'ol' : 'ul';
  return (
    <List className={cn('grid grid-cols-1 gap-x-10 gap-y-10', COLS[cols], className)}>
      {items.map((item, i) => {
        const body = (
          <>
            {ordered && (
              <span className="block font-accent font-semibold text-accent mb-3" aria-hidden="true">
                {i + 1}
              </span>
            )}
            {item.kicker && <span className="block text-sm font-semibold text-accent mb-1.5">{item.kicker}</span>}
            <Heading
              className={cn(
                'text-xl font-bold text-navy',
                item.to && 'flex items-start justify-between gap-3 group-hover:text-accent transition-colors'
              )}
            >
              {item.title}
              {item.to && <ArrowRight size={18} className="mt-1.5 flex-shrink-0" aria-hidden="true" />}
            </Heading>
            <span className="block mt-2.5 text-slate leading-relaxed">{item.text}</span>
            {item.link && (
              <Link to={item.link.to} className="text-link mt-3 text-body-sm">
                {item.link.label}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </>
        );
        return (
          <li key={item.title} className="border-t border-navy pt-5">
            {item.to ? (
              <Link to={item.to} className="group block">
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </List>
  );
}
