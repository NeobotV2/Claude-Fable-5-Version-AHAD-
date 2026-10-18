import { MapPin, CheckCircle2, Phone, Mail, ArrowRight, Building, Factory, ShieldCheck, FlaskConical, Users, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
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
    icon: Factory,
    title: 'Produktion und Montage',
    text: 'Fertigungs- und Montageflächen, Arbeitsplätze und Böden, mit freigegebenen Reinigungsmitteln und in dem Intervall, das Ihr Hygieneplan vorgibt.',
  },
  {
    icon: ShieldCheck,
    title: 'Reinräume und Schleusen',
    text: 'Reihenfolge, Mittel, Einwirkzeiten und Bekleidungsregeln legen Sie in Ihrer SOP fest. Wir setzen sie mit eingewiesenem Personal um und dokumentieren jede Ausführung.',
  },
  {
    icon: FlaskConical,
    title: 'Labore und Prüfbereiche',
    text: 'Labor- und Prüfflächen reinigen wir nach Absprache mit Ihrer Laborleitung. Welche Flächen, Abzüge und Geräteoberflächen dazugehören, legen wir vorher gemeinsam fest.',
  },
  {
    icon: Users,
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

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Reinigung im Umfeld der Medizintechnik</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tuttlingen gilt als Weltzentrum der Medizintechnik. Mehrere hundert Betriebe in der Stadt und im
                Umland stellen chirurgische Instrumente, Endoskope und weitere Medizinprodukte her oder liefern Teile
                und Dienstleistungen dafür zu.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Für die Gebäudereinigung heißt das: Neben Büro und Lager gibt es in vielen Objekten Bereiche, für die
                Hygienepläne, Zonenkonzepte oder Reinraumvorgaben gelten. Wir übernehmen diese Vorgaben in unsere
                Checklisten, setzen dort feste, eingewiesene Mitarbeitende ein und dokumentieren jede Ausführung.
              </p>
              <ul className="space-y-4">
                {[
                  'Reinigung nach Ihren SOPs und Hygieneplänen',
                  'Feste, eingewiesene Teams für sensible Bereiche',
                  'Schleusen, Umkleiden und Nebenbereiche',
                  'Leistungsnachweise und Schulungsprotokolle für Audits',
                  'Büro-, Produktions- und Sonderbereiche aus einer Hand',
                  'Feste Objektleitung als Ansprechpartner',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontakt Region Tuttlingen</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Einsatzgebiet</h4>
                    <p className="text-gray-600">Tuttlingen und Landkreis Tuttlingen nach objektbezogener Abstimmung</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Betreut von</h4>
                    <Link
                      to="/standorte/villingen-schwenningen"
                      className="text-gray-600 hover:text-accent transition-colors"
                    >
                      Zentrale Villingen-Schwenningen
                    </Link>
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

          {/* Zonen in Medizintechnik-Objekten */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Was wir in Medizintechnik-Betrieben reinigen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Ein Medizintechnik-Standort besteht selten nur aus einem Bereich. Für jede Zone legen wir mit Ihnen
              Verfahren, Mittel und Intervalle fest und halten sie im Reinigungsplan fest.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ZONEN.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex gap-5">
                  <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0B2341] mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white border border-gray-100 rounded-2xl p-8 flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0B2341] flex-shrink-0">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#0B2341] mb-2">Nachweise für Ihr Qualitätsmanagement</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Wenn Ihr QM-System Nachweise über ausgelagerte Tätigkeiten verlangt, erhalten Sie von uns
                  Leistungsnachweise, Unterweisungs- und Schulungsprotokolle sowie Kontrollberichte. Änderungen an
                  Ihren SOPs übernehmen wir nach Freigabe in die Checklisten und weisen das Team erneut ein. Auf Wunsch
                  nimmt Ihre AHAD-Objektleitung an Audits teil.
                </p>
              </div>
            </div>
          </div>

          {/* Leistungen im Einsatzgebiet */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Unsere Leistungen in Tuttlingen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Von der Reinraumreinigung bis zur Glasfront: Sie können einzelne Leistungen beauftragen oder alle Zonen
              eines Standorts in einem Vertrag mit einer Objektleitung zusammenfassen.
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

          {/* Branchen im Einsatzgebiet */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Branchen, für die wir in Tuttlingen reinigen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Die Medizintechnik prägt den Standort, daneben gibt es Metallverarbeitung, Handel, Verwaltung und
              Gastgewerbe. Umfang und Zeitfenster richten wir nach Branche und Nutzung aus.
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Einsatzgebiete im Landkreis Tuttlingen</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              Tuttlingen ist Kreisstadt und umfasst neben der Kernstadt die Stadtteile Möhringen, Nendingen und
              Eßlingen. Im Gewerbegebiet Gänsäcker zwischen Möhringer Vorstadt und Möhringen haben sich mehrere
              Medizintechnik-Unternehmen angesiedelt. In diesen Orten können Sie Einsätze bei uns anfragen:
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
            <p className="text-sm text-gray-600 mt-6 max-w-3xl leading-relaxed">
              Von unserer Zentrale in Villingen-Schwenningen ist Tuttlingen über die B 523 erreichbar. Nach Angaben
              der IHK Schwarzwald-Baar-Heuberg arbeiten in der Region über 14.000 sozialversicherungspflichtig
              Beschäftigte im Wirtschaftszweig Medizinische Produkte und Geräte. Zum Umfeld der Branche gehört auch
              der Hochschulcampus Tuttlingen der Hochschule Furtwangen, der eng mit Unternehmen der Region
              zusammenarbeitet.
            </p>
          </div>

          {/* Warum AHAD in Tuttlingen */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Tuttlingen?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  In Medizintechnik-Betrieben muss jede Reinigung nachvollziehbar sein, und in sensiblen Bereichen
                  sollen dieselben Personen arbeiten. Wir setzen feste Teams ein, übernehmen Ihre SOPs in unsere
                  Checklisten und kündigen jeden Personalwechsel an. Koordiniert wird von unserer Zentrale in
                  Villingen-Schwenningen, Ihr Ansprechpartner ist die zuständige Objektleitung.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Feste, eingewiesene Teams</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Nachweise für Ihre Audits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Häufige Fragen zur Gebäudereinigung in Tuttlingen</h2>
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
