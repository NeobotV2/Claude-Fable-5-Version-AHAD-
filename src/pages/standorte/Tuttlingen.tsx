import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import RuleColumns from '@/components/ui/RuleColumns';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { ORG_REF, SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

/** Einsatzgebiet ohne eigene Niederlassung: Tuttlingen und der Landkreis werden
 *  von der Zentrale in Villingen-Schwenningen aus betreut. Deshalb weder
 *  Filialadresse noch Geo-Koordinaten noch LocalBusiness-Markup. */

const LOCAL_SERVICES = [
  {
    title: 'Medizintechnik- & Reinraumreinigung in Tuttlingen',
    to: '/leistungen/medizintechnik-reinigung',
    desc: 'Produktions-, Labor- und Reinraumbereiche nach Ihren SOPs und Hygieneplänen, mit festem Team und Nachweisen für Audits.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Tuttlingen',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Hallen, Fertigungsflächen und Verkehrswege in metallverarbeitenden Betrieben, im laufenden Betrieb und abgestimmt auf Ihre Schichten.',
  },
  {
    title: 'Maschinenreinigung in Tuttlingen',
    to: '/leistungen/maschinenreinigung',
    desc: 'Maschinen, Anlagen und ihr Umfeld in der Fertigung, geplant auf Stillstands- oder Wartungsfenster und nach Ihren Arbeitsschutzvorgaben.',
  },
  {
    title: 'Unterhaltsreinigung in Tuttlingen',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Büros, Verwaltungen, Besprechungs- und Sozialräume im vereinbarten Intervall, mit dokumentierter Qualitätskontrolle.',
  },
  {
    title: 'Fenster- & Glasreinigung in Tuttlingen',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Fenster, Glasfronten und Lichtbänder in Büro- und Produktionsgebäuden, auch in der Höhe und im Osmose-Verfahren.',
  },
  {
    title: 'Baureinigung in Tuttlingen',
    to: '/leistungen/baureinigung',
    desc: 'Bauend- und Feinreinigung bei Neubau, Erweiterung und Umbau von Produktions- und Bürogebäuden, abgestimmt auf Übergabe und Inbetriebnahme.',
  },
];

/** Branchen im Einsatzgebiet: verknüpft die Seite mit den Branchenseiten. */
const LOCAL_BRANCHEN = [
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'Hersteller, Zulieferer und Dienstleister der Medizintechnik in Tuttlingen sowie Praxen und Gesundheitseinrichtungen im Landkreis.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Metallverarbeitende Betriebe und Zulieferer im Landkreis, gereinigt im laufenden Schichtbetrieb oder in Stillstandszeiten.',
  },
  {
    title: 'Büros, Verwaltung & Kanzleien',
    to: '/branchen/buero-verwaltung',
    desc: 'Verwaltungen, Vertriebs- und Entwicklungsbüros, gereinigt außerhalb der Kernarbeitszeit oder diskret im laufenden Betrieb.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Verkaufs- und Ausstellungsflächen, Showrooms und Kundenzentren, mit Vorrang für die Bereiche, die Besucher sehen.',
  },
  {
    title: 'Hotellerie & Objektbetrieb',
    to: '/branchen/hotellerie-objektbetrieb',
    desc: 'Hotels, Boardinghäuser und Gastronomie, gereinigt nach Belegung und abgestimmt auf den Gästebetrieb.',
  },
];

/** Typische Zonen in Medizintechnik-Objekten und wie wir dort arbeiten. */
const ZONEN = [
  {
    title: 'Produktion und Montage',
    text: 'Fertigungs- und Montageflächen, Arbeitsplätze und Böden, mit freigegebenen Reinigungsmitteln und in dem Intervall, das Ihr Hygieneplan vorgibt.',
  },
  {
    title: 'Reinräume und Schleusen',
    text: 'Reihenfolge, Mittel, Einwirkzeiten und Bekleidungsregeln legen Sie in Ihrer SOP fest. Wir setzen sie mit eingewiesenem Personal um und dokumentieren jede Ausführung.',
  },
  {
    title: 'Labore und Prüfbereiche',
    text: 'Labor- und Prüfflächen reinigen wir nach Absprache mit Ihrer Laborleitung. Welche Flächen, Abzüge und Geräteoberflächen dazugehören, legen wir vorher gemeinsam fest.',
  },
  {
    title: 'Büro, Sozial- und Besucherbereiche',
    text: 'Verwaltung, Besprechungsräume, Kantine, Sanitär- und Umkleidebereiche sowie der Empfang, an dem Kunden und Auditoren ankommen.',
  },
];

const SERVICE_AREAS = [
  'Tuttlingen',
  'Wurmlingen',
  'Spaichingen',
  'Trossingen',
  'Immendingen',
  'Mühlheim an der Donau',
  'Neuhausen ob Eck',
  'Geisingen',
  'Landkreis Tuttlingen',
];

const LOCAL_FAQS: FAQItem[] = [
  {
    question: 'Bieten Sie Reinraumreinigung in Tuttlingen an?',
    answer:
      'Ja. Wir reinigen Reinräume, Schleusen und reinraumnahe Bereiche nach Ihren SOPs. Reihenfolge, Reinigungs- und Desinfektionsmittel, Intervalle und Bekleidungsregeln geben Sie vor. Welche Bereiche und Anforderungen wir übernehmen, klären wir bei der Besichtigung anhand Ihrer Unterlagen.',
  },
  {
    question: 'Reinigen Sie nach unseren QM- und SOP-Vorgaben?',
    answer:
      'Ja. Ihre SOPs und Hygienepläne sind für uns verbindlich. Wir übernehmen sie in unsere Checklisten, weisen das Team dokumentiert ein und stellen Leistungsnachweise, Schulungsprotokolle und Kontrollberichte für Ihre Audits bereit. Auf Wunsch nimmt Ihre Objektleitung am Audit teil.',
  },
  {
    question: 'Setzen Sie in sensiblen Bereichen wechselndes Personal ein?',
    answer:
      'Nein. In Reinräumen und hygienisch sensiblen Bereichen arbeiten feste, eingewiesene Mitarbeitende. Personalwechsel kündigen wir an, und neue Kräfte werden dokumentiert eingewiesen, bevor sie im Bereich arbeiten.',
  },
  {
    question: 'Übernehmen Sie auch Büro- und Industriereinigung in Tuttlingen?',
    answer:
      'Ja. Neben sensiblen Bereichen reinigen wir Büros, Sozialräume, Produktionshallen und Maschinen. Ein Objekt mit unterschiedlichen Zonen wird so von einem Dienstleister mit einer Objektleitung betreut.',
  },
  {
    question: 'Haben Sie eine Niederlassung in Tuttlingen?',
    answer:
      'Nein. Wir betreuen Tuttlingen und den Landkreis von unserer Zentrale in Villingen-Schwenningen aus. Besichtigungen, Qualitätskontrollen und Abstimmungstermine finden bei Ihnen im Objekt statt.',
  },
  {
    question: 'In welchen Orten im Landkreis Tuttlingen sind Sie im Einsatz?',
    answer:
      'Neben der Kernstadt mit Möhringen, Nendingen und Eßlingen gehören Wurmlingen, Spaichingen, Trossingen, Immendingen, Mühlheim an der Donau, Neuhausen ob Eck und Geisingen zu unserem Einsatzgebiet. Winterdienst und Einsätze in weiteren Orten prüfen wir objektbezogen vor dem Angebot.',
  },
];

export default function StandortTuttlingen() {
  const regionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gebäudereinigung und Reinraumreinigung in Tuttlingen',
    serviceType: 'Gebäudereinigung',
    '@id': `${SITE.url}/standorte/tuttlingen#service`,
    url: `${SITE.url}/standorte/tuttlingen`,
    provider: ORG_REF,
    areaServed: SERVICE_AREAS.map((name) => ({
      '@type': name.startsWith('Landkreis ') ? 'AdministrativeArea' : 'City',
      name,
    })),
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Tuttlingen & Medizintechnik | AHAD"
        description="Gebäudereinigung und Reinraumreinigung in Tuttlingen: Reinigung für Medizintechnik nach Ihren SOPs, dazu Büro- und Industriereinigung mit Nachweisen für Audits."
        keywords="Gebäudereinigung Tuttlingen, Reinraumreinigung Tuttlingen, Reinigungsfirma Tuttlingen, Medizintechnik Reinigung Tuttlingen, Industriereinigung Tuttlingen, Büroreinigung Tuttlingen"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Einsatzgebiet · Landkreis Tuttlingen"
        title="Gebäudereinigung und Reinraumreinigung in Tuttlingen"
        lead="Für Hersteller und Zulieferer der Medizintechnik, für Büros und für Produktionsbetriebe in Tuttlingen und im Landkreis übernehmen wir die Reinigung nach Ihren Hygiene- und QM-Vorgaben. Koordiniert wird jedes Objekt von unserer Zentrale in Villingen-Schwenningen aus."
        image={IMG.medizintechnik}
        imageAlt="Hygienische Flächendesinfektion mit Einweghandschuhen"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Tuttlingen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      <section className="bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 section-y-sm">
            <div className="lg:col-span-7">
              <h2 className="display-md text-navy mb-6">Reinigung im Umfeld der Medizintechnik</h2>
              <p className="text-lg text-slate mb-6 leading-relaxed">
                Tuttlingen gilt als Weltzentrum der Medizintechnik. Mehrere hundert Betriebe in der Stadt und im
                Umland stellen chirurgische Instrumente, Endoskope und weitere Medizinprodukte her oder liefern Teile
                und Dienstleistungen dafür zu.
              </p>
              <p className="text-lg text-slate mb-8 leading-relaxed">
                Für die Gebäudereinigung heißt das: Neben Büro und Lager gibt es in vielen Objekten Bereiche, für die
                Hygienepläne, Zonenkonzepte oder Reinraumvorgaben gelten. Wir übernehmen diese Vorgaben in unsere
                Checklisten, setzen dort feste, eingewiesene Mitarbeitende ein und dokumentieren jede Ausführung.
              </p>
              <ul className="border-t border-navy">
                {[
                  'Reinigung nach Ihren SOPs und Hygieneplänen',
                  'Feste, eingewiesene Teams für sensible Bereiche',
                  'Schleusen, Umkleiden und Nebenbereiche',
                  'Leistungsnachweise und Schulungsprotokolle für Audits',
                  'Büro-, Produktions- und Sonderbereiche aus einer Hand',
                  'Feste Objektleitung als Ansprechpartner',
                ].map((item) => (
                  <li key={item} className="py-3 border-b border-line font-medium text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <h3 className="pb-4 border-b border-navy font-semibold text-navy">Kontakt Region Tuttlingen</h3>
              <div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Einsatzgebiet</p>
                  <div className="font-medium">
                    <p className="text-navy">Tuttlingen und Landkreis Tuttlingen nach objektbezogener Abstimmung</p>
                  </div>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Betreut von</p>
                  <div className="font-medium">
                    <Link
                      to="/standorte/villingen-schwenningen"
                      className="inline-block py-3 -my-3 text-navy hover:text-accent transition-colors"
                    >
                      Zentrale Villingen-Schwenningen
                    </Link>
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

          {/* Zonen in Medizintechnik-Objekten */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Was wir in Medizintechnik-Betrieben reinigen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Ein Medizintechnik-Standort besteht selten nur aus einem Bereich. Für jede Zone legen wir mit Ihnen
              Verfahren, Mittel und Intervalle fest und halten sie im Reinigungsplan fest.
            </p>
            <RuleColumns cols={2} items={ZONEN.map(({ title, text }) => ({ title, text }))} />

            <div className="mt-12 border-l-2 border-accent pl-6 max-w-3xl">
              <h3 className="text-xl font-bold text-navy mb-2.5">Nachweise für Ihr Qualitätsmanagement</h3>
              <p className="text-slate leading-relaxed">
                  Wenn Ihr QM-System Nachweise über ausgelagerte Tätigkeiten verlangt, erhalten Sie von uns
                  Leistungsnachweise, Unterweisungs- und Schulungsprotokolle sowie Kontrollberichte. Änderungen an
                  Ihren SOPs übernehmen wir nach Freigabe in die Checklisten und weisen das Team erneut ein. Auf Wunsch
                  nimmt Ihre AHAD-Objektleitung an Audits teil.
                </p>
            </div>
          </div>

          {/* Leistungen im Einsatzgebiet */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Unsere Leistungen in Tuttlingen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Von der Reinraumreinigung bis zur Glasfront: Sie können einzelne Leistungen beauftragen oder alle Zonen
              eines Standorts in einem Vertrag mit einer Objektleitung zusammenfassen.
            </p>
            <RuleColumns cols={3} items={LOCAL_SERVICES.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Branchen im Einsatzgebiet */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Branchen, für die wir in Tuttlingen reinigen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Die Medizintechnik prägt den Standort, daneben gibt es Metallverarbeitung, Handel, Verwaltung und
              Gastgewerbe. Umfang und Zeitfenster richten wir nach Branche und Nutzung aus.
            </p>
            <RuleColumns cols={3} items={LOCAL_BRANCHEN.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Einsatzgebiete */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Einsatzgebiete im Landkreis Tuttlingen</h2>
            <p className="text-lg text-slate mb-8 max-w-3xl leading-relaxed">
              Tuttlingen ist Kreisstadt und umfasst neben der Kernstadt die Stadtteile Möhringen, Nendingen und
              Eßlingen. Im Gewerbegebiet Gänsäcker zwischen Möhringer Vorstadt und Möhringen haben sich mehrere
              Medizintechnik-Unternehmen angesiedelt. In diesen Orten können Sie Einsätze bei uns anfragen:
            </p>
            <p className="text-lg font-medium text-navy leading-relaxed max-w-4xl">{SERVICE_AREAS.join(' · ')}</p>
            <p className="text-sm text-slate mt-6 max-w-3xl leading-relaxed">
              Von unserer Zentrale in Villingen-Schwenningen ist Tuttlingen über die B 523 erreichbar. Nach Angaben
              der IHK Schwarzwald-Baar-Heuberg arbeiten in der Region über 14.000 sozialversicherungspflichtig
              Beschäftigte im Wirtschaftszweig Medizinische Produkte und Geräte. Zum Umfeld der Branche gehört auch
              der Hochschulcampus Tuttlingen der Hochschule Furtwangen, der eng mit Unternehmen der Region
              zusammenarbeitet.
            </p>
          </div>

          {/* Warum AHAD in Tuttlingen */}
          <div className="bg-navy text-white px-6 py-10 sm:p-12 lg:p-14 mb-14 lg:mb-16">
            <div>
              <div className="max-w-3xl">
                <h2 className="display-md text-white mb-5">Warum AHAD Cleaning in Tuttlingen?</h2>
                <p className="text-lg text-ondark mb-8 leading-relaxed">
                  In Medizintechnik-Betrieben muss jede Reinigung nachvollziehbar sein, und in sensiblen Bereichen
                  sollen dieselben Personen arbeiten. Wir setzen feste Teams ein, übernehmen Ihre SOPs in unsere
                  Checklisten und kündigen jeden Personalwechsel an. Koordiniert wird von unserer Zentrale in
                  Villingen-Schwenningen, Ihr Ansprechpartner ist die zuständige Objektleitung.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-white/30">
                  <p className="py-3.5 border-b border-white/15 font-medium">Feste, eingewiesene Teams</p>
                  <p className="py-3.5 border-b border-white/15 font-medium">Nachweise für Ihre Audits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="section-y-sm border-t border-line max-w-4xl">
            <h2 className="display-md text-navy mb-6">Häufige Fragen zur Gebäudereinigung in Tuttlingen</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt in Tuttlingen?"
        lead="Wir besprechen Ihre Hygiene- und Dokumentationsvorgaben vertraulich, besichtigen die Bereiche zu einem abgestimmten Termin und erstellen danach ein Angebot."
      />
    </div>
  );
}
