import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS, REVIEWS_SOURCE_URL } from '@/lib/site';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} von 5 Sternen`}>
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

  return (
    <section className="py-24 lg:py-32 bg-paper border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Kundenstimmen"
          align="center"
          title="Was Kundinnen und Kunden über die Zusammenarbeit sagen"
          lead="Eine Auswahl einzelner Stimmen im Wortlaut. Eine Plattform-Gesamtwertung veröffentlichen wir erst nach Prüfung des exakten Unternehmensprofils."
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
                  <div className="text-[13px] text-slate mt-0.5">
                    {r.role ? `${r.role} · ` : ''}{REVIEWS_SOURCE_URL ? 'Google-Bewertung' : 'Kundenstimme'}
                  </div>
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
              Quelle auf Google ansehen
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
