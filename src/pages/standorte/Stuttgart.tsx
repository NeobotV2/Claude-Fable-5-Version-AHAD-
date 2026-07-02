import { MapPin, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

const LOCAL_SERVICES = [
  {
    title: 'Unterhaltsreinigung in Stuttgart',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Planbar saubere Büros und Verwaltungsgebäude im Großraum Stuttgart — feste Teams, digitale Qualitätskontrolle.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Stuttgart',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Reinigung für Produktionsbetriebe und Weltmarktführer der Region — im laufenden Betrieb, UVV-konform und auditfähig.',
  },
  {
    title: 'Glas- & Fassadenreinigung in Stuttgart',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Repräsentative Glasarchitektur und Fassaden im Großraum Stuttgart — auch in der Höhe und mit Osmose-Verfahren.',
  },
  {
    title: 'Baureinigung in Stuttgart',
    to: '/leistungen/baureinigung',
    desc: 'Bau-, Zwischen- und Endreinigung für Neubau- und Sanierungsprojekte in der Landeshauptstadt und im Umland.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Stuttgart',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Sichere Verkehrswege und gepflegte Objekte — Räum- und Streudienst, Kontrollgänge und Kleinreparaturen.',
  },
  {
    title: 'Sonder- & Grundreinigung in Stuttgart',
    to: '/leistungen/sonderreinigung-stillstandsservice',
    desc: 'Intensiv-, Grund- und Sonderreinigung sowie Stillstandsservice für Unternehmen im Großraum Stuttgart.',
  },
];

/** Branchen vor Ort — verknüpft den Standort mit den Branchenseiten und deckt
 *  lokale „Reinigung für …"-Suchanfragen ab. */
const LOCAL_BRANCHEN = [
  {
    title: 'Büros, Verwaltung & Kanzleien',
    to: '/branchen/buero-verwaltung',
    desc: 'Bürotürme, Verwaltungen und Kanzleien im Großraum Stuttgart — repräsentativ sauber, diskret im laufenden Betrieb.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Automotive, Maschinenbau und Zulieferer in den Industriegebieten der Region — UVV-konform und schichtintegriert.',
  },
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'Hygienisch sensible Bereiche mit dokumentierter, auditfähiger Reinigung.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Autohäuser, Märkte und Ausstellungsflächen — saubere Kundenbereiche für den ersten Eindruck.',
  },
  {
    title: 'Hotellerie & Objektbetrieb',
    to: '/branchen/hotellerie-objektbetrieb',
    desc: 'Hotels und Gastronomie in der Landeshauptstadt — verlässliche Reinigung mit Gespür für den Gast.',
  },
];

const SERVICE_AREAS = [
  'Stuttgart',
  'Echterdingen / Filderstadt',
  'Esslingen',
  'Böblingen',
  'Sindelfingen',
  'Ludwigsburg',
  'Waiblingen',
  'Leonberg',
  'Fellbach',
  'Kornwestheim',
];

const LOCAL_FAQS: FAQItem[] = [
  {
    question: 'Welche Reinigungsleistungen bietet AHAD in Stuttgart?',
    answer:
      'Im Großraum Stuttgart bieten wir das komplette Spektrum für Unternehmen: Unterhaltsreinigung, Industrie- und Produktionsreinigung, Glas- und Fassadenreinigung, Baureinigung, Sonder- und Grundreinigung sowie Winterdienst und Hausmeisterservice — aus einer Hand, mit fester Objektleitung.',
  },
  {
    question: 'Wie schnell ist AHAD im Großraum Stuttgart vor Ort?',
    answer:
      'Unser Standort in Echterdingen liegt verkehrsgünstig nahe Flughafen und Autobahn. Dadurch erreichen wir die Industriegebiete in Filderstadt, Sindelfingen und Ludwigsburg schnell — in der Regel vereinbaren wir innerhalb von 48 Stunden einen Vor-Ort-Termin, auf Meldungen reagieren wir innerhalb von 24 Stunden.',
  },
  {
    question: 'Reinigen Sie auch Produktions- und Industriebetriebe im Raum Stuttgart?',
    answer:
      'Ja. Wir sind auf Industrie- und Produktionsreinigung im laufenden Betrieb spezialisiert — schichtintegriert, UVV-konform und mit auditfähiger Dokumentation, wie sie die Zulieferer und Mittelständler der Region benötigen.',
  },
  {
    question: 'Übernehmen Sie Büro- und Verwaltungsgebäude in Stuttgart?',
    answer:
      'Ja. Für Büro- und Verwaltungsgebäude bieten wir planbare Unterhaltsreinigung mit festen Teams, digitaler Qualitätskontrolle und einem festen Ansprechpartner — auch in repräsentativen Innenstadtlagen.',
  },
];

export default function StandortStuttgart() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AHAD Cleaning Company GmbH - Stuttgart',
    image: `${SITE.url}/images/ahad/stuttgart.webp`,
    '@id': 'https://ahad-cleaning.de/standorte/stuttgart',
    url: 'https://ahad-cleaning.de/standorte/stuttgart',
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Humboldtstraße 27',
      addressLocality: 'Echterdingen',
      postalCode: '70771',
      addressCountry: 'DE',
    },
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
    geo: { '@type': 'GeoCoordinates', latitude: 48.7758, longitude: 9.1829 },
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
        title="Gebäudereinigung Stuttgart | AHAD Cleaning"
        description="Gebäudereinigung in Stuttgart: Unterhalts-, Industrie-, Glas-, Bau- und Sonderreinigung für Industrie, Gewerbe und Verwaltung im Großraum Stuttgart. Feste Objektleitung, dokumentierte Qualität, Besichtigung in 48h."
        keywords="Gebäudereinigung Stuttgart, Reinigungsfirma Stuttgart, Büroreinigung Stuttgart, Industriereinigung Stuttgart, Unterhaltsreinigung Stuttgart"
        schema={[localBusinessSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Landeshauptstadt & Umland"
        title="Gebäudereinigung in Stuttgart"
        lead="Von unserem Stuttgarter Standort aus bedienen wir Ludwigsburg, Esslingen, Böblingen, Sindelfingen, Waiblingen, Leonberg und den gesamten Großraum Stuttgart."
        image={IMG.stuttgart}
        imageAlt="Stuttgart — Schlossplatz mit Neuem Schloss"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Stuttgart' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Expertise für den Standort Stuttgart</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Stuttgart ist ein Zentrum für Industrie und Verwaltung. Wir bieten maßgeschneiderte Reinigungskonzepte,
                die den hohen Anforderungen dieser Region gerecht werden.
              </p>
              <ul className="space-y-4">
                {[
                  'Spezialisierte Industriereinigung für Produktionsbetriebe',
                  'Professionelle Büroreinigung für Verwaltungsgebäude',
                  'Glas- & Fassadenreinigung für moderne Architektur',
                  'Termingerechte Baureinigung für Neubauprojekte',
                  'Regionale Präsenz & schnelle Reaktionszeiten',
                  'Qualitätsmanagement nach höchsten Standards',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontakt Region Stuttgart</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">Humboldtstraße 27<br />70771 Echterdingen</p>
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
              </div>
            </div>
          </div>

          {/* Leistungen vor Ort */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Unsere Leistungen in Stuttgart</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Das komplette Gebäudereinigungs-Spektrum für Unternehmen im Großraum Stuttgart — aus einer Hand, mit fester
              Objektleitung und dokumentierter Qualität.
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Branchen, die wir in Stuttgart betreuen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">Vom Verwaltungsturm über die Produktionshalle bis zum Autohaus: Wir kennen die Anforderungen der Branchen, die den Wirtschaftsraum Stuttgart prägen — und reinigen passgenau dazu.</p>
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Einsatzgebiete im Großraum Stuttgart</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              Verkehrsgünstig ab Echterdingen sind wir schnell im gesamten Großraum im Einsatz:
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

          {/* Warum AHAD in Stuttgart */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Stuttgart?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Die Region Stuttgart ist geprägt von Weltmarktführern und hochspezialisierten Mittelständlern. Unsere
                  Nähe zum Flughafen und zur Autobahn ermöglicht uns extrem kurze Reaktionszeiten für Kunden in den
                  Industriegebieten Filderstadt, Sindelfingen und Ludwigsburg.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Lokale Teams mit Ortskenntnis</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Erfahrung mit Industrie-Standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Häufige Fragen — Gebäudereinigung Stuttgart</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt im Großraum Stuttgart?"
        lead="Regionales Team, feste Objektleitung: Besichtigung in 48 Stunden, Angebot in 24 Stunden danach."
      />
    </div>
  );
}
