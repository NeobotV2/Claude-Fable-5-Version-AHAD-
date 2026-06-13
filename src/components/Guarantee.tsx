import { ShieldCheck, BadgeCheck, FileCheck2, Scale, Quote, UserRound } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { GUARANTEES, PROOF_POINTS, OBJEKTLEITUNG } from '@/lib/site';

const GUARANTEE_ICON = [
  <ShieldCheck className="w-6 h-6" key="1" />,
  <BadgeCheck className="w-6 h-6" key="2" />,
  <FileCheck2 className="w-6 h-6" key="3" />,
  <Scale className="w-6 h-6" key="4" />,
];

/**
 * Das AHAD-Versprechen: benannte Risikoumkehr (Nachbesserung, Festpreis,
 * faire Laufzeit) + operative Eckwerte + die Objektleitung mit Gesicht.
 * Stärkster Vertrauensblock der Seite.
 */
export default function Guarantee() {
  return (
    <section className="py-24 lg:py-32 bg-white border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Das AHAD-Versprechen"
          align="center"
          title="Vier Zusagen, an denen Sie uns festhalten dürfen."
          lead="Kein Kleingedrucktes. Wenn etwas nicht stimmt, bessern wir nach — kostenfrei. So sieht echte Risikoumkehr aus."
          className="mb-14 max-w-3xl mx-auto"
        />

        {/* Proof-Eckwerte */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {PROOF_POINTS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <div className="bg-paper rounded-2xl border border-line p-6 text-center h-full">
                <div className="font-accent text-3xl lg:text-4xl font-bold text-brand">{p.value}</div>
                <div className="text-sm font-bold text-navy mt-1.5">{p.label}</div>
                <div className="text-[12px] text-slate mt-0.5">{p.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Garantie-Karten */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08} className="h-full">
                <div className="h-full bg-paper rounded-3xl border border-line p-7 card-lift">
                  <span className="inline-flex w-12 h-12 rounded-2xl bg-accent/10 text-accent items-center justify-center mb-5">
                    {GUARANTEE_ICON[i]}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-navy mb-2">{g.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{g.promise}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Objektleitung mit Gesicht */}
          <Reveal delay={0.15} className="lg:col-span-4">
            <figure className="h-full relative bg-navy text-white rounded-3xl overflow-hidden grain shadow-lifted flex flex-col">
              <div className="absolute inset-0 blueprint-grid" />
              <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-accent/25 blur-[90px]" />
              <div className="relative z-10 p-7 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-5">
                  {OBJEKTLEITUNG.photo ? (
                    <img
                      src={OBJEKTLEITUNG.photo}
                      alt={OBJEKTLEITUNG.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white/15"
                      loading="lazy"
                    />
                  ) : (
                    <span className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/15 grid place-items-center text-mint flex-shrink-0">
                      <UserRound size={28} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-white leading-snug">{OBJEKTLEITUNG.name}</div>
                    <div className="text-[13px] text-blue-100/70">{OBJEKTLEITUNG.role}</div>
                  </div>
                </div>
                <Quote className="w-7 h-7 text-mint/40 mb-3" aria-hidden />
                <blockquote className="text-blue-50 font-medium leading-relaxed flex-grow">
                  „{OBJEKTLEITUNG.quote}“
                </blockquote>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
