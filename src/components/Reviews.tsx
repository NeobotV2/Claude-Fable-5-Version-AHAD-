import { Helmet } from 'react-helmet-async';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS, REVIEWS_SOURCE_URL, GOOGLE_RATING, reviewSchema } from '@/lib/site';
import { jsonLd } from '@/lib/jsonld';

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
 * Echte Google-Bewertungen. Headline + Schema-Aggregat = reale Google-
 * Gesamtwertung (4,8 / 20), darunter eine Auswahl im Wortlaut. Rendert nichts,
 * solange keine Reviews in site.ts stehen.
 */
export default function Reviews() {
  if (REVIEWS.length === 0) return null;
  const schema = reviewSchema();
  const value = GOOGLE_RATING.value.toFixed(1).replace('.', ',');

  return (
    <section className="py-24 lg:py-32 bg-paper border-y border-line">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{jsonLd(schema)}</script>
        </Helmet>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Google-Bewertungen"
          align="center"
          title="Was Kundinnen und Kunden öffentlich über uns sagen"
          lead={`${value} von 5 Sternen aus ${GOOGLE_RATING.count} Google-Bewertungen — eine Auswahl im Wortlaut.`}
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
                  <div className="text-[13px] text-slate mt-0.5">{r.role ? `${r.role} · ` : ''}Google-Bewertung</div>
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
              Alle {GOOGLE_RATING.count} Bewertungen auf Google ansehen
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
