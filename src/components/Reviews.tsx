import { Helmet } from 'react-helmet-async';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS, REVIEWS_SOURCE_URL, reviewSchema } from '@/lib/site';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={16} className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
      ))}
    </div>
  );
}

/**
 * Echte Kundenbewertungen + AggregateRating-Schema.
 * Rendert NICHTS, solange keine verifizierten Reviews in site.ts stehen —
 * so entsteht nie fake Markup. Sobald REVIEWS befüllt ist, erscheint die
 * Sektion automatisch inkl. strukturierter Daten (Sterne im Snippet).
 */
export default function Reviews() {
  if (REVIEWS.length === 0) return null;
  const schema = reviewSchema();
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section className="py-24 lg:py-32 bg-paper border-y border-line">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Bewertungen"
          align="center"
          title="Was Kunden öffentlich über uns sagen"
          lead={`Durchschnittlich ${avg.replace('.', ',')} von 5 Sternen aus ${REVIEWS.length} verifizierten Bewertungen.`}
          className="mb-14 max-w-2xl mx-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <figure className="h-full bg-white rounded-3xl border border-line p-7 card-lift flex flex-col">
                <Stars rating={r.rating} />
                <blockquote className="text-navy font-medium leading-relaxed mt-4 flex-grow">„{r.text}“</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line">
                  <div className="font-bold text-navy text-sm">{r.author}</div>
                  {r.role && <div className="text-[13px] text-slate mt-0.5">{r.role}</div>}
                </figcaption>
              </figure>
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
              Alle Bewertungen ansehen
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
