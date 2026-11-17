import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import CTABand from '@/components/CTABand';
import ClientLogos from '@/components/ClientLogos';
import LinkList from '@/components/ui/LinkList';
import RuleColumns from '@/components/ui/RuleColumns';
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
    title: 'Referenzgespräch',
    text: 'Auf Anfrage stellen wir den Kontakt zu einem Bestandskunden mit vergleichbarem Objekt her: gleiche Branche, ähnliche Fläche, dieselbe Leistung.',
  },
  {
    title: 'Nachweise aus dem laufenden Betrieb',
    text: 'Bei der Besichtigung zeigen wir Ihnen anonymisierte Leistungsverzeichnisse, Prüfprotokolle und Qualitätsdokumentation aus laufenden Objekten.',
  },
];

export default function Referenzen() {
  return (
    <div>
      <SEO
        title="Kundenstimmen & Referenzen | AHAD Cleaning"
        description="Auftraggeber, Kundenstimmen und Bewertungen zu den Gebäudedienstleistungen von AHAD Cleaning aus Villingen-Schwenningen."
        keywords="Referenzen Gebäudereinigung, Auftraggeber AHAD Cleaning, Reinigungsfirma Referenzen Süddeutschland"
      />

      <PageHero
        eyebrow="Referenzen"
        title={
          <>
            <span className="block">Für wen{' '}</span>
            <span className="block">wir arbeiten.</span>
          </>
        }
        lead="Auftraggeber aus Industrie, Verwaltung und Mittelstand und was sie über die Zusammenarbeit mit uns sagen."
        image={IMG.handshake}
        crumbs={[{ label: 'Referenzen' }]}
        cta={{ label: 'Angebot anfordern', to: '/angebot' }}
      />

      {/* Auftraggeber — echte Kundenlogos, einheitlich normiert (nur mit Logo) */}
      {CLIENT_REFERENCES.length > 0 && (
        <section className="section-y bg-white">
          <SectionHeading
            eyebrow="Auswahl betreuter Auftraggeber"
            title="Unternehmen, die wir betreuen."
            lead="Vom regionalen Mittelständler bis zum internationalen Konzern, jeweils mit einem eigenen Reinigungskonzept für das Objekt."
            className="container-page mb-12"
          />
          <ClientLogos />
        </section>
      )}

      {/* Hervorgehobene, echte Kundenstimme (namentlich, mit Freigabe) */}
      <FeaturedTestimonial />

      {/* Echte Google-Bewertungen statt anonymer Zitate */}
      <Reviews />

      {/* Angebot für alle, denen Logos und Zitate nicht genügen */}
      <section className="section-y bg-white border-t border-line">
        <div className="container-page">
          <SectionHeading
            eyebrow="Weiter prüfen"
            title="Referenzen, die Sie selbst prüfen können."
            lead="Auf Wunsch vermitteln wir Ihnen ein Gespräch mit einem Bestandskunden und zeigen Ihnen unsere Dokumentation."
            className="mb-12"
          />
          <RuleColumns cols={2} items={REFERENZ_PRINZIPIEN} />
        </div>
      </section>

      {/* Branchen, in denen wir arbeiten — belegbare Substanz statt Zahlen */}
      <section className="section-y bg-paper border-t border-line">
        <div className="container-page">
          <SectionHeading
            eyebrow="Einsatzfelder"
            title="Branchen, in denen wir arbeiten."
            lead="Jede Branche hat eigene Anforderungen an Hygiene, Nachweise und Ablauf. Auf den Branchenseiten beschreiben wir, wie wir dort vorgehen."
            className="mb-10"
          />
          <LinkList
            cols={3}
            items={BRANCHEN.map((branche) => ({ to: branche.path, title: branche.name, sub: branche.claim }))}
          />
          <p className="mt-8 text-slate">
            Sie möchten mit einem Bestandskunden sprechen? Rufen Sie uns an:{' '}
            <a href={SITE.phoneHref} className="font-semibold text-accent underline underline-offset-4">
              {SITE.phone}
            </a>
          </p>
        </div>
      </section>

      <CTABand
        title="Angebot für Ihr Objekt anfordern"
        lead="Wir besichtigen Ihr Objekt und erstellen daraus ein Reinigungskonzept."
      />
    </div>
  );
}
