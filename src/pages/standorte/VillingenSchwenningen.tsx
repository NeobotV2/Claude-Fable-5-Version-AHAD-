import { MapPin, CheckCircle2, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

/** Lokale Leistungsblöcke — verknüpfen den Standort mit den Leistungsseiten
 *  (lokale Keyword-Tiefe + interne Verlinkung für Local SEO). */
const LOCAL_SERVICES = [
  {
    title: 'Unterhaltsreinigung in Villingen-Schwenningen',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Planbar saubere Büros, Verwaltungen und Gewerbeflächen — feste Teams, digitale Qualitätskontrolle und ein fester Ansprechpartner vor Ort.',
  },
  {
    title: 'Glas- & Fassadenreinigung in Villingen-Schwenningen',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Streifenfreie Glasflächen und repräsentative Fassaden — auch in der Höhe und mit reinem Osmose-Verfahren.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Villingen-Schwenningen',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Hallen, Maschinen und Produktionsflächen in den Industriegebieten von VS — im laufenden Betrieb, UVV-konform und auditfähig.',
  },
  {
    title: 'Baureinigung in Villingen-Schwenningen',
    to: '/leistungen/baureinigung',
    desc: 'Bau-, Zwischen- und Endreinigung für Neubau- und Sanierungsprojekte im Schwarzwald-Baar-Kreis.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Villingen-Schwenningen',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Sichere Verkehrswege und gepflegte Objekte — Räum- und Streudienst, Kontrollgänge und Kleinreparaturen aus einer Hand.',
  },
  {
    title: 'Sonder- & Grundreinigung in Villingen-Schwenningen',
    to: '/leistungen/sonderreinigung-stillstandsservice',
    desc: 'Intensiv-, Grund- und Sonderreinigung sowie Stillstandsservice für Unternehmen in der Region.',
  },
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
      'Von unserer Zentrale in Villingen-Schwenningen bieten wir das komplette Spektrum für Unternehmen: Unterhaltsreinigung, Glas- und Fassadenreinigung, Industrie- und Produktionsreinigung, Baureinigung, Sonder- und Grundreinigung sowie Winterdienst und Hausmeisterservice — alles aus einer Hand mit fester Objektleitung.',
  },
  {
    question: 'Wie schnell ist AHAD in Villingen-Schwenningen vor Ort?',
    answer:
      'Da sich unsere Zentrale direkt in Villingen-Schwenningen (Max-Planck-Straße 11) befindet, sind die Wege kurz: In der Regel vereinbaren wir innerhalb von 48 Stunden einen Vor-Ort-Termin zur Besichtigung; auf jede Meldung reagieren wir innerhalb von 24 Stunden.',
  },
  {
    question: 'Reinigen Sie auch in den Industrie- und Gewerbegebieten rund um Villingen-Schwenningen?',
    answer:
      'Ja. Wir betreuen Unternehmen in ganz Villingen-Schwenningen und der Region Schwarzwald-Baar — unter anderem in Donaueschingen, Bad Dürrheim, St. Georgen, Trossingen, Tuttlingen und Rottweil, inklusive der dortigen Industrie- und Gewerbegebiete.',
  },
  {
    question: 'Übernehmen Sie Unterhaltsreinigung im laufenden Betrieb?',
    answer:
      'Ja. Unsere festangestellten Teams fügen sich geräuschlos in Ihre Betriebs- und Schichtlogik ein — mit dokumentierter Qualitätskontrolle und einer festen Objektleitung als direktem Ansprechpartner.',
  },
  {
    question: 'Bieten Sie auch Winterdienst in Villingen-Schwenningen an?',
    answer:
      'Ja. Wir sichern Verkehrswege, Zufahrten und Parkflächen Ihres Objekts — bei Bedarf ab den frühen Morgenstunden, damit Mitarbeitende und Kunden sicher ankommen.',
  },
];

export default function StandortVS() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AHAD Cleaning Company GmbH - Villingen-Schwenningen',
    image: `${SITE.url}/images/ahad/hero-hq.webp`,
    '@id': 'https://ahad-cleaning.de/standorte/villingen-schwenningen',
    url: 'https://ahad-cleaning.de/standorte/villingen-schwenningen',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Max-Planck-Straße 11',
      addressLocality: 'Villingen-Schwenningen',
      postalCode: '78052',
      addressCountry: 'DE',
    },
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
    priceRange: '€€',
    geo: { '@type': 'GeoCoordinates', latitude: 48.0603, longitude: 8.4586 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Villingen-Schwenningen | AHAD Cleaning"
        description="Gebäudereinigung in Villingen-Schwenningen: Unterhalts-, Glas-, Industrie-, Bau- und Sonderreinigung sowie Winterdienst — ab unserer Zentrale für die Region Schwarzwald-Baar. Feste Objektleitung, dokumentierte Qualität, Besichtigung in 48h."
        keywords="Gebäudereinigung Villingen-Schwenningen, Reinigungsfirma Villingen-Schwenningen, Unterhaltsreinigung Villingen-Schwenningen, Industriereinigung Villingen-Schwenningen, Glasreinigung VS, Schwarzwald-Baar-Kreis"
        schema={[localBusinessSchema, faqSchemaFrom(LOCAL_FAQS)]}
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
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Ihre Experten vor Ort</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Als regional verwurzeltes Unternehmen kennen wir die Anforderungen der hiesigen Wirtschaft. Wir bieten
                kurze Wege, schnelle Reaktionszeiten und eine persönliche Betreuung durch unsere Objektleiter vor Ort.
              </p>
              <ul className="space-y-4">
                {[
                  'Zentrale Steuerung aller regionalen Teams',
                  'Kurze Anfahrtswege für maximale Flexibilität',
                  'Persönliche Ansprechpartner in der Region',
                  'Umfassendes Leistungsangebot vor Ort',
                  'Notfall-Service für Bestandskunden',
                  'Regionale Marktkenntnis & Vernetzung',
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
              Das komplette Gebäudereinigungs-Spektrum für Unternehmen in Villingen-Schwenningen und der Region — aus
              einer Hand, mit fester Objektleitung und dokumentierter Qualität.
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

          {/* Einsatzgebiete */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Einsatzgebiete rund um Villingen-Schwenningen</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              Ab unserer Zentrale in Villingen-Schwenningen sind wir schnell in der gesamten Region im Einsatz:
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

          {/* Warum AHAD in VS */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Villingen-Schwenningen?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  In Villingen-Schwenningen schlägt das Herz unseres Unternehmens. Von hier aus steuern wir unsere
                  Qualitätssicherung für den gesamten süddeutschen Raum. Unsere tiefe Verwurzelung in der Region
                  Schwarzwald-Baar garantiert Ihnen nicht nur höchste Zuverlässigkeit, sondern auch eine Partnerschaft
                  auf Augenhöhe mit Handschlagqualität.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Unternehmenszentrale vor Ort</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Maximale Flexibilität & Tempo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Häufige Fragen — Gebäudereinigung Villingen-Schwenningen
            </h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt in Villingen-Schwenningen?"
        lead="Kurze Wege ab Zentrale: Besichtigung in 48 Stunden, belastbares Angebot in 24 Stunden danach."
      />
    </div>
  );
}
