import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NEWS_BY_DATE, formatNewsDate } from '@/data/news';

/**
 * Schmale Zeile mit der jüngsten Unternehmensmeldung. Bewusst kompakt: Sie
 * sitzt zwischen Vertrauenssignalen und Leistungen und soll den Lesefluss zur
 * Anfrage nicht unterbrechen, sondern nur den Weg zur Meldung öffnen.
 *
 * Rendert nichts, solange keine Meldung eingetragen ist.
 */
export default function NewsTeaser() {
  const item = NEWS_BY_DATE[0];
  if (!item) return null;

  return (
    <section className="bg-paper border-b border-line" aria-label="Aktuelle Unternehmensmeldung">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5">
        <Link
          to={`/aktuelles/${item.slug}`}
          className="group flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6"
        >
          <span className="text-[13px] text-slate flex-shrink-0">
            {item.topic} ·{' '}
            <time dateTime={item.datePublished}>{formatNewsDate(item.datePublished)}</time>
          </span>
          <p className="flex-grow font-semibold text-navy text-[17px] leading-snug group-hover:text-accent transition-colors">
            {item.headline}
          </p>
          <span className="text-link text-[15px] flex-shrink-0">
            Mehr erfahren
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
