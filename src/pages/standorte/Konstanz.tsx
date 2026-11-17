import { Star } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import RuleColumns from '@/components/ui/RuleColumns';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { CLAIM_VERIFICATIONS, ORG_REF, SITE, canPublishVerification } from '@/lib/site';
import { IMG } from '@/lib/images';

// Konstanz nutzt die zentrale Hauptnummer (keine separate Standortnummer).
const KONSTANZ_PHONE = SITE.phone;
const KONSTANZ_PHONE_HREF = SITE.phoneHref;

const LOCAL_SERVICES = [
  {
    title: 'Unterhaltsreinigung in Konstanz',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Regelmäßige Reinigung von Büros, Praxen und Verwaltungen in Konstanz und am Bodensee mit festen Teams und dokumentierter Qualitätskontrolle.',
  },
  {
    title: 'Glas- & Fassadenreinigung in Konstanz',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Glasflächen und Fassaden in Konstanz und am See, auch in der Höhe und im Osmose-Verfahren.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Konstanz',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Reinigung für Gewerbe- und Produktionsbetriebe der Bodenseeregion im laufenden Betrieb, mit Nachweisen für Audits.',
  },
  {
    title: 'Baureinigung in Konstanz',
    to: '/leistungen/baureinigung',
    desc: 'Bau-, Zwischen- und Endreinigung für Neubau- und Sanierungsprojekte am Bodensee.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Konstanz',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Räum- und Streudienst für Ihre Verkehrswege sowie Kontrollgänge und Kleinreparaturen im Objekt.',
  },
  {
    title: 'Sonder- & Grundreinigung in Konstanz',
    to: '/leistungen/sonderreinigung-stillstandsservice',
    desc: 'Intensiv-, Grund- und Sonderreinigung für Hotellerie, Gastronomie und Unternehmen der Region.',
  },
];

/** Branchen vor Ort — verknüpft den Standort mit den Branchenseiten und deckt
 *  lokale „Reinigung für …"-Suchanfragen ab. */
const LOCAL_BRANCHEN = [
  {
    title: 'Hotellerie & Objektbetrieb',
    to: '/branchen/hotellerie-objektbetrieb',
    desc: 'Hotels, Gastronomie und Freizeitbäder am Bodensee. Wir reinigen abgestimmt auf den Gästebetrieb.',
  },
  {
    title: 'Büros, Verwaltung & Kanzleien',
    to: '/branchen/buero-verwaltung',
    desc: 'Verwaltungen, Kanzleien und Dienstleister in Konstanz, betreut von einer festen Objektleitung.',
  },
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'Praxen und Gesundheitseinrichtungen der Region, mit dokumentierter Hygiene und Nachweisen für Audits.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Verkaufsflächen im Einzelhandel, auch bei hoher Kundenfrequenz durch den Grenzverkehr.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Produktions- und Gewerbebetriebe rund um Konstanz, Radolfzell und Singen, im laufenden Betrieb.',
  },
];

const SERVICE_AREAS = [
  'Konstanz',
  'Radolfzell',
  'Singen',
  'Stockach',
  'Überlingen',
  'Meersburg',
  'Allensbach',
  'Reichenau',
  'Engen',
  'Friedrichshafen',
];

/** Öffentliche Google-Stimmen aus der Region Konstanz im Wortlaut; Wiedergabe freigegeben. */
const KONSTANZ_REVIEW_CANDIDATES: Array<{ author: string; rating: number; text: string }> = [
  {
    author: 'Britta Zorn',
    rating: 5,
    text: 'Unsere Kanzlei sieht nach jedem Einsatz aus wie frisch eröffnet. Danke für die konstante Qualität!',
  },
  {
    author: 'Ingrid Guimaraes',
    rating: 5,
    text: 'Das Personal war sehr respektvoll, diskret und fleißig. Ich fühle mich gut aufgehoben.',
  },
  {
    author: 'Sophia Fischer',
    rating: 5,
    text: 'Super freundliches Team und blitzsaubere Arbeit! Die Wohnung war danach wie neu. Jederzeit wieder.',
  },
  {
    author: 'Денис Грушка',
    rating: 5,
    text: 'Ich hatte kurzfristig eine Grundreinigung benötigt – wurde sofort geholfen. Top!',
  },
];

const KONSTANZ_REVIEWS = canPublishVerification(CLAIM_VERIFICATIONS.customerReviews)
  ? KONSTANZ_REVIEW_CANDIDATES
  : [];

const LOCAL_FAQS: FAQItem[] = [
  {
    question: 'Welche Reinigungsleistungen bietet AHAD in Konstanz?',
    answer:
      'In Konstanz und der Bodenseeregion bieten wir Unterhaltsreinigung, Glas- und Fassadenreinigung, Industrie- und Produktionsreinigung, Baureinigung, Sonder- und Grundreinigung sowie Winterdienst und Hausmeisterservice an. Alle Leistungen koordiniert eine feste Objektleitung.',
  },
  {
    question: 'Reinigen Sie auch Hotellerie und Gastronomie am Bodensee?',
    answer:
      'Ja. Wir kennen die Anforderungen an Hygiene und Erscheinungsbild im Tourismus und arbeiten mit eingespielten Teams, die diskret im laufenden Gästebetrieb reinigen.',
  },
  {
    question: 'In welchem Gebiet rund um Konstanz sind Sie im Einsatz?',
    answer:
      'Wir betreuen Kunden von Radolfzell über Singen und Stockach bis Überlingen und Meersburg, dazu Reichenau, Allensbach und Engen sowie die weitere Bodenseeregion.',
  },
  {
    question: 'Arbeiten Sie mit umweltschonenden Reinigungsverfahren?',
    answer:
      'Die geeigneten Reinigungsmittel und Verfahren legen wir abhängig von Oberfläche, Nutzung, Hygieneanforderungen und den vereinbarten Umweltkriterien fest.',
  },
];

export default function StandortKonstanz() {
  const regionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gebäudereinigung in Konstanz und der Bodenseeregion',
    serviceType: 'Gebäudereinigung',
    '@id': `${SITE.url}/standorte/konstanz#service`,
    url: `${SITE.url}/standorte/konstanz`,
    provider: ORG_REF,
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Konstanz & Bodensee | AHAD Cleaning"
        description="Gebäudereinigung in Konstanz, Singen und am Bodensee: Büro- und Unterhaltsreinigung, Fenster-, Industrie-, Bauend- und Sonderreinigung für Unternehmen."
        keywords="Gebäudereinigung Konstanz, Reinigungsfirma Konstanz, Büroreinigung Konstanz, Gebäudereinigung Bodensee, Unterhaltsreinigung Konstanz"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Einsatzgebiet · Bodenseeregion"
        title="Gebäudereinigung in Konstanz"
        lead="Wir bieten Gebäudedienstleistungen in der Bodenseeregion an und betreuen Objekte in Radolfzell, Singen, Kreuzlingen, Meersburg, Überlingen, Stockach und Umgebung."
        image={IMG.bodensee}
        imageAlt="Konstanz am Bodensee — Luftaufnahme der Stadt"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Konstanz' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: KONSTANZ_PHONE, href: KONSTANZ_PHONE_HREF }}
      />

      <section className="bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 section-y-sm">
            <div className="lg:col-span-7">
              <h2 className="display-md text-navy mb-6">Gebäudereinigung am Bodensee</h2>
              <p className="text-lg text-slate mb-8 leading-relaxed">
                Die Bodenseeregion lebt von Tourismus, Bildung und Gewerbe. Wir planen die Reinigung nach den
                Anforderungen des jeweiligen Objekts.
              </p>
              <ul className="border-t border-navy">
                {[
                  'Reinigung für Hotellerie & Gastronomie',
                  'Büroreinigung für Dienstleister',
                  'Glas- & Fassadenreinigung',
                  'Unterhaltsreinigung für öffentliche Einrichtungen',
                  'Objektbezogene Einsatz- und Terminplanung',
                  'Umweltschonende Reinigungsmittel',
                ].map((item) => (
                  <li key={item} className="py-3 border-b border-line font-medium text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <h3 className="pb-4 border-b border-navy font-semibold text-navy">Kontakt Region Konstanz</h3>
              <div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Einsatzgebiet</p>
                  <div className="font-medium">
                    <p className="text-navy">Konstanz und Bodenseeregion nach objektbezogener Abstimmung</p>
                  </div>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Telefon</p>
                  <div className="font-medium">
                    <a href={KONSTANZ_PHONE_HREF} className="inline-block py-3 -my-3 text-navy hover:text-accent transition-colors">
                      {KONSTANZ_PHONE}
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
              </div>
            </div>
          </div>

          {/* Leistungen vor Ort */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Unsere Leistungen in Konstanz &amp; am Bodensee</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Alle Leistungen der Gebäudereinigung für Unternehmen in Konstanz und der Bodenseeregion, koordiniert von
              einer festen Objektleitung und mit dokumentierter Qualitätskontrolle.
            </p>
            <RuleColumns cols={3} items={LOCAL_SERVICES.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Branchen vor Ort */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Branchen, die wir in Konstanz & am Bodensee betreuen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">Tourismus, Gesundheit und Gewerbe prägen die Bodenseeregion. Wir reinigen für diese Branchen umweltschonend und diskret im laufenden Betrieb.</p>
            <RuleColumns cols={3} items={LOCAL_BRANCHEN.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Einsatzgebiete */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Einsatzgebiete rund um Konstanz</h2>
            <p className="text-lg text-slate mb-8 max-w-3xl leading-relaxed">
              In diesen Orten der Bodenseeregion sind wir im Einsatz:
            </p>
            <p className="text-lg font-medium text-navy leading-relaxed max-w-4xl">{SERVICE_AREAS.join(' · ')}</p>
          </div>

          {/* Warum AHAD in Konstanz */}
          <div className="bg-navy text-white px-6 py-10 sm:p-12 lg:p-14 mb-14 lg:mb-16">
            <div>
              <div className="max-w-3xl">
                <h2 className="display-md text-white mb-5">Warum AHAD Cleaning in Konstanz?</h2>
                <p className="text-lg text-ondark mb-8 leading-relaxed">
                  Am Bodensee spielen der Schutz der Umwelt und die Anforderungen des Tourismus eine große Rolle. Wir
                  betreuen Kunden von Radolfzell bis Überlingen mit Teams, die die Besonderheiten der Region kennen,
                  etwa die Logistik in der Altstadt.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-white/30">
                  <p className="py-3.5 border-b border-white/15 font-medium">Umweltschonende Verfahren</p>
                  <p className="py-3.5 border-b border-white/15 font-medium">Spezialisierung auf Tourismus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Einzelne Kundenstimmen nur mit dokumentierter Wiedergabefreigabe */}
          {KONSTANZ_REVIEWS.length > 0 && <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Das sagen Kundinnen und Kunden in Konstanz</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Einzelne Bewertungen aus der Region, unverändert wiedergegeben. Eine Zuordnung zu einem Plattform-Profil
              und eine Gesamtwertung veröffentlichen wir erst nach Prüfung des Profils.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {KONSTANZ_REVIEWS.map((r) => (
                <figure key={r.author} className="flex flex-col border-t border-navy pt-6">
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${r.rating} von 5 Sternen`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i <= r.rating ? 'fill-amber-500 text-amber-500' : 'text-navy/20'}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lead text-ink leading-relaxed flex-grow">„{r.text}“</blockquote>
                  <figcaption className="mt-6 text-body-sm">
                    <span className="font-semibold text-navy">{r.author}</span>
                    <span className="text-slate"> · Kundenstimme · Region Konstanz</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>}

          {/* Lokale FAQ */}
          <div className="section-y-sm border-t border-line max-w-4xl">
            <h2 className="display-md text-navy mb-6">Häufige Fragen zur Gebäudereinigung in Konstanz</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt am Bodensee?"
        lead="Wir besichtigen Ihr Objekt zu einem abgestimmten Termin und erstellen danach ein Angebot."
      />
    </div>
  );
}
