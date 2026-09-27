import { MapPin, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { ORG_REF, SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

const LOCAL_SERVICES = [
  {
    title: 'Unterhaltsreinigung in Stuttgart',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Regelmäßige Reinigung von Büros und Verwaltungsgebäuden im Großraum Stuttgart mit festen Teams und digitaler Qualitätskontrolle.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Stuttgart',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Reinigung für Produktionsbetriebe und Weltmarktführer der Region im laufenden Betrieb, nach UVV und mit Nachweisen für Audits.',
  },
  {
    title: 'Glas- & Fassadenreinigung in Stuttgart',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Glasflächen und Fassaden im Großraum Stuttgart, auch in der Höhe und im Osmose-Verfahren.',
  },
  {
    title: 'Baureinigung in Stuttgart',
    to: '/leistungen/baureinigung',
    desc: 'Bau-, Zwischen- und Endreinigung für Neubau- und Sanierungsprojekte in der Landeshauptstadt und im Umland.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Stuttgart',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Räum- und Streudienst für Ihre Verkehrswege sowie Kontrollgänge und Kleinreparaturen im Objekt.',
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
    desc: 'Bürogebäude, Verwaltungen und Kanzleien im Großraum Stuttgart. Wir reinigen diskret, auch im laufenden Betrieb.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Fahrzeugbau, Maschinenbau und Zulieferer in den Industriegebieten der Region, nach UVV und abgestimmt auf Ihre Schichten.',
  },
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'Reinigung hygienisch sensibler Bereiche, dokumentiert und mit Nachweisen für Audits.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Autohäuser, Märkte und Ausstellungsflächen, mit besonderem Augenmerk auf die Kundenbereiche.',
  },
  {
    title: 'Hotellerie & Objektbetrieb',
    to: '/branchen/hotellerie-objektbetrieb',
    desc: 'Hotels und Gastronomie in der Landeshauptstadt. Wir reinigen abgestimmt auf den Gästebetrieb.',
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
      'Im Großraum Stuttgart bieten wir Unternehmen Unterhaltsreinigung, Industrie- und Produktionsreinigung, Glas- und Fassadenreinigung, Baureinigung, Sonder- und Grundreinigung sowie Winterdienst und Hausmeisterservice an. Alle Leistungen koordiniert eine feste Objektleitung.',
  },
  {
    question: 'Wie schnell ist AHAD im Großraum Stuttgart vor Ort?',
    answer:
      'Der Großraum Stuttgart gehört zu unserem Einsatzgebiet. Ob und wann eine Vor-Ort-Besichtigung möglich ist, stimmen wir objektbezogen mit Ihnen ab.',
  },
  {
    question: 'Reinigen Sie auch Produktions- und Industriebetriebe im Raum Stuttgart?',
    answer:
      'Ja. Wir sind auf Industrie- und Produktionsreinigung im laufenden Betrieb spezialisiert. Wir arbeiten nach Ihrem Schichtplan und nach UVV und dokumentieren so, wie es Zulieferer und Mittelständler der Region für ihre Audits brauchen.',
  },
  {
    question: 'Übernehmen Sie Büro- und Verwaltungsgebäude in Stuttgart?',
    answer:
      'Ja. Für Büro- und Verwaltungsgebäude, auch in der Innenstadt, bieten wir Unterhaltsreinigung mit abgestimmter Einsatzplanung, dokumentierten Kontrollen und klarer Zuständigkeit.',
  },
];

export default function StandortStuttgart() {
  const regionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gebäudereinigung im Großraum Stuttgart',
    serviceType: 'Gebäudereinigung',
    '@id': `${SITE.url}/standorte/stuttgart#service`,
    url: `${SITE.url}/standorte/stuttgart`,
    provider: ORG_REF,
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Stuttgart | AHAD Cleaning"
        description="Gebäudereinigung im Einsatzgebiet Stuttgart: Unterhalts-, Industrie-, Glas-, Bau- und Sonderreinigung für Industrie, Gewerbe und Verwaltung im Großraum."
        keywords="Gebäudereinigung Stuttgart, Reinigungsfirma Stuttgart, Büroreinigung Stuttgart, Industriereinigung Stuttgart, Unterhaltsreinigung Stuttgart"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Einsatzgebiet · Landeshauptstadt & Umland"
        title="Gebäudereinigung in Stuttgart"
        lead="Wir bieten Gebäudedienstleistungen in Stuttgart, Ludwigsburg, Esslingen, Böblingen, Sindelfingen, Waiblingen, Leonberg und im weiteren Großraum an."
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
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Im Einsatzgebiet Stuttgart</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Stuttgart ist ein Zentrum für Industrie und Verwaltung. Wir erstellen für jedes Objekt ein eigenes
                Reinigungskonzept.
              </p>
              <ul className="space-y-4">
                {[
                  'Industriereinigung für Produktionsbetriebe',
                  'Büroreinigung für Verwaltungsgebäude',
                  'Glas- & Fassadenreinigung',
                  'Baureinigung für Neubauprojekte',
                  'Objektbezogene Einsatz- und Terminplanung',
                  'Nachvollziehbare Qualitätskontrollen',
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
                    <h4 className="font-bold text-gray-900 mb-1">Einsatzgebiet</h4>
                    <p className="text-gray-600">Stuttgart und umliegende Städte nach objektbezogener Abstimmung</p>
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
              Alle Leistungen der Gebäudereinigung für Unternehmen im Großraum Stuttgart, koordiniert von einer festen
              Objektleitung und mit dokumentierter Qualitätskontrolle.
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
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">Verwaltungsgebäude, Produktionshallen und Autohäuser haben unterschiedliche Anforderungen. Wir kennen die Branchen im Wirtschaftsraum Stuttgart und richten die Reinigung danach aus.</p>
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
              In diesen Städten und Teilregionen können Einsätze objektbezogen angefragt werden:
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
                  In der Region Stuttgart sitzen viele Weltmarktführer und spezialisierte Mittelständler. Wir planen
                  jeden Einsatz nach Objekt, Nutzung und vereinbartem Zeitfenster, auch für Industrie- und
                  Gewerbeobjekte in Filderstadt, Sindelfingen und Ludwigsburg.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Einsatzplanung für die Region</p>
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
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Häufige Fragen zur Gebäudereinigung in Stuttgart</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt im Großraum Stuttgart?"
        lead="Wir besichtigen Ihr Objekt zu einem abgestimmten Termin und erstellen danach ein Angebot. Betreut wird es von einer festen Objektleitung."
      />
    </div>
  );
}
