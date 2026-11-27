import { prefersReducedMotion } from '@/lib/a11y';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import LinkList from '@/components/ui/LinkList';
import RuleColumns from '@/components/ui/RuleColumns';
import { IMG } from '@/lib/images';
import { JOB_PROFILES } from '@/data/jobs';

const benefits = [
  {
    title: 'Klare Vergütung',
    text: 'Vergütung, Arbeitszeitmodell und mögliche Zuschläge besprechen wir vor dem ersten Einsatz verbindlich mit Ihnen.',
  },
  {
    title: 'Planbare Arbeitszeiten',
    text: 'Sie arbeiten in festen Objekten und auf festen Touren. So können Sie Ihre Zeit planen, auch für die Familie.',
  },
  {
    title: 'Festes Team, feste Objektleitung',
    text: 'Sie arbeiten in eingespielten Teams mit einer Objektleitung, die für Sie erreichbar ist und Sie unterstützt.',
  },
  {
    title: 'Einarbeitung & Weiterbildung',
    text: 'Strukturierte Einarbeitung, Maschinenschulungen und Aufstiegswege bis zur Objektleitung.',
  },
  {
    title: 'Passende Arbeitsmodelle',
    text: 'Je nach Einsatzgebiet prüfen wir Minijob, Teilzeit oder Vollzeit gemeinsam mit Ihnen.',
  },
  {
    title: 'Respekt & Wertschätzung',
    text: 'Ordentliche Arbeitskleidung, modernes Material und ein respektvoller Umgang miteinander.',
  },
];

export default function Karriere() {
  return (
    <div>
      <SEO
        title="Jobs Reinigungskraft Villingen-Schwenningen | AHAD"
        description="Jobs in der Gebäudereinigung in Villingen-Schwenningen und Region: Minijob, Teilzeit oder Vollzeit. Bewerbung in vier kurzen Schritten, ganz ohne Lebenslauf."
        keywords="Jobs Gebäudereinigung, Reinigungskraft Job Villingen-Schwenningen, Objektleiter Stelle, Karriere Reinigungsfirma"
      />

      <PageHero
        eyebrow="Karriere bei AHAD"
        title={
          <>
            <span className="eyebrow text-accent flex mb-3 sm:mb-4 text-base sm:text-lg">
              Jobs in der Gebäudereinigung
            </span>{' '}
            <span className="block">Arbeit, die{' '}</span>
            <span className="block">
              <span className="whitespace-nowrap">gesehen wird.</span>
            </span>
          </>
        }
        lead="Unsere Teams reinigen täglich Betriebe in Süddeutschland. Einsatzort, Arbeitszeit und Vergütung besprechen wir mit Ihnen vor dem Start."
        image={IMG.karriere}
        crumbs={[{ label: 'Karriere' }]}
        cta={{ label: 'Interesse in vier Schritten senden', to: '/karriere/bewerbung' }}
        secondaryCta={{
          label: 'Einsatzprofile ansehen',
          href: '#offene-stellen',
          // Sanfter In-Page-Scroll statt Hash-Navigation — funktioniert in
          // beiden Router-Modi (Browser- und Hash-Router der Datei-Vorschau).
          onClick: (e) => {
            e.preventDefault();
            document.getElementById('offene-stellen')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          },
        }}
      />

      {/* Was wir bieten */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Warum AHAD"
            title="Was wir unseren Mitarbeitenden bieten."
            lead="Gute Arbeit in der Gebäudereinigung setzt faire Arbeitsbedingungen voraus."
            className="mb-12"
          />
          <RuleColumns cols={3} items={benefits} />
        </div>
      </section>

      {/* Einsatzprofile */}
      <section id="offene-stellen" className="section-y bg-paper border-y border-line scroll-mt-24">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Einsatzprofile"
              title="In diesen Bereichen prüfen wir Bewerbungen."
              lead="Ob an Ihrem Wunschort und in Ihrem Arbeitsmodell gerade eine Stelle frei ist, klären wir persönlich mit Ihnen."
            />
            <SmartImage
              src={IMG.team}
              alt="Das AHAD Team"
              sizes="(min-width:1024px) 42vw, 100vw"
              className="mt-8 aspect-[4/3]"
            />
          </div>
          <div className="lg:col-span-7">
            <LinkList
              large
              items={JOB_PROFILES.map((job) => ({
                to: `/karriere/bewerbung?profile=${job.id}`,
                title: job.title,
                sub: `${job.employment} · ${job.region}`,
              }))}
            />

            <div className="mt-8 bg-navy text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-xl font-bold mb-1.5">Initiativbewerbung</h3>
                <p className="text-body-sm text-ondark leading-relaxed">
                  Kein passendes Profil dabei? Senden Sie uns Ihr Einsatzinteresse. Wir prüfen die Möglichkeiten,
                  können aber keine konkrete Stelle zusagen.
                </p>
              </div>
              <ButtonLink to="/karriere/bewerbung" variant="white" arrow className="flex-shrink-0 self-start sm:self-auto">
                Bewerben
              </ButtonLink>
            </div>

            <p className="mt-6 text-body-sm text-slate leading-relaxed">
              Konkrete, aktuell ausgeschriebene Stellen mit Einsatzort und Arbeitszeit veröffentlichen wir auch auf{' '}
              <a
                href="https://join.com/companies/ahad-cleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark"
              >
                JOIN (öffnet neuen Tab)
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Aufstieg */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Entwicklung" title="Vom Einstieg zur Objektleitung." className="mb-12" />
          <RuleColumns
            ordered
            cols={3}
            items={[
              { title: 'Einstieg & Einarbeitung', text: 'Einarbeitung nach dem Patenprinzip: Eine erfahrene Kollegin oder ein erfahrener Kollege arbeitet Sie ein.' },
              { title: 'Vorarbeiter:in', text: 'Verantwortung für Team und Qualität im Objekt, mit Schulungen und mehr Gehalt.' },
              { title: 'Objektleitung', text: 'Eigene Objekte, Kundenkontakt und Führungsverantwortung.' },
            ]}
          />
          <ButtonLink to="/karriere/bewerbung" size="lg" arrow className="mt-12">
            Interesse in vier Schritten senden
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
