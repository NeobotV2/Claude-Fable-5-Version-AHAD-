import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS, REVIEWS_SOURCE_URL, type Review } from '@/lib/site';

/** Ab dieser Länge wird eine Bewertung eingeklappt, damit die Spalten gleich hoch bleiben. */
const COLLAPSE_AFTER = 220;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={15} className={i <= rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} />
      ))}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > COLLAPSE_AFTER;

  return (
    <figure className="h-full flex flex-col border-t border-navy pt-6">
      <Stars rating={review.rating} />
      <div className="mt-4 flex-grow">
        {/* Der volle Wortlaut steht immer im DOM; eingeklappt wird nur optisch. */}
        <blockquote className={`text-[17px] text-ink leading-relaxed ${long && !open ? 'line-clamp-6' : ''}`}>
          „{review.text}“
        </blockquote>
        {long && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-3 text-sm font-semibold text-accent hover:underline underline-offset-4"
          >
            {open ? 'Weniger anzeigen' : 'Ganze Bewertung lesen'}
          </button>
        )}
      </div>
      <figcaption className="mt-6 text-[15px]">
        <span className="font-semibold text-navy">{review.author}</span>
        <span className="text-slate">
          {' · '}
          {review.role ? `${review.role} · ` : ''}
          {REVIEWS_SOURCE_URL ? 'Google-Bewertung' : 'Kundenstimme'}
        </span>
      </figcaption>
    </figure>
  );
}

interface ReviewsProps {
  /** Autorinnen und Autoren, die schon an anderer Stelle der Seite zitiert sind. */
  exclude?: readonly string[];
  /** Höchstzahl der Bewertungen; ohne Angabe alle freigegebenen. */
  limit?: number;
}

/**
 * Echte Google-Bewertungen im Wortlaut. Rendert nichts, solange keine Reviews
 * in site.ts stehen. Die Startseite zeigt nur eine Auswahl, die
 * Referenzen-Seite führt alle.
 */
export default function Reviews({ exclude = [], limit }: ReviewsProps) {
  const shown = REVIEWS.filter((review) => !exclude.includes(review.author)).slice(0, limit);
  if (shown.length === 0) return null;

  const columns = shown.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-20 lg:py-28 bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow={REVIEWS_SOURCE_URL ? 'Google-Bewertungen' : 'Kundenstimmen'}
            title="Was Kundinnen und Kunden über die Zusammenarbeit sagen"
            className="max-w-2xl"
          />
          {REVIEWS_SOURCE_URL && (
            <a href={REVIEWS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-link flex-shrink-0">
              Alle Bewertungen auf Google ansehen
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
        <div className={`grid grid-cols-1 gap-x-12 gap-y-12 ${columns}`}>
          {shown.map((review) => (
            <ReviewItem key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
