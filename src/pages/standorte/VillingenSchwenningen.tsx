import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import RuleColumns from '@/components/ui/RuleColumns';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { ORG_REF, SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

/** Lokale Leistungsblöcke — verknüpfen den Standort mit den Leistungsseiten
 *  (lokale Keyword-Tiefe + interne Verlinkung für Local SEO). */
const LOCAL_SERVICES = [
  {
    title: 'Unterhaltsreinigung in Villingen-Schwenningen',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Regelmäßige Reinigung von Büros, Verwaltungen und Gewerbeflächen mit festen Teams, digitaler Qualitätskontrolle und festem Ansprechpartner vor Ort.',
  },
  {
    title: 'Fenster- & Glasreinigung in Villingen-Schwenningen',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Fenster, Rahmen, Glasfronten und Fassaden, auch in der Höhe und im Osmose-Verfahren mit Reinwasser.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Villingen-Schwenningen',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Hallen, Maschinen und Produktionsflächen in den Industriegebieten von VS, im laufenden Betrieb, nach UVV und mit Nachweisen für Audits.',
  },
  {
    title: 'Baureinigung in Villingen-Schwenningen',
    to: '/leistungen/baureinigung',
    desc: 'Bau-, Zwischen- und Endreinigung für Neubau- und Sanierungsprojekte im Schwarzwald-Baar-Kreis.',
  },
  {
    title: 'Teppichreinigung in Villingen-Schwenningen',
    to: '/leistungen/teppichreinigung',
    desc: 'Teppichböden, Polster und Bürostühle in Büros, Hotels und Praxen, gereinigt außerhalb Ihrer Betriebszeit.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Villingen-Schwenningen',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Räum- und Streudienst für Ihre Verkehrswege sowie Kontrollgänge und Kleinreparaturen im Objekt.',
  },
  {
    title: 'Sonder- & Grundreinigung in Villingen-Schwenningen',
    to: '/leistungen/sonderreinigung-stillstandsservice',
    desc: 'Intensiv-, Grund- und Sonderreinigung sowie Stillstandsservice für Unternehmen in der Region.',
  },
];

/** Branchen vor Ort — verknüpft den Standort mit den Branchenseiten und deckt
 *  lokale „Reinigung für …"-Suchanfragen in VS ab. */
const LOCAL_BRANCHEN = [
  {
    title: 'Büros, Verwaltung & öffentliche Einrichtungen',
    to: '/branchen/buero-verwaltung',
    desc: 'Verwaltungen, Behörden, Kanzleien und Bürogebäude in Villingen-Schwenningen. Wir reinigen diskret, auch im laufenden Betrieb.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Hallen-, Maschinen- und Produktionsreinigung für Betriebe in den VS-Industriegebieten, nach UVV und abgestimmt auf Ihre Schichten.',
  },
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'In der Medizintechnik-Region Schwarzwald-Baar gelten hohe Hygieneanforderungen. Wir arbeiten nach dokumentierten, validierten Abläufen und liefern Nachweise für Audits.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Märkte, Autohäuser, Ausstellungs- und Gewerbeflächen in VS, mit besonderem Augenmerk auf die Kundenbereiche.',
  },
  {
    title: 'Hotellerie & Objektbetrieb',
    to: '/branchen/hotellerie-objektbetrieb',
    desc: 'Hotels, Gastronomie und Freizeiteinrichtungen in der Region. Wir reinigen abgestimmt auf den Gästebetrieb.',
  },
];

/** Industrie- & Gewerbegebiete in VS — gezielte lokale Keyword-Tiefe. */
const INDUSTRIE_GEBIETE = [
  'Gewerbegebiet Schwenningen (Salinensee / Neckarstraße)',
  'Industriegebiet Villingen-Wöschhalde',
  'Gewerbepark Auf Herdenen',
  'Gewerbegebiet Marbach / Vockenhausen',
  'Innenstadt & Verwaltungsstandorte VS',
];

/** Einsatzgebiete ab Zentrale VS — deckt lokale Suchanfragen der Umgebung ab. */
const SERVICE_AREAS = [
  'Villingen-Schwenningen',
  'Donaueschingen',
  'Bad Dürrheim',
  'St. Georgen',
  'Königsfeld',
  'Dauchingen',
  'Brigachtal',
  'Mönchweiler',
  'Unterkirnach',
  'Vöhrenbach',
  'Hüfingen',
  'Bräunlingen',
  'Furtwangen',
  'Trossingen',
  'Tuttlingen',
  'Rottweil',
  'Schwarzwald-Baar-Kreis',
];

/** Umland nach Lage gruppiert: eigene Absätze statt dünner Einzelseiten je Ort. */
const UMLAND: { title: string; text: string; link?: { label: string; to: string } }[] = [
  {
    title: 'St. Georgen, Königsfeld, Mönchweiler und Unterkirnach',
    text: 'Für Betriebe, Praxen und Verwaltungen auf der Schwarzwaldseite übernehmen wir Unterhalts- und Fensterreinigung. Im Winter räumen und streuen wir Zufahrten und Parkflächen, bevor der Betrieb beginnt; auf den höher gelegenen Strecken planen wir dafür früher ein.',
  },
  {
    title: 'Bad Dürrheim, Dauchingen und Brigachtal',
    text: 'Kurze Wege von unserer Zentrale: Hier betreuen wir Büros, Gewerbeflächen sowie Hotel- und Kurbetriebe mit Unterhaltsreinigung, Glasreinigung und Hausmeisterservice.',
  },
  {
    title: 'Donaueschingen, Hüfingen und Bräunlingen',
    link: { label: 'Gebäudereinigung in Donaueschingen', to: '/standorte/donaueschingen' },
    text: 'In den Gewerbegebieten an der Baar reinigen wir Produktions- und Lagerflächen, Büros und Sozialräume. Baureinigung und Bauendreinigung stimmen wir mit der Bauleitung auf den Abnahmetermin ab.',
  },
  {
    title: 'Rottweil, Trossingen und Tuttlingen',
    link: { label: 'Gebäudereinigung in Tuttlingen', to: '/standorte/tuttlingen' },
    text: 'Für Industrie und Medizintechnik in den Nachbarkreisen reinigen wir nach Ihren Hygiene- und QM-Vorgaben und dokumentieren jede Leistung für Audits.',
  },
];

const LOCAL_FAQS: FAQItem[] = [
  {
    question: 'Welche Reinigungsleistungen bietet AHAD in Villingen-Schwenningen?',
    answer:
      'Von unserer Zentrale in Villingen-Schwenningen aus bieten wir Unternehmen Unterhaltsreinigung, Glas- und Fassadenreinigung, Industrie- und Produktionsreinigung, Baureinigung, Sonder- und Grundreinigung sowie Winterdienst und Hausmeisterservice an. Alle Leistungen koordiniert eine feste Objektleitung.',
  },
  {
    question: 'Wie schnell ist AHAD in Villingen-Schwenningen vor Ort?',
    answer:
      'Unsere rechtliche Unternehmensadresse liegt in Villingen-Schwenningen (Max-Planck-Straße 11). Den möglichen Termin für eine Vor-Ort-Besichtigung stimmen wir objektbezogen mit Ihnen ab.',
  },
  {
    question: 'Reinigen Sie auch in den Industrie- und Gewerbegebieten rund um Villingen-Schwenningen?',
    answer:
      'Ja. Wir betreuen Unternehmen in ganz Villingen-Schwenningen und der Region Schwarzwald-Baar, unter anderem in Donaueschingen, Bad Dürrheim, St. Georgen, Trossingen, Tuttlingen und Rottweil, inklusive der dortigen Industrie- und Gewerbegebiete.',
  },
  {
    question: 'Übernehmen Sie Unterhaltsreinigung im laufenden Betrieb?',
    answer:
      'Ja. Unsere festangestellten Teams richten sich nach Ihren Betriebs- und Schichtzeiten. Die Qualitätskontrolle wird dokumentiert, direkter Ansprechpartner ist eine feste Objektleitung.',
  },
  {
    question: 'Bieten Sie auch Winterdienst in Villingen-Schwenningen an?',
    answer:
      'Ja. Wir räumen und streuen Verkehrswege, Zufahrten und Parkflächen Ihres Objekts, bei Bedarf schon in den frühen Morgenstunden.',
  },
];

export default function StandortVS() {
  const regionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gebäudereinigung in Villingen-Schwenningen',
    serviceType: 'Gebäudereinigung',
    '@id': `${SITE.url}/standorte/villingen-schwenningen#service`,
    url: `${SITE.url}/standorte/villingen-schwenningen`,
    provider: ORG_REF,
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': name.endsWith('-Kreis') ? 'AdministrativeArea' : 'City', name })),
  };

  return (
    <div>
      <SEO
        title="Reinigungsfirma VS & Schwarzwald-Baar-Kreis | AHAD Cleaning"
        description="Reinigungsfirma für Villingen-Schwenningen und Umgebung: Büro-, Fenster- und Industriereinigung sowie Winterdienst in St. Georgen, Bad Dürrheim und Königsfeld."
        keywords="Gebäudereinigung Villingen-Schwenningen, Reinigungsfirma Villingen-Schwenningen, Unterhaltsreinigung Villingen-Schwenningen, Industriereinigung Villingen-Schwenningen, Glasreinigung VS, Schwarzwald-Baar-Kreis"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Zentrale · Schwarzwald-Baar-Kreis"
        title="Reinigungsfirma für Villingen-Schwenningen und Umgebung"
        lead="Von unserer Zentrale in Villingen-Schwenningen aus betreuen wir Unternehmen im Schwarzwald-Baar-Kreis und in den Nachbarkreisen: von St. Georgen und Königsfeld über Bad Dürrheim und Donaueschingen bis Rottweil und Tuttlingen."
        image={IMG.heroArchitecture}
        imageAlt="AHAD Cleaning Zentrale in Villingen-Schwenningen"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Villingen-Schwenningen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Content Section */}
      <section className="bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 section-y-sm">
            <div className="lg:col-span-7">
              <h2 className="display-md text-navy mb-6">Vor Ort in Villingen-Schwenningen</h2>
              <p className="text-lg text-slate mb-8 leading-relaxed">
                Wir sind ein Unternehmen aus der Region und kennen die Betriebe hier. Unsere Wege zu Ihnen sind kurz,
                und unsere Objektleiter betreuen Sie persönlich vor Ort.
              </p>
              <ul className="border-t border-navy">
                {[
                  'Zentrale Steuerung aller regionalen Teams',
                  'Kurze Anfahrtswege',
                  'Persönliche Ansprechpartner in der Region',
                  'Alle Leistungsbereiche vor Ort',
                  'Notfall-Service für Bestandskunden',
                  'Kenntnis der regionalen Wirtschaft',
                ].map((item) => (
                  <li key={item} className="py-3 border-b border-line font-medium text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <h3 className="pb-4 border-b border-navy font-semibold text-navy">Kontaktdaten Zentrale</h3>
              <div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Adresse</p>
                  <div className="font-medium">
                    <p className="text-navy">
                      {SITE.address.street}
                      <br />
                      {SITE.address.zip} {SITE.address.city}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Telefon</p>
                  <div className="font-medium">
                    <a href={SITE.phoneHref} className="inline-block py-3 -my-3 text-navy hover:text-accent transition-colors">
                      {SITE.phone}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">E-Mail</p>
                  <div className="font-medium">
                    <a href={SITE.emailHref} className="inline-block py-3 -my-3 text-navy hover:text-accent transition-colors">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Bürozeiten</p>
                  <div className="font-medium">
                    <p className="text-navy">{SITE.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leistungen vor Ort */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Unsere Leistungen in Villingen-Schwenningen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Alle Leistungen der Gebäudereinigung für Unternehmen in Villingen-Schwenningen und der Region, koordiniert
              von einer festen Objektleitung und mit dokumentierter Qualitätskontrolle.
            </p>
            <RuleColumns cols={3} items={LOCAL_SERVICES.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Branchen vor Ort */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Branchen, die wir in Villingen-Schwenningen betreuen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Verwaltungsgebäude, Produktionshallen und Praxen haben unterschiedliche Anforderungen. Wir kennen die
              Branchen im Schwarzwald-Baar-Kreis und richten die Reinigung danach aus.
            </p>
            <RuleColumns cols={3} items={LOCAL_BRANCHEN.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Einsatzgebiete */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Einsatzgebiete rund um Villingen-Schwenningen</h2>
            <p className="text-lg text-slate mb-8 max-w-3xl leading-relaxed">
              Von unserer Zentrale in Villingen-Schwenningen aus sind wir in diesen Orten im Einsatz:
            </p>
            <p className="text-lg font-medium text-navy leading-relaxed max-w-4xl">{SERVICE_AREAS.join(' · ')}</p>

            <RuleColumns
              cols={2}
              className="mt-12"
              items={UMLAND.map((area) => ({ title: `Reinigungsservice in ${area.title}`, text: area.text, link: area.link }))}
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-6">
              <div className="lg:col-span-5">
                <h3 className="text-xl font-bold text-navy mb-2.5">Industrie- &amp; Gewerbegebiete in Villingen-Schwenningen</h3>
                <p className="text-slate leading-relaxed">
                  Besonders häufig arbeiten wir für Produktion, Logistik und Verwaltung in den Gewerbe- und
                  Industriegebieten von VS. Von unserer Zentrale aus sind wir dort schnell vor Ort:
                </p>
              </div>
              <ul className="lg:col-span-7 border-t border-navy">
                {INDUSTRIE_GEBIETE.map((g) => (
                  <li key={g} className="py-3 border-b border-line font-medium text-navy">
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warum AHAD in VS */}
          <div className="bg-navy text-white px-6 py-10 sm:p-12 lg:p-14 mb-14 lg:mb-16">
            <div>
              <div className="max-w-3xl">
                <h2 className="display-md text-white mb-5">Warum AHAD Cleaning in Villingen-Schwenningen?</h2>
                <p className="text-lg text-ondark mb-8 leading-relaxed">
                  In Villingen-Schwenningen sitzt unsere Unternehmenszentrale. Von hier aus steuern wir die
                  Qualitätssicherung für den gesamten süddeutschen Raum. Wir sind in der Region Schwarzwald-Baar zu
                  Hause, und für jedes Objekt ist klar geregelt, wer zuständig ist.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-white/30">
                  <p className="py-3.5 border-b border-white/15 font-medium">Unternehmenszentrale vor Ort</p>
                  <p className="py-3.5 border-b border-white/15 font-medium">Kurze Wege zu Ihrem Objekt</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="section-y-sm border-t border-line max-w-4xl">
            <h2 className="display-md text-navy mb-6">
              Häufige Fragen zur Gebäudereinigung in Villingen-Schwenningen
            </h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt in Villingen-Schwenningen?"
        lead="Wir besichtigen Ihr Objekt zu einem abgestimmten Termin und erstellen danach ein Angebot."
      />
    </div>
  );
}
