import { MapPin, CheckCircle2, Phone, Mail, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
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
    desc: 'Planbar saubere Büros, Praxen und Verwaltungen in Konstanz und am Bodensee — feste Teams, dokumentierte Qualität.',
  },
  {
    title: 'Glas- & Fassadenreinigung in Konstanz',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Streifenfreie Glasflächen mit Seeblick und repräsentative Fassaden — auch in der Höhe und mit Osmose-Verfahren.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Konstanz',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Reinigung für Gewerbe- und Produktionsbetriebe der Bodenseeregion — im laufenden Betrieb und auditfähig.',
  },
  {
    title: 'Baureinigung in Konstanz',
    to: '/leistungen/baureinigung',
    desc: 'Bau-, Zwischen- und Endreinigung für Neubau- und Sanierungsprojekte am Bodensee.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Konstanz',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Sichere Verkehrswege und gepflegte Objekte — Räum- und Streudienst, Kontrollgänge und Kleinreparaturen.',
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
    desc: 'Hotels, Gastronomie und Freizeitbäder am Bodensee — Reinigung, die sich geräuschlos in den Gästebetrieb einfügt.',
  },
  {
    title: 'Büros, Verwaltung & Kanzleien',
    to: '/branchen/buero-verwaltung',
    desc: 'Verwaltungen, Kanzleien und Dienstleister in Konstanz — repräsentativ sauber mit fester Objektleitung.',
  },
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'Praxen und Gesundheitseinrichtungen der Region — Hygiene dokumentiert und auditfähig.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Einzelhandel und Grenzverkehr: saubere Verkaufsflächen auch bei hoher Kundenfrequenz.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Produktions- und Gewerbebetriebe rund um Konstanz, Radolfzell und Singen — im laufenden Betrieb.',
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

/** Einzelne Stimmen ohne Plattform-Aggregat oder unbestätigte Profilzuordnung. */
const KONSTANZ_REVIEW_CANDIDATES: Array<{ author: string; rating: number; text: string }> = [];

const KONSTANZ_REVIEWS = canPublishVerification(CLAIM_VERIFICATIONS.customerReviews)
  ? KONSTANZ_REVIEW_CANDIDATES
  : [];

const LOCAL_FAQS: FAQItem[] = [
  {
    question: 'Welche Reinigungsleistungen bietet AHAD in Konstanz?',
    answer:
      'In Konstanz und der Bodenseeregion bieten wir das komplette Spektrum: Unterhaltsreinigung, Glas- und Fassadenreinigung, Industrie- und Produktionsreinigung, Baureinigung, Sonder- und Grundreinigung sowie Winterdienst und Hausmeisterservice — aus einer Hand, mit fester Objektleitung.',
  },
  {
    question: 'Reinigen Sie auch Hotellerie und Gastronomie am Bodensee?',
    answer:
      'Ja. Wir kennen die hohen Repräsentations- und Hygieneanforderungen im Tourismus-Sektor und arbeiten mit eingespielten Teams, die sich diskret in den laufenden Gästebetrieb einfügen.',
  },
  {
    question: 'In welchem Gebiet rund um Konstanz sind Sie im Einsatz?',
    answer:
      'Wir betreuen Kunden von Radolfzell über Singen und Stockach bis Überlingen und Meersburg — inklusive Reichenau, Allensbach und Engen sowie der weiteren Bodenseeregion.',
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
        title="Gebäudereinigung Konstanz | AHAD Cleaning"
        description="Gebäudereinigung im Einsatzgebiet Konstanz und Bodensee: Unterhalts-, Glas-, Industrie-, Bau- und Sonderreinigung sowie Winterdienst nach objektbezogener Abstimmung."
        keywords="Gebäudereinigung Konstanz, Reinigungsfirma Konstanz, Büroreinigung Konstanz, Gebäudereinigung Bodensee, Unterhaltsreinigung Konstanz"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Einsatzgebiet · Bodenseeregion"
        title="Gebäudereinigung in Konstanz"
        lead="Wir sind Ihr Partner für professionelle Gebäudedienstleistungen in der Bodenseeregion – wir betreuen Radolfzell, Singen, Kreuzlingen, Meersburg, Überlingen, Stockach und Umgebung."
        image={IMG.bodensee}
        imageAlt="Konstanz am Bodensee — Luftaufnahme der Stadt"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Konstanz' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: KONSTANZ_PHONE, href: KONSTANZ_PHONE_HREF }}
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Sauberkeit am See</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Die Bodenseeregion ist geprägt von Tourismus, Bildung und innovativem Gewerbe. Wir bieten die passende
                Reinigungslogik für jede dieser Anforderungen.
              </p>
              <ul className="space-y-4">
                {[
                  'Reinigung für Hotellerie & Gastronomie',
                  'Professionelle Büroreinigung für Dienstleister',
                  'Glas- & Fassadenreinigung mit Seeblick',
                  'Unterhaltsreinigung für öffentliche Einrichtungen',
                  'Objektbezogene Einsatz- und Terminplanung',
                  'Umweltschonende Reinigungsmittel',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontakt Region Konstanz</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Einsatzgebiet</h4>
                    <p className="text-gray-600">Konstanz und Bodenseeregion nach objektbezogener Abstimmung</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                    <a href={KONSTANZ_PHONE_HREF} className="text-gray-600 hover:text-accent transition-colors">
                      {KONSTANZ_PHONE}
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
              </div>
            </div>
          </div>

          {/* Leistungen vor Ort */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Unsere Leistungen in Konstanz &amp; am Bodensee</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Das komplette Gebäudereinigungs-Spektrum für Unternehmen in Konstanz und der Bodenseeregion — aus einer
              Hand, mit fester Objektleitung und dokumentierter Qualität.
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Branchen, die wir in Konstanz & am Bodensee betreuen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">Tourismus, Gesundheit und innovatives Gewerbe prägen die Bodenseeregion: Wir reinigen passgenau für die Branchen vor Ort — umweltschonend und diskret im laufenden Betrieb.</p>
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Einsatzgebiete rund um Konstanz</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              In der gesamten Bodenseeregion sind wir schnell für Sie im Einsatz:
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
          </div>

          {/* Warum AHAD in Konstanz */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Konstanz?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Konstanz und die Bodenseeregion erfordern einen sensiblen Umgang mit der Umwelt und höchste Standards im
                  Tourismus-Sektor. Wir betreuen Kunden von Radolfzell bis Überlingen mit spezialisierten Teams, die die
                  logistischen Besonderheiten der Region (z. B. Altstadt-Logistik) genau kennen.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Umweltschonende Verfahren</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Spezialisierung auf Tourismus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Einzelne Kundenstimmen nur mit dokumentierter Wiedergabefreigabe */}
          {KONSTANZ_REVIEWS.length > 0 && <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Das sagen Kundinnen und Kunden in Konstanz</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Eine Auswahl einzelner Stimmen im Wortlaut. Eine Zuordnung zu einem Plattform-Profil und eine
              Gesamtwertung veröffentlichen wir erst nach Prüfung des exakten Profils.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KONSTANZ_REVIEWS.map((r) => (
                <figure
                  key={r.author}
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-7 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${r.rating} von 5 Sternen`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <blockquote className="text-[#0B2341] font-medium leading-relaxed flex-grow">
                    „{r.text}“
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-gray-200">
                    <div className="font-bold text-[#0B2341] text-sm">{r.author}</div>
                    <div className="text-[13px] text-gray-500 mt-0.5">Kundenstimme · Region Konstanz</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>}

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Häufige Fragen — Gebäudereinigung Konstanz</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt am Bodensee?"
        lead="Regional erreichbar: Besichtigung nach Abstimmung, belastbares Angebot im Anschluss."
      />
    </div>
  );
}
