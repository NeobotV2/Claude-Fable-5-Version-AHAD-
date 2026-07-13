import { CheckCircle2, CircleAlert, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import PageHero from '@/components/PageHero';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

const ARTICLE_SLUG = 'industrie-produktionsreinigung-ohne-prozessstoerung' as const;

export default function FachwissenIndustrieProzess() {
  const articleSchema = buildArticleSchema(EDITORIAL_ARTICLES[ARTICLE_SLUG]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kann Industriereinigung immer ohne Produktionsstillstand erfolgen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein. Arbeiten außerhalb des Gefahrenbereichs können je nach Gefährdungsbeurteilung bei laufender Produktion möglich sein. In angrenzenden Bereichen können Abschottung oder ein Teilstillstand erforderlich werden. Eingriffe in Maschinen, Arbeiten an Energiequellen oder Tätigkeiten mit nicht beherrschbaren Emissionen erfordern regelmäßig eine gesicherte Abschaltung und Freigabe. Maßgeblich sind die objektbezogene Gefährdungsbeurteilung, Herstellerangaben und das Freigabeverfahren des Betreibers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Sicherheitsvorkehrungen sind bei der Industriereinigung wichtig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vor Arbeitsbeginn werden Arbeitsbereich, Gefährdungen, Energiequellen, Verkehrswege, Stoffe, Schutzmaßnahmen, Zuständigkeiten und Abbruchkriterien festgelegt. Je nach Aufgabe gehören dazu Permit-to-work, sichere Außerbetriebnahme und LOTO, Abschottung, Absaugung oder Lüftung, geeignete PSA, Unterweisung, Endkontrolle und eine dokumentierte Rückgabe an den Betreiber.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welchen wirtschaftlichen Nutzen kann geplante Maschinenreinigung haben?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Geplante Reinigung kann Ablagerungen begrenzen, Inspektionen unterstützen und Reinigungsarbeiten mit Rüst- oder Wartungsfenstern bündeln. Ob dadurch Verfügbarkeit, Ausschuss oder Instandhaltungsaufwand verbessert werden, muss am konkreten Prozess mit geeigneten Kennzahlen geprüft werden; eine pauschale Einsparung lässt sich nicht zusagen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was sollte eine Industriereinigung dokumentieren?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der notwendige Umfang folgt aus Auftrag und Gefährdungsbeurteilung. Typische Unterlagen sind Arbeits- und Freigabeschein, abgestimmte Schutzmaßnahmen, LOTO- oder Abschaltnachweis, eingesetzte Stoffe und Verfahren, Sicherheitsdatenblätter, Personal und Zeitfenster, Abweichungen, Entsorgungsnachweise, Endkontrolle sowie die dokumentierte Rückgabe des Bereichs oder der Anlage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Regeln sind bei Industriereinigung in Deutschland relevant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Welche Vorschriften und technischen Regeln anzuwenden sind, hängt von Anlage, Tätigkeit, Stoffen und Branche ab. Regelmäßig zu prüfen sind unter anderem Arbeitsschutz, Betriebssicherheit, Gefahrstoffe und die Zusammenarbeit mehrerer Arbeitgeber. Betreiber und Reinigungsunternehmen müssen die Schutzmaßnahmen für den konkreten Auftrag abstimmen; branchenspezifische Hygiene- oder Produktanforderungen können hinzukommen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet Industriereinigung im laufenden Betrieb?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein belastbarer Preis setzt eine Objekt- und Aufgabenaufnahme voraus. Kalkulationsrelevant sind unter anderem Fläche und Zugänglichkeit, Verschmutzung, Verfahren, Personalqualifikation, Schutz- und Freigabeaufwand, Schichtfenster, Entsorgung sowie Dokumentation. Ohne diese Angaben sind pauschale Quadratmeter- oder Stundensätze nicht vergleichbar.',
        },
      },
    ],
  };

  return (
    <article>
      <SEO
        title="Industriereinigung ohne Stillstand? Planung & Freigabe | AHAD"
        description="Industriereinigung im Betrieb planen: Entscheidung zwischen laufender Anlage, Abschottung, Teilstillstand und gesicherter Abschaltung mit klarer Freigabe."
        keywords="Industriereinigung Prozess, Reinigung ohne Stillstand, Produktionsreinigung Strategie, Maschinenreinigung laufender Betrieb, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Produktionsreinigung"
        title="Industriereinigung im Betrieb: Was läuft weiter, was muss stehen?"
        lead="Ohne Stillstand ist nicht immer sicher oder technisch möglich. Gefährdungsbeurteilung, Arbeitsbereich und Betreiberfreigabe entscheiden, ob bei laufender Anlage, abgeschottet oder nur im gesicherten Stillstand gereinigt wird."
        image="/images/ahad/industrie-detail.webp"
        imageAlt="Abgestimmte Reinigungsarbeiten in einer Produktionshalle"
        crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'Industriereinigung im Betrieb' }]}
      />

      <ArticleMeta slug={ARTICLE_SLUG} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="prozessabstimmung" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Prozesse abstimmen: zuerst die zulässige Betriebsart entscheiden
            </h2>
            <p>
              Industriereinigung lässt sich nur dann parallel zur Produktion ausführen, wenn Gefährdungen für
              Beschäftigte, Anlage und Produkt beherrscht sind. Die Frage lautet deshalb nicht pauschal „ohne
              Stillstand oder mit Stillstand?“, sondern: Welche Tätigkeit findet in welchem Bereich unter welchen
              freigegebenen Bedingungen statt? Betreiber, Facility Management, Produktion und{' '}
              <Link to="/leistungen/industrie-produktionsreinigung" className="font-bold text-brand hover:underline">
                Reinigungsdienstleister
              </Link>{' '}
              müssen diese Entscheidung vor der Ausführung treffen.
            </p>

            <div className="not-prose my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">Klare Grenze</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Eingriffe hinter Schutzeinrichtungen, Arbeiten an Energiequellen oder Tätigkeiten mit nicht
                    ausreichend beherrschbaren Emissionen gehören nicht neben eine ungesichert laufende Anlage. In
                    solchen Fällen sind Abschaltung, Sicherung gegen Wiederanlauf und dokumentierte Freigabe Teil der
                    Arbeitsvorbereitung.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Entscheidungsmatrix für die Betriebsart"
              tabIndex={0}
            >
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Drei Betriebsarten für die Arbeitsfreigabe
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Betriebsart</th>
                    <th scope="col" className="px-4 py-3 font-bold">Möglicher Einsatz</th>
                    <th scope="col" className="px-4 py-3 font-bold">Erforderliche Grenze</th>
                    <th scope="col" className="px-4 py-3 font-bold">Freigabeentscheidung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Laufende Anlage</th>
                    <td className="px-4 py-4">Freigegebene Arbeiten außerhalb von Gefahren- und Produkteinflussbereichen</td>
                    <td className="px-4 py-4">Sicherer Abstand, getrennte Wege, beherrschte Stoffe und keine Eingriffe in Schutzeinrichtungen</td>
                    <td className="px-4 py-4">Nur wenn Gefährdungsbeurteilung und betriebliche Regeln die Tätigkeit zulassen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Angrenzend / Teilbereich</th>
                    <td className="px-4 py-4">Reinigung eines räumlich oder organisatorisch trennbaren Abschnitts</td>
                    <td className="px-4 py-4">Abschottung, Verkehrsregelung, Produkt- und Emissionsschutz sowie definierte Schnittstellen</td>
                    <td className="px-4 py-4">Teilfreigabe mit dokumentierten Grenzen und Abbruchkriterien</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Gesicherter Stillstand</th>
                    <td className="px-4 py-4">Arbeiten in Maschinen, an Energiequellen oder hinter trennenden Schutzeinrichtungen</td>
                    <td className="px-4 py-4">Außerbetriebnahme, LOTO nach Betriebsverfahren, Restenergien beherrschen und Wiederanlauf verhindern</td>
                    <td className="px-4 py-4">Freigabe vor Beginn und Rückgabe vor Wiederinbetriebnahme durch befugte Personen</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Fünf Angaben vor jeder Terminplanung</h3>
            <ul className="not-prose my-8 space-y-3">
              {[
                'Exakter Arbeitsbereich und gewünschtes Reinigungsergebnis',
                'Betriebszustände, Energiequellen, Restenergien und Herstellerangaben',
                'Stoffe, Verschmutzung, Produkt- und Hygieneanforderungen',
                'Gleichzeitig arbeitende Personen, Verkehrswege und Nachbarprozesse',
                'Befugte Personen für Arbeitsfreigabe, Abschaltung und Rückgabe',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 id="schutzmassnahmen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Schutzmaßnahmen und Verantwortungen vor Beginn festlegen
            </h2>
            <p>
              Betreiber und Fremdfirma haben jeweils eigene Pflichten und müssen bei wechselseitigen Gefährdungen
              zusammenarbeiten. Der betriebliche Freigabeprozess sollte deshalb nicht nur eine Unterschrift liefern,
              sondern Arbeitsumfang, Schutzmaßnahmen, Verantwortliche und Rückgabe eindeutig verbinden.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Verantwortungsmatrix für Schutzmaßnahmen"
              tabIndex={0}
            >
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Verantwortungen im Freigabe- und Rückgabeprozess
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Aufgabe</th>
                    <th scope="col" className="px-4 py-3 font-bold">Betreiber / Produktion</th>
                    <th scope="col" className="px-4 py-3 font-bold">Reinigungsunternehmen</th>
                    <th scope="col" className="px-4 py-3 font-bold">Gemeinsamer Nachweis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Gefährdungen abstimmen</th>
                    <td className="px-4 py-4">Anlagen-, Prozess- und Standortgefahren mitteilen</td>
                    <td className="px-4 py-4">Gefahren aus Verfahren, Stoffen und Arbeitsmitteln mitteilen</td>
                    <td className="px-4 py-4">Abgestimmte Gefährdungsbeurteilung / Arbeitsplan</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Permit-to-work</th>
                    <td className="px-4 py-4">Befugte Freigabeperson und betriebliche Bedingungen benennen</td>
                    <td className="px-4 py-4">Umfang, Personal, Verfahren und Schutzmaßnahmen bestätigen</td>
                    <td className="px-4 py-4">Arbeits- oder Freigabeschein mit Geltungsdauer</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">LOTO / Abschaltung</th>
                    <td className="px-4 py-4">Energiequellen nach Betriebsverfahren isolieren und Anlagenzustand freigeben</td>
                    <td className="px-4 py-4">Freigabe prüfen, eigene Sicherungen nach Verfahren anwenden und keine fremden Sperren entfernen</td>
                    <td className="px-4 py-4">Kennzeichnung, Sperrpunkte und Freigabestatus</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Abschottung</th>
                    <td className="px-4 py-4">Produkt, Anlagen und betriebliche Verkehrswege berücksichtigen</td>
                    <td className="px-4 py-4">Barrieren, Einhausung, Absaugung oder Lüftung wie freigegeben umsetzen</td>
                    <td className="px-4 py-4">Lageplan und Kontrollpunkte</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Rückgabe</th>
                    <td className="px-4 py-4">Endzustand prüfen und Wiederinbetriebnahme autorisieren</td>
                    <td className="px-4 py-4">Werkzeuge, Rückstände und Schutzmittel entfernen; Bereich als fertig melden</td>
                    <td className="px-4 py-4">Endkontrolle und dokumentierte Anlagenrückgabe</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-paper p-6">
                <ShieldCheck className="h-7 w-7 text-brand" aria-hidden="true" />
                <h3 className="mt-4 font-headline text-xl font-bold text-navy">Vor Arbeitsbeginn</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Freigabestatus, Unterweisung, PSA, Rettungs- und Alarmweg, Abschottung, Stoffe sowie
                  Kommunikations- und Abbruchsignal gemeinsam prüfen.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-paper p-6">
                <CircleAlert className="h-7 w-7 text-amber-700" aria-hidden="true" />
                <h3 className="mt-4 font-headline text-xl font-bold text-navy">Arbeit unterbrechen</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Bei geändertem Anlagenzustand, beschädigter Abschottung, unklarer Freigabe, unerwarteten Stoffen
                  oder überschrittenen Schutzgrenzen wird die Arbeit gestoppt und neu bewertet.
                </p>
              </div>
            </div>

            <h2 id="reinigungsfenster" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Reinigungsfenster bis zur dokumentierten Rückgabe planen
            </h2>
            <p>
              Pausen, Rüstvorgänge und Wartungsfenster sind mögliche Zeitbausteine, aber noch keine Arbeitsfreigabe.
              Erst wenn Umfang, Schutzmaßnahmen und Rückgabe in das verfügbare Fenster passen, wird daraus ein
              belastbarer Ablauf. Reicht das Fenster nicht aus, müssen Aufgabe, Abschnitt oder Betriebszustand neu
              geplant werden.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Ablauf eines Reinigungsfensters"
              tabIndex={0}
            >
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Ablauf relativ zum freigegebenen Reinigungsfenster
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Zeitpunkt</th>
                    <th scope="col" className="px-4 py-3 font-bold">Entscheidung / Tätigkeit</th>
                    <th scope="col" className="px-4 py-3 font-bold">Abschlusskriterium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Vor dem Fenster</th>
                    <td className="px-4 py-4">Aufgabe, Betriebsart, Personal, Verfahren, Freigaben und Zeitreserve abstimmen</td>
                    <td className="px-4 py-4">Vollständiger Arbeitsplan und benannte Freigabepersonen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Fensterbeginn</th>
                    <td className="px-4 py-4">Anlagenzustand feststellen, LOTO und Abschottung prüfen, Permit aktivieren</td>
                    <td className="px-4 py-4">Dokumentierte Startfreigabe</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Während der Arbeit</th>
                    <td className="px-4 py-4">Schutzgrenzen überwachen, Abweichungen melden und Abbruchkriterien anwenden</td>
                    <td className="px-4 py-4">Arbeit bleibt innerhalb des freigegebenen Umfangs</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Arbeitsende</th>
                    <td className="px-4 py-4">Rückstände, Werkzeuge und temporäre Hilfsmittel entfernen; Ergebnis kontrollieren</td>
                    <td className="px-4 py-4">Bereich vollständig und ohne offene Abweichung gemeldet</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Rückgabe</th>
                    <td className="px-4 py-4">Gemeinsame Endkontrolle; Sperren nur nach festgelegtem Verfahren aufheben</td>
                    <td className="px-4 py-4">Dokumentierte Rückgabe und Freigabe zur Wiederinbetriebnahme</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Wirksamkeit ohne fiktive ROI-Zahl bewerten</h3>
            <p>
              Ob die Prozessintegration wirtschaftlich wirkt, lässt sich erst mit betrieblichen Daten beurteilen.
              Geeignete Vergleichsgrößen können geplante und ungeplante Stillstandszeit, Zusatzfreigaben,
              Nachreinigung, Qualitätsabweichungen oder der tatsächliche Aufwand je freigegebenem Fenster sein. Die
              Ausgangslage und der Messzeitraum müssen dabei gleich definiert sein.
            </p>

            <h2 id="verfahren-auswaehlen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Verfahren nach Rückstand, Emission und Schutzbedarf auswählen
            </h2>
            <p>
              Kein Reinigungsverfahren ist allein aufgrund seines Namens für den laufenden Betrieb geeignet. Die
              Auswahl folgt dem Material, der Verschmutzung, dem gewünschten Ergebnis, den Herstellerangaben und den
              Gefährdungen des Verfahrens. Eine Probefläche oder technische Freigabe kann erforderlich sein.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Kriterien zur Auswahl des Reinigungsverfahrens"
              tabIndex={0}
            >
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-headline font-bold text-navy">
                  Verfahrenswahl mit typischen Prüf- und Schutzpunkten
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Verfahrensgruppe</th>
                    <th scope="col" className="px-4 py-3 font-bold">Zu prüfen</th>
                    <th scope="col" className="px-4 py-3 font-bold">Mögliche Schutzpunkte</th>
                    <th scope="col" className="px-4 py-3 font-bold">Keine pauschale Aussage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Wischen / Saugen</th>
                    <td className="px-4 py-4">Staubklasse, Aufwirbelung, Zugänglichkeit und bewegte Anlagenteile</td>
                    <td className="px-4 py-4">Geeignete Absaugung, sichere Wege und Bereichstrennung</td>
                    <td className="px-4 py-4">Auch scheinbar einfache Arbeiten sind nicht automatisch neben jeder Anlage zulässig</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Nass / Hochdruck</th>
                    <td className="px-4 py-4">Wassereintrag, Aerosole, Elektrik, Korrosion, Rutsch- und Abwasserrisiko</td>
                    <td className="px-4 py-4">Abschottung, Auffangung, Entsorgung und häufig gesicherter Betriebszustand</td>
                    <td className="px-4 py-4">„Mit Wasser abwaschbar“ bedeutet nicht, dass die Anlage betriebsbereit bleiben darf</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Strahlverfahren / Trockeneis</th>
                    <td className="px-4 py-4">CO₂, Lärm, Sicht, weggeschleuderte Partikel, Materialverträglichkeit und gelöster Schmutz</td>
                    <td className="px-4 py-4">Lüftung oder Absaugung, Abschottung, PSA, Zugangskontrolle und Rückstandsentfernung</td>
                    <td className="px-4 py-4">Trockeneis ist weder emissionsfrei noch automatisch rückstands- oder gefahrlos</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-paper px-4 py-4 font-bold text-navy">Chemische Verfahren</th>
                    <td className="px-4 py-4">Gefahrstoffe, Reaktion, Einwirkzeit, Material, Spülung und Produktkontakt</td>
                    <td className="px-4 py-4">Substitution, Dosierung, Lüftung, Stofffreigabe und Entsorgungsweg</td>
                    <td className="px-4 py-4">Ein Sicherheitsdatenblatt ersetzt nicht die tätigkeitsbezogene Gefährdungsbeurteilung</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-10 rounded-2xl border border-brand/20 bg-brand/5 p-6">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-lg font-bold text-navy">In das Leistungsverzeichnis übernehmen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    Betriebsart, Schnittstellen, Permit-to-work, LOTO-Verantwortung, Abschottung, Abbruchkriterien,
                    Endkontrolle und Rückgabe gehören als objektbezogene Anforderungen in das{' '}
                    <Link
                      to="/fachwissen/leistungsverzeichnis-gebaeudereinigung-erstellen"
                      className="font-bold text-brand hover:underline"
                    >
                      Leistungsverzeichnis
                    </Link>
                    . So vergleichen Auftraggeber nicht nur Preise, sondern auch den vorgesehenen Schutz- und
                    Freigabeaufwand.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-headline text-2xl font-bold text-navy">Fazit</h3>
            <p>
              Eine gute Prozessintegration vermeidet keinen Stillstand um jeden Preis. Sie ordnet jede Tätigkeit dem
              sicher vertretbaren Betriebszustand zu und schafft einen prüfbaren Weg von der Freigabe bis zur
              dokumentierten Rückgabe. Erst danach lassen sich Zeitfenster, Aufwand und mögliche betriebliche Vorteile
              realistisch bewerten.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-24" aria-labelledby="industriereinigung-faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="eyebrow justify-center text-brand">Häufige Fragen</span>
            <h2 id="industriereinigung-faq" className="mt-4 font-headline text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              FAQs zur Industriereinigung im Betrieb
            </h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <ArticleFooter slug={ARTICLE_SLUG} />

      <CTABand
        title="Reinigungsfenster und Freigaben vor Ort planen"
        lead="Bei einer gemeinsamen Begehung trennen wir Aufgaben für den laufenden Betrieb von Arbeiten mit Abschottung oder Stillstand und erfassen die benötigten Schutz-, Freigabe- und Rückgabeschritte für ein belastbares Konzept."
      />
    </article>
  );
}
