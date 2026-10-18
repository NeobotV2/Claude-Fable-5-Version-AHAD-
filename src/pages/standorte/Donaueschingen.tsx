import { MapPin, CheckCircle2, Phone, Mail, ArrowRight, Snowflake, Footprints, Route, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import { ORG_REF, SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

/** Einsatzgebiet ohne eigene Niederlassung: Donaueschingen und die Baar werden
 *  von der Zentrale in Villingen-Schwenningen aus betreut. Deshalb weder
 *  Filialadresse noch Geo-Koordinaten noch LocalBusiness-Markup. */

const LOCAL_SERVICES = [
  {
    title: 'Unterhaltsreinigung in Donaueschingen',
    to: '/leistungen/unterhaltsreinigung',
    desc: 'Büros, Verwaltungen, Praxen und Sozialräume in Donaueschingen und Hüfingen, gereinigt im vereinbarten Intervall und nach einem festen Reinigungsplan.',
  },
  {
    title: 'Fenster- & Glasreinigung in Donaueschingen',
    to: '/leistungen/glas-fassadenreinigung',
    desc: 'Fenster, Rahmen, Glasfronten und Fassadenflächen von Büro- und Gewerbebauten, auch in der Höhe und im Osmose-Verfahren mit Reinwasser.',
  },
  {
    title: 'Teppichreinigung in Donaueschingen',
    to: '/leistungen/teppichreinigung',
    desc: 'Teppichböden, Polster und Bürostühle. Nach dem Winter entfernen wir auch Streusalzränder in Eingangsbereichen und auf Laufstraßen.',
  },
  {
    title: 'Winterdienst & Hausmeisterservice in Donaueschingen',
    to: '/leistungen/winterdienst-hausmeisterservice',
    desc: 'Räumen und Streuen von Zufahrten, Gehwegen und Parkflächen mit Einsatzprotokoll, dazu Kontrollgänge und Kleinreparaturen im Objekt.',
  },
  {
    title: 'Industrie- & Produktionsreinigung in Donaueschingen',
    to: '/leistungen/industrie-produktionsreinigung',
    desc: 'Hallen-, Lager- und Produktionsflächen sowie Sozialräume auf der Baar, abgestimmt auf Ihre Schichtzeiten und Arbeitsschutzvorgaben.',
  },
  {
    title: 'Baureinigung in Donaueschingen',
    to: '/leistungen/baureinigung',
    desc: 'Grob-, Zwischen- und Bauendreinigung für Neubau und Sanierung, terminiert auf Übergabe und Abnahme mit der Bauleitung.',
  },
];

/** Branchen im Einsatzgebiet: verknüpft die Seite mit den Branchenseiten. */
const LOCAL_BRANCHEN = [
  {
    title: 'Büros, Verwaltung & öffentliche Einrichtungen',
    to: '/branchen/buero-verwaltung',
    desc: 'Verwaltungen, Kanzleien, Schulungs- und Besprechungsräume in Donaueschingen, Hüfingen und Bräunlingen, gereinigt vor oder nach Ihren Bürozeiten.',
  },
  {
    title: 'Handel & Gewerbeobjekte',
    to: '/branchen/gewerbeobjekte',
    desc: 'Märkte, Autohäuser und Fachhandel. Eingänge, Verkaufsflächen und Kundentoiletten haben dabei Vorrang, im Winter besonders die Sauberlaufzonen.',
  },
  {
    title: 'Industrie & Produktion',
    to: '/branchen/industrie-produktion',
    desc: 'Fertigungs- und Lagerbetriebe auf der Baar, gereinigt im laufenden Betrieb oder gebündelt in Stillstands- und Ferienzeiten.',
  },
  {
    title: 'Hotellerie & Objektbetrieb',
    to: '/branchen/hotellerie-objektbetrieb',
    desc: 'Hotels, Gastronomie und Tagungsstätten. Zimmer, Gasträume und Seminarräume reinigen wir nach Belegungsplan.',
  },
  {
    title: 'Medizintechnik, Praxen & Kliniken',
    to: '/branchen/medizintechnik',
    desc: 'Arztpraxen, Therapiezentren und Pflegeeinrichtungen, gereinigt nach Ihrem Hygieneplan und mit dokumentierter Ausführung.',
  },
];

/** Lagebezogene Besonderheiten der Baar, die die Reinigungsplanung beeinflussen. */
const BAAR_FAKTOREN = [
  {
    icon: Snowflake,
    title: 'Frühe Frostperiode',
    text: 'Die Baar gilt als einer der Kältepole Deutschlands. Frost setzt im Mittel früher ein als im umliegenden Schwarzwald. Den Winterdienst planen wir so, dass Zufahrten, Gehwege und Parkflächen vor Betriebsbeginn geräumt und gestreut sind, bei Bedarf ab 4 Uhr.',
  },
  {
    icon: Footprints,
    title: 'Streusalz im Eingangsbereich',
    text: 'Was im Winter an den Schuhen hereinkommt, landet auf Teppichböden und in Sauberlaufzonen. Auf Wunsch reinigen wir diese Flächen in der Wintersaison in kürzeren Intervallen und entfernen im Frühjahr die Salzränder, damit der Belag länger hält.',
  },
  {
    icon: Route,
    title: 'Kurze Anbindung an die Zentrale',
    text: 'Bei Donaueschingen treffen B 27, B 31 und B 33 aufeinander, über die A 864 besteht Anschluss an die A 81. Von unserer Zentrale in Villingen-Schwenningen sind es über die B 27 etwa 15 bis 17 Kilometer.',
  },
];

const SERVICE_AREAS = [
  'Donaueschingen',
  'Hüfingen',
  'Bräunlingen',
  'Blumberg',
  'Brigachtal',
  'Bad Dürrheim',
  'Geisingen',
  'Schwarzwald-Baar-Kreis',
];

/** Umland nach Lage gruppiert, jeweils mit eigenem Text statt Einzelseiten je Ort. */
const UMLAND = [
  {
    title: 'Hüfingen und Bräunlingen',
    text: 'Beide Städte liegen nur wenige Kilometer von Donaueschingen entfernt. Für Büros, Praxen und Betriebe dort gelten dieselben Abläufe: eine Objektleitung, ein Reinigungsplan und dieselbe Dokumentation, auch wenn Sie Objekte in mehreren Orten haben.',
  },
  {
    title: 'Brigachtal und Bad Dürrheim',
    text: 'Beide Gemeinden liegen nur wenige Kilometer von unserer Zentrale in Villingen-Schwenningen entfernt. Neben Unterhalts- und Glasreinigung übernehmen wir hier auch Sonder- und Grundreinigungen nach Absprache.',
  },
  {
    title: 'Blumberg und Geisingen',
    text: 'Für Objekte im Süden und Osten der Baar stimmen wir Leistungsumfang, Intervalle und Einsatzzeiten bei der Besichtigung ab. Beim Winterdienst prüfen wir vor dem Angebot, wie sich Ihre Flächen in die Räumtouren einplanen lassen.',
  },
];

const LOCAL_FAQS: FAQItem[] = [
  {
    question: 'Welche Reinigungsleistungen bietet AHAD in Donaueschingen?',
    answer:
      'In Donaueschingen, Hüfingen und Bräunlingen übernehmen wir Unterhaltsreinigung, Fenster- und Glasreinigung, Teppichreinigung, Industrie- und Produktionsreinigung, Baureinigung sowie Winterdienst und Hausmeisterservice. Koordiniert wird jedes Objekt von unserer Zentrale in Villingen-Schwenningen aus, Ihr Ansprechpartner ist eine feste Objektleitung.',
  },
  {
    question: 'Bieten Sie Winterdienst in Donaueschingen an?',
    answer:
      'Ja. Donaueschingen gehört zu unserem Einsatzgebiet im Winterdienst. Wir räumen und streuen die vereinbarten Flächen, bei Bedarf ab 4 Uhr, und protokollieren jeden Einsatz mit Zeit, Fläche und Maßnahme. Weil der Frost auf der Baar früh einsetzt, sollten Sie den Winterdienst möglichst vor Saisonbeginn vereinbaren.',
  },
  {
    question: 'Haben Sie eine Niederlassung in Donaueschingen?',
    answer:
      'Nein. Wir betreuen Donaueschingen und die Nachbarorte von unserer Zentrale in Villingen-Schwenningen aus. Besichtigung, Qualitätskontrollen und Abstimmungstermine finden bei Ihnen im Objekt statt.',
  },
  {
    question: 'Übernehmen Sie auch Aufträge in Hüfingen, Bräunlingen oder Blumberg?',
    answer:
      'Ja. Hüfingen, Bräunlingen, Blumberg und Brigachtal gehören zu unserem Einsatzgebiet. Leistungsumfang und Einsatzzeiten stimmen wir für jedes Objekt bei der Besichtigung ab.',
  },
  {
    question: 'Reinigen Sie Teppichböden nach dem Winter?',
    answer:
      'Ja. Wir entfernen Streusalzränder und reinigen Teppichböden, Laufstraßen und Sauberlaufzonen außerhalb Ihrer Betriebszeit. Vorab sagen wir Ihnen, ab wann die Flächen wieder begehbar sind.',
  },
  {
    question: 'Wie kommt ein Angebot für ein Objekt in Donaueschingen zustande?',
    answer:
      'Nach Ihrer Anfrage vereinbaren wir einen Termin zur Besichtigung. Wir sehen uns Flächen, Beläge, Nutzung und gewünschte Zeitfenster an und erstellen danach ein Angebot mit Reinigungsplan.',
  },
];

export default function StandortDonaueschingen() {
  const regionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gebäudereinigung in Donaueschingen, Hüfingen und Bräunlingen',
    serviceType: 'Gebäudereinigung',
    '@id': `${SITE.url}/standorte/donaueschingen#service`,
    url: `${SITE.url}/standorte/donaueschingen`,
    provider: ORG_REF,
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': name.endsWith('-Kreis') ? 'AdministrativeArea' : 'City', name })),
  };

  return (
    <div>
      <SEO
        title="Gebäudereinigung Donaueschingen | AHAD Cleaning"
        description="Gebäudereinigung in Donaueschingen, Hüfingen und Bräunlingen: Büro-, Fenster- und Teppichreinigung sowie Winterdienst für Unternehmen, ab Zentrale in VS."
        keywords="Gebäudereinigung Donaueschingen, Reinigungsfirma Donaueschingen, Reinigungsservice Donaueschingen, Winterdienst Donaueschingen, Büroreinigung Hüfingen, Gebäudereinigung Bräunlingen"
        schema={[regionalServiceSchema, faqSchemaFrom(LOCAL_FAQS)]}
      />
      <PageHero
        eyebrow="Einsatzgebiet · Baar"
        title="Gebäudereinigung in Donaueschingen und Hüfingen"
        lead="Von unserer Zentrale in Villingen-Schwenningen aus übernehmen wir die Reinigung von Büros, Praxen, Gewerbe- und Produktionsflächen in Donaueschingen, Hüfingen, Bräunlingen und den umliegenden Gemeinden der Baar."
        image={IMG.heroMain}
        imageAlt="AHAD-Fahrzeuge vor der Zentrale in Villingen-Schwenningen"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Donaueschingen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Reinigungsfirma für Donaueschingen und die Baar</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Donaueschingen liegt im Schwarzwald-Baar-Kreis, im selben Landkreis wie unsere Zentrale. Wir planen
                Reinigung, Glasreinigung und Winterdienst für Ihr Objekt von Villingen-Schwenningen aus und schicken
                feste Teams, die Ihr Objekt und Ihre Abläufe kennen.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ob Bürogebäude in der Innenstadt, Praxis in Hüfingen oder Lagerhalle in Bräunlingen: Für jedes Objekt
                gibt es einen Reinigungsplan mit Leistungen, Intervallen und Zeitfenstern sowie eine Objektleitung, die
                Qualitätskontrollen durchführt und Änderungen mit Ihnen abstimmt.
              </p>
              <ul className="space-y-4">
                {[
                  'Büro- und Unterhaltsreinigung im festen Intervall',
                  'Fenster- & Glasreinigung für Büro- und Gewerbebauten',
                  'Teppich- und Polsterreinigung außerhalb der Betriebszeit',
                  'Winterdienst mit protokollierten Einsätzen',
                  'Bauendreinigung vor Übergabe und Abnahme',
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
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontakt Region Donaueschingen</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Einsatzgebiet</h4>
                    <p className="text-gray-600">Donaueschingen, Hüfingen, Bräunlingen und Umgebung nach objektbezogener Abstimmung</p>
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

          {/* Lage und Klima der Baar */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Was die Lage auf der Baar für Ihre Reinigung bedeutet</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Donaueschingen liegt dort, wo Brigach und Breg zur Donau zusammenfließen, auf der Hochfläche der Baar.
              Klima und Verkehrslage wirken sich auf Winterdienst, Bodenpflege und Einsatzplanung aus.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BAAR_FAKTOREN.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0B2341] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0B2341] mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leistungen im Einsatzgebiet */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Unsere Leistungen in Donaueschingen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Gebäudereinigung und Objektservice für Unternehmen in Donaueschingen und Umgebung. Sie können einzelne
              Leistungen beauftragen oder mehrere in einem Vertrag zusammenfassen.
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Branchen, für die wir in Donaueschingen reinigen</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
              Eine Arztpraxis braucht andere Mittel und Intervalle als eine Lagerhalle oder ein Hotel. Wir legen
              Umfang und Zeitfenster nach Branche und Nutzung fest.
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
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Einsatzgebiete rund um Donaueschingen</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              In diesen Orten können Sie Reinigung und Winterdienst bei uns anfragen:
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

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {UMLAND.map((area) => (
                <div key={area.title} className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-[#0B2341] mb-2">{area.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{area.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warum AHAD für Donaueschingen */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning für Donaueschingen?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Unsere Zentrale liegt im selben Landkreis. Die zuständige Objektleitung kommt zur Besichtigung, zu
                  Qualitätskontrollen und zu Abstimmungsterminen zu Ihnen ins Objekt. Im Winter wird jeder Einsatz
                  protokolliert, damit Sie nachvollziehen können, wann und wo geräumt und gestreut wurde.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Zentrale im Schwarzwald-Baar-Kreis</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Protokollierter Winterdienst</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Häufige Fragen zur Gebäudereinigung in Donaueschingen</h2>
            <Accordion items={LOCAL_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt in Donaueschingen oder Hüfingen?"
        lead="Wir besichtigen Ihr Objekt zu einem abgestimmten Termin und erstellen danach ein Angebot. Den Winterdienst vereinbaren Sie am besten vor Saisonbeginn."
      />
    </div>
  );
}
