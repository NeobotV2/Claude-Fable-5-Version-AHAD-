import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import RuleColumns from '@/components/ui/RuleColumns';
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

      <section className="bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 section-y-sm">
            <div className="lg:col-span-7">
              <h2 className="display-md text-navy mb-6">Im Einsatzgebiet Stuttgart</h2>
              <p className="text-lg text-slate mb-8 leading-relaxed">
                Stuttgart ist ein Zentrum für Industrie und Verwaltung. Wir erstellen für jedes Objekt ein eigenes
                Reinigungskonzept.
              </p>
              <ul className="border-t border-navy">
                {[
                  'Industriereinigung für Produktionsbetriebe',
                  'Büroreinigung für Verwaltungsgebäude',
                  'Glas- & Fassadenreinigung',
                  'Baureinigung für Neubauprojekte',
                  'Objektbezogene Einsatz- und Terminplanung',
                  'Nachvollziehbare Qualitätskontrollen',
                ].map((item) => (
                  <li key={item} className="py-3 border-b border-line font-medium text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <h3 className="pb-4 border-b border-navy font-semibold text-navy">Kontakt Region Stuttgart</h3>
              <div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Einsatzgebiet</p>
                  <div className="font-medium">
                    <p className="text-navy">Stuttgart und umliegende Städte nach objektbezogener Abstimmung</p>
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
              </div>
            </div>
          </div>

          {/* Leistungen vor Ort */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Unsere Leistungen in Stuttgart</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Alle Leistungen der Gebäudereinigung für Unternehmen im Großraum Stuttgart, koordiniert von einer festen
              Objektleitung und mit dokumentierter Qualitätskontrolle.
            </p>
            <RuleColumns cols={3} items={LOCAL_SERVICES.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Branchen vor Ort */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Branchen, die wir in Stuttgart betreuen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">Verwaltungsgebäude, Produktionshallen und Autohäuser haben unterschiedliche Anforderungen. Wir kennen die Branchen im Wirtschaftsraum Stuttgart und richten die Reinigung danach aus.</p>
            <RuleColumns cols={3} items={LOCAL_BRANCHEN.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Einsatzgebiete */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Einsatzgebiete im Großraum Stuttgart</h2>
            <p className="text-lg text-slate mb-8 max-w-3xl leading-relaxed">
              In diesen Städten und Teilregionen können Einsätze objektbezogen angefragt werden:
            </p>
            <p className="text-lg font-medium text-navy leading-relaxed max-w-4xl">{SERVICE_AREAS.join(' · ')}</p>
          </div>

          {/* Warum AHAD in Stuttgart */}
          <div className="bg-navy text-white px-6 py-10 sm:p-12 lg:p-14 mb-14 lg:mb-16">
            <div>
              <div className="max-w-3xl">
                <h2 className="display-md text-white mb-5">Warum AHAD Cleaning in Stuttgart?</h2>
                <p className="text-lg text-ondark mb-8 leading-relaxed">
                  In der Region Stuttgart sitzen viele Weltmarktführer und spezialisierte Mittelständler. Wir planen
                  jeden Einsatz nach Objekt, Nutzung und vereinbartem Zeitfenster, auch für Industrie- und
                  Gewerbeobjekte in Filderstadt, Sindelfingen und Ludwigsburg.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-white/30">
                  <p className="py-3.5 border-b border-white/15 font-medium">Einsatzplanung für die Region</p>
                  <p className="py-3.5 border-b border-white/15 font-medium">Erfahrung mit Industrie-Standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="section-y-sm border-t border-line max-w-4xl">
            <h2 className="display-md text-navy mb-6">Häufige Fragen zur Gebäudereinigung in Stuttgart</h2>
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
