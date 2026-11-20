import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import RuleColumns from '@/components/ui/RuleColumns';
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
    title: 'Frühe Frostperiode',
    text: 'Die Baar gilt als einer der Kältepole Deutschlands. Frost setzt im Mittel früher ein als im umliegenden Schwarzwald. Den Winterdienst planen wir so, dass Zufahrten, Gehwege und Parkflächen vor Betriebsbeginn geräumt und gestreut sind, bei Bedarf ab 4 Uhr.',
  },
  {
    title: 'Streusalz im Eingangsbereich',
    text: 'Was im Winter an den Schuhen hereinkommt, landet auf Teppichböden und in Sauberlaufzonen. Auf Wunsch reinigen wir diese Flächen in der Wintersaison in kürzeren Intervallen und entfernen im Frühjahr die Salzränder, damit der Belag länger hält.',
  },
  {
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
      'Ja. Donaueschingen gehört zu unserem Einsatzgebiet im Winterdienst. Wir räumen und streuen die vereinbarten Flächen, bei Bedarf ab 4 Uhr, und protokollieren jeden Einsatz mit Zeit, Fläche und Maßnahme. Weil der Frost auf der Baar früh einsetzt, sollten Sie den Winterdienst möglichst vor Saisonbeginn vereinbaren.',
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

      <section className="bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-10 section-y-sm">
            <div className="lg:col-span-7">
              <h2 className="display-md text-navy mb-6">Reinigungsfirma für Donaueschingen und die Baar</h2>
              <p className="text-lg text-slate mb-6 leading-relaxed">
                Donaueschingen liegt im Schwarzwald-Baar-Kreis, im selben Landkreis wie unsere Zentrale. Wir planen
                Reinigung, Glasreinigung und Winterdienst für Ihr Objekt von Villingen-Schwenningen aus und schicken
                feste Teams, die Ihr Objekt und Ihre Abläufe kennen.
              </p>
              <p className="text-lg text-slate mb-8 leading-relaxed">
                Ob Bürogebäude in der Innenstadt, Praxis in Hüfingen oder Lagerhalle in Bräunlingen: Für jedes Objekt
                gibt es einen Reinigungsplan mit Leistungen, Intervallen und Zeitfenstern sowie eine Objektleitung, die
                Qualitätskontrollen durchführt und Änderungen mit Ihnen abstimmt.
              </p>
              <ul className="border-t border-navy">
                {[
                  'Büro- und Unterhaltsreinigung im festen Intervall',
                  'Fenster- & Glasreinigung für Büro- und Gewerbebauten',
                  'Teppich- und Polsterreinigung außerhalb der Betriebszeit',
                  'Winterdienst mit protokollierten Einsätzen',
                  'Bauendreinigung vor Übergabe und Abnahme',
                  'Feste Objektleitung als Ansprechpartner',
                ].map((item) => (
                  <li key={item} className="py-3 border-b border-line font-medium text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <h3 className="pb-4 border-b border-navy font-semibold text-navy">Kontakt Region Donaueschingen</h3>
              <div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3.5 border-b border-line">
                  <p className="text-body-sm text-slate">Einsatzgebiet</p>
                  <div className="font-medium">
                    <p className="text-navy">Donaueschingen, Hüfingen, Bräunlingen und Umgebung nach objektbezogener Abstimmung</p>
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

          {/* Lage und Klima der Baar */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Was die Lage auf der Baar für Ihre Reinigung bedeutet</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Donaueschingen liegt dort, wo Brigach und Breg zur Donau zusammenfließen, auf der Hochfläche der Baar.
              Klima und Verkehrslage wirken sich auf Winterdienst, Bodenpflege und Einsatzplanung aus.
            </p>
            <RuleColumns cols={3} items={BAAR_FAKTOREN.map(({ title, text }) => ({ title, text }))} />
          </div>

          {/* Leistungen im Einsatzgebiet */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Unsere Leistungen in Donaueschingen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Gebäudereinigung und Objektservice für Unternehmen in Donaueschingen und Umgebung. Sie können einzelne
              Leistungen beauftragen oder mehrere in einem Vertrag zusammenfassen.
            </p>
            <RuleColumns cols={3} items={LOCAL_SERVICES.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Branchen im Einsatzgebiet */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Branchen, für die wir in Donaueschingen reinigen</h2>
            <p className="text-lg text-slate mb-10 max-w-3xl leading-relaxed">
              Eine Arztpraxis braucht andere Mittel und Intervalle als eine Lagerhalle oder ein Hotel. Wir legen
              Umfang und Zeitfenster nach Branche und Nutzung fest.
            </p>
            <RuleColumns cols={3} items={LOCAL_BRANCHEN.map((entry) => ({ title: entry.title, text: entry.desc, to: entry.to }))} />
          </div>

          {/* Einsatzgebiete */}
          <div className="section-y-sm border-t border-line">
            <h2 className="display-md text-navy mb-4">Einsatzgebiete rund um Donaueschingen</h2>
            <p className="text-lg text-slate mb-8 max-w-3xl leading-relaxed">
              In diesen Orten können Sie Reinigung und Winterdienst bei uns anfragen:
            </p>
            <p className="text-lg font-medium text-navy leading-relaxed max-w-4xl">{SERVICE_AREAS.join(' · ')}</p>

            <RuleColumns cols={3} className="mt-12" items={UMLAND.map(({ title, text }) => ({ title, text }))} />
          </div>

          {/* Warum AHAD für Donaueschingen */}
          <div className="bg-navy text-white px-6 py-10 sm:p-12 lg:p-14 mb-14 lg:mb-16">
            <div>
              <div className="max-w-3xl">
                <h2 className="display-md text-white mb-5">Warum AHAD Cleaning für Donaueschingen?</h2>
                <p className="text-lg text-ondark mb-8 leading-relaxed">
                  Unsere Zentrale liegt im selben Landkreis. Die zuständige Objektleitung kommt zur Besichtigung, zu
                  Qualitätskontrollen und zu Abstimmungsterminen zu Ihnen ins Objekt. Im Winter wird jeder Einsatz
                  protokolliert, damit Sie nachvollziehen können, wann und wo geräumt und gestreut wurde.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-white/30">
                  <p className="py-3.5 border-b border-white/15 font-medium">Zentrale im Schwarzwald-Baar-Kreis</p>
                  <p className="py-3.5 border-b border-white/15 font-medium">Protokollierter Winterdienst</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lokale FAQ */}
          <div className="section-y-sm border-t border-line max-w-4xl">
            <h2 className="display-md text-navy mb-6">Häufige Fragen zur Gebäudereinigung in Donaueschingen</h2>
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
