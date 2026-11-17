import { FEATURED_TESTIMONIAL as T, FEATURED_TESTIMONIAL_PUBLISHABLE } from '@/lib/site';
import { cn } from '@/lib/utils';

interface FeaturedTestimonialProps {
  /**
   * Ohne eigene Sektion und ohne eigene Überzeile: für die gemeinsame
   * Kundenstimmen-Sektion der Startseite (siehe Reviews).
   */
  embedded?: boolean;
  className?: string;
}

/**
 * Hervorgehobene, echte Kundenstimme (Südwest Messe) — das stärkste
 * Vertrauenselement: namentlich, detailliert, mit Kundenlogo und Freigabe.
 *
 * Gesetzt wie ein Zitat in einem Geschäftsbericht: links wer spricht, rechts
 * der unveränderte Wortlaut. Keine Karte, keine Zierzeichen.
 */
export default function FeaturedTestimonial({ embedded = false, className }: FeaturedTestimonialProps) {
  if (!FEATURED_TESTIMONIAL_PUBLISHABLE || !T) return null;

  const figure = (
    <figure
      className={cn('grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10', !embedded && 'container-page', className)}
    >
      <figcaption className="lg:col-span-4 lg:order-1 order-2">
        {!embedded && <p className="eyebrow text-accent mb-5">Kundenstimme</p>}
        <img
          src={T.logo}
          alt={`Logo ${T.shortName}`}
          title={T.company}
          loading="lazy"
          decoding="async"
          className="h-14 w-auto max-w-[13rem] object-contain object-left mb-6"
        />
        <p className="font-semibold text-navy">{T.person}</p>
        <p className="text-body-sm text-slate leading-relaxed">
          {T.personRole}
          <br />
          {T.company}
        </p>
        <p className="mt-3 text-body-sm text-slate">
          {T.relationship} · {T.location}
        </p>
      </figcaption>

      <div className="lg:col-span-8 lg:order-2 order-1 lg:border-l lg:border-line lg:pl-12">
        <blockquote className="text-xl lg:text-2xl leading-[1.5] font-medium text-navy">
          „{T.quote}“
        </blockquote>
        {/* Genannte Leistungen als Belegkette */}
        <p className="mt-8 text-body-sm text-slate">
          <span className="font-semibold text-navy">Im Zitat genannte Leistungen:</span>{' '}
          {T.services.join(', ')}
        </p>
      </div>
    </figure>
  );

  if (embedded) return figure;

  return (
    <section className="section-y bg-white border-t border-line" aria-label="Hervorgehobene Kundenstimme">
      {figure}
    </section>
  );
}
