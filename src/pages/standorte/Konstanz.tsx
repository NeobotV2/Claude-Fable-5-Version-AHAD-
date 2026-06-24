import { MapPin, CheckCircle2, Phone, Mail, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { SITE } from '@/lib/site';
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

/** Echte Google-Bewertungen des Standort-Profils Konstanz (5,0 ★ / 4).
 *  Getrennt von der Zentrale VS — kein Vermischen der beiden Profile. */
const KONSTANZ_REVIEWS = [
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

const KONSTANZ_RATING = { value: 5.0, count: KONSTANZ_REVIEWS.length };
const KONSTANZ_REVIEWS_URL =
  'https://www.google.com/maps/search/AHAD+Cleaning+Company+GmbH+Konstanz';

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
      'Ja. Gerade in der sensiblen Bodenseeregion setzen wir auf umweltschonende Mittel und ressourcenschonende Verfahren — dokumentiert und nach ISO 14001 ausgerichtet.',
  },
];

export default function StandortKonstanz() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AHAD Cleaning Company GmbH - Konstanz',
    image: `${SITE.url}/images/ahad/konstanz.webp`,
    '@id': 'https://ahad-cleaning.de/standorte/konstanz',
    url: 'https://ahad-cleaning.de/standorte/konstanz',
    telephone: KONSTANZ_PHONE,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Brückengasse 1b',
      addressLocality: 'Konstanz',
      postalCode: '78462',
      addressCountry: 'DE',
    },
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
    priceRange: '€€',
    geo: { '@type': 'GeoCoordinates', latitude: 47.6603, longitude: 9.1758 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: KONSTANZ_RATING.value,
      reviewCount: KONSTANZ_RATING.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: KONSTANZ_REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    })),
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Konstanz | AHAD Cleaning"
        description="Gebäudereinigung in Konstanz und am Bodensee: Unterhalts-, Glas-, Industrie-, Bau- und Sonderreinigung sowie Winterdienst. Feste Objektleitung, umweltschonende Verfahren, Besichtigung in 48h."
        keywords="Gebäudereinigung Konstanz, Reinigungsfirma Konstanz, Büroreinigung Konstanz, Gebäudereinigung Bodensee, Unterhaltsreinigung Konstanz"
        schema={[localBusinessSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Bodenseeregion"
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
                  'Regionale Präsenz & Zuverlässigkeit',
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
                    <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">Brückengasse 1b<br />78462 Konstanz</p>
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

          {/* Google-Bewertungen Standort Konstanz */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Das sagen Kundinnen und Kunden in Konstanz</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              {KONSTANZ_RATING.value.toFixed(1).replace('.', ',')} von 5 Sternen aus{' '}
              {KONSTANZ_RATING.count} Google-Bewertungen unseres Standort-Profils Konstanz — eine Auswahl im Wortlaut.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KONSTANZ_REVIEWS.map((r) => (
                <figure
                  key={r.author}
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-7 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-4" aria-label={`${r.rating} von 5 Sternen`}>
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
                    <div className="text-[13px] text-gray-500 mt-0.5">Google-Bewertung · Konstanz</div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={KONSTANZ_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-bold hover:text-accent-dark transition-colors"
              >
                Alle Bewertungen auf Google ansehen
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Häufige Fragen — Gebäudereinigung Konstanz</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt am Bodensee?"
        lead="Vor Ort verwurzelt: Besichtigung in 48 Stunden, belastbares Angebot in 24 Stunden danach."
      />
    </div>
  );
}
