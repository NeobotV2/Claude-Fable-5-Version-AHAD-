import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NEWS_BY_DATE, formatNewsDate } from '@/data/news';

/**
 * Schmale Leiste mit der jüngsten Unternehmensmeldung. Bewusst kompakt: Sie
 * sitzt zwischen Vertrauenssignalen und Leistungen und soll den Lesefluss zur
 * Anfrage nicht unterbrechen, sondern nur den Weg zur Meldung öffnen.
 *
 * Rendert nichts, solange keine Meldung eingetragen ist.
 */
export default function NewsTeaser() {
  const item = NEWS_BY_DATE[0];
  if (!item) return null;

  return (
    <section className="bg-paper border-y border-line" aria-label="Aktuelle Unternehmensmeldung">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-7">
        <Link
          to={`/aktuelles/${item.slug}`}
          className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
        >
          <span className="inline-flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">
              {item.topic}
            </span>
            <time dateTime={item.datePublished} className="text-[13px] text-slate">
              {formatNewsDate(item.datePublished)}
            </time>
          </span>
          <p className="flex-grow font-headline font-bold text-navy text-[17px] sm:text-lg leading-snug group-hover:text-brand transition-colors">
            {item.headline}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-brand flex-shrink-0">
            Mehr erfahren
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
