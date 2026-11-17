import { FEATURED_TESTIMONIAL as T, FEATURED_TESTIMONIAL_PUBLISHABLE } from '@/lib/site';

/**
 * Hervorgehobene, echte Kundenstimme (Südwest Messe) — das stärkste
 * Vertrauenselement: namentlich, detailliert, mit Kundenlogo und Freigabe.
 *
 * Gesetzt wie ein Zitat in einem Geschäftsbericht: links wer spricht, rechts
 * der unveränderte Wortlaut. Keine Karte, keine Zierzeichen.
 */
export default function FeaturedTestimonial() {
  if (!FEATURED_TESTIMONIAL_PUBLISHABLE || !T) return null;

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-line" aria-label="Hervorgehobene Kundenstimme">
      <figure className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        <figcaption className="lg:col-span-4 lg:order-1 order-2">
          <p className="eyebrow text-accent mb-5">Kundenstimme</p>
          <img
            src={T.logo}
            alt={`Logo ${T.shortName}`}
            title={T.company}
            loading="lazy"
            decoding="async"
            className="h-14 w-auto max-w-[13rem] object-contain object-left mb-6"
          />
          <p className="font-semibold text-navy">{T.person}</p>
          <p className="text-[15px] text-slate leading-relaxed">
            {T.personRole}
            <br />
            {T.company}
          </p>
          <p className="mt-3 text-[15px] text-slate">
            {T.relationship} · {T.location}
          </p>
        </figcaption>

        <div className="lg:col-span-8 lg:order-2 order-1 lg:border-l lg:border-line lg:pl-12">
          <blockquote className="text-xl lg:text-[1.6rem] leading-[1.5] font-medium text-navy">
            „{T.quote}“
          </blockquote>
          {/* Genannte Leistungen als Belegkette */}
          <p className="mt-8 text-[15px] text-slate">
            <span className="font-semibold text-navy">Im Zitat genannte Leistungen:</span>{' '}
            {T.services.join(', ')}
          </p>
        </div>
      </figure>
    </section>
  );
}
