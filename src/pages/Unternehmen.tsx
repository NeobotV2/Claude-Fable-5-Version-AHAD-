import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import FactRow from '@/components/ui/FactRow';
import RuleColumns from '@/components/ui/RuleColumns';
import ClientLogos from '@/components/ClientLogos';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import { CLIENT_REFERENCES, STATS } from '@/lib/site';

const values = [
  {
    title: 'Verbindlichkeit',
    text: 'Wir stimmen Leistungen, Zuständigkeiten und Termine mit Ihnen ab und halten Vereinbarungen nachvollziehbar fest.',
  },
  {
    title: 'Nachweisbarkeit',
    text: 'Wir dokumentieren, was wir leisten, damit sich jede Leistung und jede Kontrolle belegen lässt.',
  },
  {
    title: 'Partnerschaft',
    text: 'Faire Verträge ohne Knebelklauseln, feste Ansprechpartner und ein respektvoller Umgang mit Kunden und Mitarbeitenden.',
  },
  {
    title: 'Verantwortung',
    text: 'Umweltschonende Verfahren, faire Arbeitsbedingungen und regionale Verwurzelung in Süddeutschland.',
  },
];

const milestones = [
  { year: '2015', text: 'Start als regionaler Reinigungsdienst im Schwarzwald-Baar-Kreis.' },
  { year: 'Wachstum', text: 'Ausbau des Einsatzgebiets für gewerbliche Kunden in Süddeutschland.' },
  { year: 'System', text: 'Entwicklung des AHAD-Systems mit den Schritten Analyse, Handling, Audit und Dokumentation als festem Ablauf.' },
  {
    year: 'September 2026',
    text: 'Übernahme des Geschäftsbetriebs von Güntzel Objekt-Service aus Villingen-Schwenningen. Alle rund 25 Mitarbeitenden wurden übernommen, der Name Güntzel bleibt.',
  },
  { year: 'Heute', text: 'Rund 90 Mitarbeiterinnen und Mitarbeiter in der Region Schwarzwald-Baar-Heuberg, zertifiziert nach ISO 9001 und ISO 14001.' },
];

export default function Unternehmen() {
  return (
    <div>
      <SEO
        title="Über uns: Das Unternehmen | AHAD Cleaning"
        description="AHAD Cleaning aus Villingen-Schwenningen: inhabergeführte Gebäudereinigung für Gewerbekunden in Süddeutschland, mit festen Abläufen und persönlicher Betreuung."
        keywords="AHAD Cleaning Unternehmen, Gebäudereinigung Firma Villingen-Schwenningen, Reinigungsunternehmen Süddeutschland"
      />

      <PageHero
        eyebrow="Über uns"
        title={
          <>
            <span className="block">Wir sind die,{' '}</span>
            <span className="block">die Wort halten.</span>
          </>
        }
        lead="AHAD Cleaning ist ein inhabergeführtes Gebäudedienstleistungsunternehmen aus Villingen-Schwenningen. Wir organisieren die Reinigung Ihrer Gebäude so, dass Sie sich nicht selbst darum kümmern müssen."
        image={IMG.team}
        crumbs={[{ label: 'Unternehmen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: 'Karriere bei AHAD', to: '/karriere' }}
      />

      {/* Zahlen */}
      {STATS.length > 0 && (
        <section className="bg-navy text-white" aria-label="AHAD in Zahlen">
          <FactRow
            dark
            className="container-page"
            items={STATS.map((stat) => ({ value: `${stat.value}${stat.suffix}`, label: stat.label }))}
          />
        </section>
      )}

      {/* Geschichte: Zeitleiste als Tabelle neben dem Foto */}
      <section className="section-y bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Unsere Geschichte"
              title="Vom regionalen Dienstleister zum System-Anbieter."
              lead="Wir haben als kleiner Reinigungsbetrieb angefangen und sind vor allem durch Empfehlungen unserer Kunden gewachsen."
            />
            <dl className="mt-10 border-t border-navy">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="grid sm:grid-cols-[9rem_1fr] gap-x-8 gap-y-1 py-4 border-b border-line">
                  <dt className="font-accent font-semibold text-accent">{milestone.year}</dt>
                  <dd className="text-slate leading-relaxed">{milestone.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/aktuelles/guentzel-objekt-service-fortfuehrung" className="text-link mt-7">
              Zur Meldung über die Fortführung von Güntzel Objekt-Service
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <figure className="lg:col-span-5">
            <SmartImage
              src={IMG.teamMeeting}
              alt="Das AHAD Team bei der Einsatzplanung"
              sizes="(min-width:1024px) 42vw, 100vw"
              className="aspect-[4/5] lg:aspect-[4/4.5]"
            />
            <figcaption className="mt-4 border-l-2 border-accent pl-4 text-body-sm font-medium text-navy leading-relaxed">
              Verwurzelt in Villingen-Schwenningen, im Einsatz in ganz Süddeutschland.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Werte */}
      <section className="section-y bg-paper border-t border-line">
        <div className="container-page">
          <SectionHeading
            eyebrow="Wofür wir stehen"
            title="Vier Werte, an denen Sie uns messen können."
            className="mb-12 max-w-3xl"
          />
          <RuleColumns cols={4} items={values} />
        </div>
      </section>

      {/* Auftraggeber */}
      {CLIENT_REFERENCES.length > 0 && (
        <section className="section-y-sm bg-white border-t border-line">
          <div className="container-page mb-8 flex items-baseline justify-between gap-4">
            <p className="eyebrow text-slate">Unternehmen, die uns vertrauen</p>
            <Link to="/referenzen" className="text-link text-body-sm flex-shrink-0">
              Alle Referenzen <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ClientLogos />
        </section>
      )}

      {/* Karriere-Hinweis */}
      <section className="section-y-sm bg-navy text-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-8 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow text-mint mb-3">Karriere</p>
            <h2 className="display-md text-white mb-4">Wir suchen Kolleginnen und Kollegen, die sorgfältig arbeiten.</h2>
            <p className="text-lg text-ondark">Wir stellen Reinigungskräfte, Vorarbeiter:innen und Objektleitungen ein.</p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-x-4 gap-y-3">
            <ButtonLink to="/karriere" variant="white" arrow>
              Offene Stellen
            </ButtonLink>
            <ButtonLink to="/karriere/bewerbung" variant="outline-light">
              Direkt bewerben
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
