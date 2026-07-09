import { Quote, BadgeCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { FEATURED_TESTIMONIAL as T } from '@/lib/site';

/**
 * Hervorgehobene, echte Kundenstimme (Südwest Messe) — das stärkste
 * Vertrauenselement: namentlich, detailliert, mit Kundenlogo und Freigabe.
 * Dunkle Premium-Fläche; das Logo steht in einem weißen Feld, damit die
 * farbige Wortmarke auf Navy sauber liest.
 */
export default function FeaturedTestimonial({ dark = true }: { dark?: boolean }) {
  return (
    <section
      className={dark ? 'py-20 lg:py-28 bg-navy text-white overflow-hidden grain relative' : 'py-20 lg:py-28 bg-paper'}
      aria-label="Kundenstimme Südwest Messe"
    >
      {dark && <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden="true" />}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        <Reveal>
          <figure className={dark ? '' : 'bg-white rounded-[2rem] border border-line shadow-lifted p-8 lg:p-12'}>
            <span className={`eyebrow mb-6 ${dark ? 'text-mint' : 'text-accent'}`}>
              <span className={`h-px w-8 ${dark ? 'bg-mint/50' : 'bg-accent/40'}`} />
              Kundenstimme
            </span>

            <Quote className={`w-12 h-12 mb-6 ${dark ? 'text-mint/60' : 'text-accent/40'}`} aria-hidden="true" />

            <blockquote
              className={`font-headline text-xl lg:text-[26px] leading-relaxed font-medium ${
                dark ? 'text-white' : 'text-navy'
              }`}
            >
              „{T.quote}“
            </blockquote>

            {/* Genannte Leistungen als Belegkette */}
            <ul className="flex flex-wrap gap-2 mt-8" aria-label="Genannte Leistungen">
              {T.services.map((s) => (
                <li
                  key={s}
                  className={`text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                    dark ? 'bg-white/10 text-blue-100' : 'bg-paper text-slate border border-line'
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>

            <figcaption className={`mt-10 pt-8 flex items-center gap-5 border-t ${dark ? 'border-white/15' : 'border-line'}`}>
              <div className="h-16 w-44 sm:w-52 bg-white rounded-2xl grid place-items-center flex-shrink-0 shadow-soft px-3 py-2">
                <img
                  src={T.logo}
                  alt={`${T.shortName} — Logo`}
                  title={T.company}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className={`font-bold text-[15px] ${dark ? 'text-white' : 'text-navy'}`}>{T.person}</div>
                <div className={`text-sm ${dark ? 'text-blue-100/80' : 'text-slate'}`}>
                  {T.personRole} · {T.company}
                </div>
                <div className={`mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-bold ${dark ? 'text-mint' : 'text-accent'}`}>
                  <BadgeCheck size={14} />
                  {T.relationship} · {T.location}
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
