import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck2, Handshake, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import CTABand from '@/components/CTABand';
import Reviews from '@/components/Reviews';
import FeaturedTestimonial from '@/components/FeaturedTestimonial';
import { IMG } from '@/lib/images';
import { CLIENT_REFERENCES, SITE } from '@/lib/site';
import { BRANCHEN } from '@/data/branchen';

/**
 * Nicht gebundene Inhalte: Wie Referenzen bei AHAD zustande kommen. Namen,
 * Logos und Zitate selbst erscheinen nur nach dokumentierter Freigabe im
 * Claim-Register (site.ts) – bis dahin trägt diese Seite trotzdem Substanz.
 */
const REFERENZ_PRINZIPIEN = [
  {
    icon: ShieldCheck,
    title: 'Nur mit dokumentierter Freigabe',
    text: 'Firmennamen, Logos und Zitate veröffentlichen wir erst, wenn der Auftraggeber schriftlich zugestimmt hat – und nehmen sie auf Wunsch jederzeit wieder herunter.',
  },
  {
    icon: Handshake,
    title: 'Referenzgespräch statt Logo-Wand',
    text: 'Auf Anfrage stellen wir den Kontakt zu einem Bestandskunden mit vergleichbarem Objekt her: gleiche Branche, ähnliche Fläche, dieselbe Leistung.',
  },
  {
    icon: FileCheck2,
    title: 'Nachweise aus dem laufenden Betrieb',
    text: 'Leistungsverzeichnis, Prüfprotokolle und Qualitätsdokumentation zeigen wir bei der Besichtigung anonymisiert – so sehen Sie, wie wir arbeiten, nicht nur, für wen.',
  },
];

export default function Referenzen() {
  return (
    <div>
      <SEO
        title="Kundenstimmen & Referenzen | AHAD Cleaning"
        description="Erfahrungen mit den Gebäudedienstleistungen von AHAD Cleaning. Namentliche Referenzen veröffentlichen wir nur mit dokumentierter Freigabe."
        keywords="Referenzen Gebäudereinigung, Auftraggeber AHAD Cleaning, Reinigungsfirma Referenzen Süddeutschland"
      />

      <PageHero
        eyebrow="Referenzen"
        title={
          <>
            <span className="block">Vertrauen wird verdient.{' '}</span>
            <span className="block">Täglich.</span>
          </>
        }
        lead="Erfahrungen aus der Zusammenarbeit geben Orientierung. Namentliche Referenzen und Logos zeigen wir nur mit dokumentierter Freigabe."
        image={IMG.handshake}
        crumbs={[{ label: 'Referenzen' }]}
        cta={{ label: 'Referenzkunde werden', to: '/angebot' }}
      />

      {/* Referenz-Wand — echte Kundenlogos, einheitlich normiert (nur mit Logo) */}
      {CLIENT_REFERENCES.length > 0 && <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Auswahl betreuter Auftraggeber"
            title="Auftraggeber, die nicht mehr nachfassen müssen."
            lead="Vom regionalen Mittelständler bis zum internationalen Konzern — maßgeschneiderte Reinigungskonzepte für jeden Anspruch."
            className="mb-14"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {CLIENT_REFERENCES.filter((ref) => ref.logo).map((ref, index) => (
              <Reveal key={ref.domain} delay={Math.min(index * 0.05, 0.3)} className="h-full">
                <div className="flex items-center justify-center h-full min-h-[8rem] bg-paper rounded-3xl border border-line p-7 card-lift">
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    title={ref.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-14 max-w-[78%] object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>}

      {/* Hervorgehobene, echte Kundenstimme (namentlich, mit Freigabe) */}
      <FeaturedTestimonial />

      {/* Echte Google-Bewertungen statt anonymer Zitate */}
      <Reviews />

      {/* So entstehen Referenzen — unabhängig von Freigaben immer sichtbar */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Unser Umgang mit Referenzen"
            title="Was eine Referenz bei uns bedeutet."
            lead="Eine Logo-Wand sagt wenig über die Zusammenarbeit. Deshalb zeigen wir lieber, wie Referenzen bei uns entstehen – und machen sie auf Wunsch persönlich erlebbar."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REFERENZ_PRINZIPIEN.map((prinzip, index) => (
              <Reveal key={prinzip.title} delay={index * 0.08} className="h-full">
                <div className="h-full bg-white rounded-3xl border border-line p-8 card-lift">
                  <span className="w-12 h-12 rounded-2xl bg-brand/8 text-brand grid place-items-center mb-5">
                    <prinzip.icon size={22} aria-hidden />
                  </span>
                  <h3 className="font-headline text-xl font-bold text-navy mb-3">{prinzip.title}</h3>
                  <p className="text-slate leading-relaxed">{prinzip.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Branchen, in denen wir arbeiten — belegbare Substanz statt Zahlen */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Einsatzfelder"
            title="Branchen, in denen wir täglich arbeiten."
            lead="Jede Branche hat eigene Anforderungen an Hygiene, Nachweise und Ablauf. Die Branchenseiten zeigen, wie unser System dort konkret greift."
            className="mb-10"
          />
          <ul className="flex flex-wrap gap-3">
            {BRANCHEN.map((branche) => (
              <li key={branche.slug}>
                <Link
                  to={branche.path}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-sm font-bold text-navy transition-colors hover:border-brand hover:bg-brand/5 hover:text-brand"
                >
                  {branche.name}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate">
            Sie möchten mit einem Bestandskunden sprechen? Rufen Sie uns an:{' '}
            <a href={SITE.phoneHref} className="font-bold text-brand underline">{SITE.phone}</a>
          </p>
        </div>
      </section>

      <CTABand
        title="Werden Sie unsere nächste Referenz"
        lead="Lassen Sie uns gemeinsam ein Reinigungskonzept entwickeln, das Sie weiterempfehlen werden."
      />
    </div>
  );
}
