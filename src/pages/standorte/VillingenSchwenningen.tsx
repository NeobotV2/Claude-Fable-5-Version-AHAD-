import { MapPin, CheckCircle2, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
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
    title: 'Glas- & Fassadenreinigung in Villingen-Schwenningen',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Reinigung von Glasflächen und Fassaden, auch in der Höhe und im Osmose-Verfahren mit Reinwasser.',
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
  'Villingen',
  'Schwenningen',
  'Donaueschingen',
  'Bad Dürrheim',
  'St. Georgen',
  'Trossingen',
  'Tuttlingen',
  'Rottweil',
  'Bräunlingen',
  'Furtwangen',
  'Königsfeld',
  'Schwarzwald-Baar-Kreis',
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
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Villingen-Schwenningen | AHAD Cleaning"
        description="Gebäudereinigung in Villingen-Schwenningen: Unterhalts-, Glas-, Industrie-, Bau- und Sonderreinigung sowie Winterdienst für die Region Schwarzwald-Baar."
        keywords="Gebäudereinigung Villingen-Schwenningen, Reinigungsfirma Villingen-Schwenningen, Unterhaltsreinigung Villingen-Schwenningen, Industriereinigung Villingen-Schwenningen, Glasreinigung VS, Schwarzwald-Baar-Kreis"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Zentrale · Schwarzwald-Baar-Kreis"
        title="Gebäudereinigung in Villingen-Schwenningen"
        lead="Von unserem Hauptstandort in Villingen-Schwenningen aus betreuen wir Unternehmen in der gesamten Region Schwarzwald-Baar, Donaueschingen, Rottweil, Tuttlingen, Bad Dürrheim, St. Georgen und Trossingen."
        image={IMG.heroArchitecture}
        imageAlt="AHAD Cleaning Zentrale in Villingen-Schwenningen"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Villingen-Schwenningen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Vor Ort in Villingen-Schwenningen</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Wir sind ein Unternehmen aus der Region und kennen die Betriebe hier. Unsere Wege zu Ihnen sind kurz,
                und unsere Objektleiter betreuen Sie persönlich vor Ort.
              </p>
              <ul className="space-y-4">
                {[
                  'Zentrale Steuerung aller regionalen Teams',
                  'Kurze Anfahrtswege',
                  'Persönliche Ansprechpartner in der Region',
                  'Alle Leistungsbereiche vor Ort',
                  'Notfall-Service für Bestandskunden',
                  'Kenntnis der regionalen Wirtschaft',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontaktdaten Zentrale</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">
                      {SITE.address.street}
                      <br />
                      {SITE.address.zip} {SITE.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                    <a href={SITE.phoneHref} className="text-gray-600 hover:text-accent transition-colors">
                      {SITE.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">E-Mail</h4>
                    <a href={SITE.emailHref} className="text-gray-600 hover:text-accent transition-colors">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Bürozeiten</h4>
                    <p className="text-gray-600">{SITE.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leistungen vor Ort */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Unsere Leistungen in Villingen-Schwenningen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Alle Leistungen der Gebäudereinigung für Unternehmen in Villingen-Schwenningen und der Region, koordiniert
              von einer festen Objektleitung und mit dokumentierter Qualitätskontrolle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCAL_SERVICES.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="group block bg-gray-50 hover:bg-white border border-gray-100 hover:border-accent/30 rounded-2xl p-6 transition-all hover:shadow-soft"
                >
                  <h3 className="font-bold text-lg text-[#0B2341] mb-2 flex items-start justify-between gap-2">
                    <span>{s.title}</span>
                    <ArrowRight className="w-4 h-4 mt-1 text-accent flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Branchen vor Ort */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Branchen, die wir in Villingen-Schwenningen betreuen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Verwaltungsgebäude, Produktionshallen und Praxen haben unterschiedliche Anforderungen. Wir kennen die
              Branchen im Schwarzwald-Baar-Kreis und richten die Reinigung danach aus.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCAL_BRANCHEN.map((b) => (
                <Link
                  key={b.to}
                  to={b.to}
                  className="group block bg-gray-50 hover:bg-white border border-gray-100 hover:border-accent/30 rounded-2xl p-6 transition-all hover:shadow-soft"
                >
                  <h3 className="font-bold text-lg text-[#0B2341] mb-2 flex items-start justify-between gap-2">
                    <span>{b.title}</span>
                    <ArrowRight className="w-4 h-4 mt-1 text-accent flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Einsatzgebiete */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Einsatzgebiete rund um Villingen-Schwenningen</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              Von unserer Zentrale in Villingen-Schwenningen aus sind wir in diesen Orten im Einsatz:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-medium"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-8">
              <h3 className="font-bold text-lg text-[#0B2341] mb-2">Industrie- &amp; Gewerbegebiete in Villingen-Schwenningen</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Besonders häufig arbeiten wir für Produktion, Logistik und Verwaltung in den Gewerbe- und
                Industriegebieten von VS. Von unserer Zentrale aus sind wir dort schnell vor Ort:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {INDUSTRIE_GEBIETE.map((g) => (
                  <li key={g} className="flex items-start gap-2.5 text-gray-700 text-sm font-medium">
                    <CheckCircle2 className="text-accent w-4 h-4 flex-shrink-0 mt-0.5" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warum AHAD in VS */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Villingen-Schwenningen?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  In Villingen-Schwenningen sitzt unsere Unternehmenszentrale. Von hier aus steuern wir die
                  Qualitätssicherung für den gesamten süddeutschen Raum. Wir sind in der Region Schwarzwald-Baar zu
                  Hause, und für jedes Objekt ist klar geregelt, wer zuständig ist.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Unternehmenszentrale vor Ort</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Kurze Wege zu Ihrem Objekt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
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
