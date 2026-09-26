import { useState } from 'react';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS, REVIEWS_SOURCE_URL, type Review } from '@/lib/site';

/** Ab dieser Länge wird eine Bewertung eingeklappt, damit die Karten gleich hoch bleiben. */
const COLLAPSE_AFTER = 220;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={16} className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > COLLAPSE_AFTER;

  return (
    <figure className="h-full bg-white rounded-3xl border border-line p-7 card-lift flex flex-col">
      <Stars rating={review.rating} />
      <div className="mt-4 flex-grow">
        {/* Der volle Wortlaut steht immer im DOM; eingeklappt wird nur optisch. */}
        <blockquote className={`text-navy font-medium leading-relaxed ${long && !open ? 'line-clamp-6' : ''}`}>
          „{review.text}“
        </blockquote>
        {long && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-3 text-sm font-bold text-brand hover:underline"
          >
            {open ? 'Weniger anzeigen' : 'Ganze Bewertung lesen'}
          </button>
        )}
      </div>
      <figcaption className="mt-6 pt-5 border-t border-line">
        <div className="font-bold text-navy text-sm">{review.author}</div>
        <div className="text-[13px] text-slate mt-0.5">
          {review.role ? `${review.role} · ` : ''}{REVIEWS_SOURCE_URL ? 'Google-Bewertung' : 'Kundenstimme'}
        </div>
      </figcaption>
    </figure>
  );
}

interface ReviewsProps {
  /** Autorinnen und Autoren, die schon an anderer Stelle der Seite zitiert sind. */
  exclude?: readonly string[];
  /** Höchstzahl der Karten; ohne Angabe alle freigegebenen Bewertungen. */
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

  const columns = shown.length <= 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-24 lg:py-32 bg-paper border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Kundenstimmen"
          align="center"
          title="Was Kundinnen und Kunden über die Zusammenarbeit sagen"
          lead="Eine Auswahl im Wortlaut."
          className="mb-14 max-w-2xl mx-auto"
        />
        <div className={`grid grid-cols-1 gap-6 ${columns}`}>
          {shown.map((review, i) => (
            <Reveal key={review.author} delay={i * 0.08} className="h-full">
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
        {REVIEWS_SOURCE_URL && (
          <div className="text-center mt-10">
            <a
              href={REVIEWS_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-light transition-colors"
            >
              Alle Bewertungen auf Google ansehen
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
