import { ClipboardCheck, FileSearch, ShieldCheck, Wrench } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';
import { IMG } from '@/lib/images';

const SLUG = 'kuechenabluftreinigung-vdi-2052-pflicht-ablauf-nachweis' as const;

const faqItems = [
  {
    question: 'Welches Blatt der VDI 2052 behandelt die Küchenabluftreinigung?',
    answer:
      'VDI 2052 Blatt 2 behandelt die Reinigung von Abluftanlagen in gewerblichen Küchen. Blatt 1 ordnet Technik und Betrieb der Küchenlüftung ein; VDI-MT 2052 Blatt 3 beschreibt ein Schulungskonzept für Personen, die mit der Reinigung von Küchenabluftanlagen befasst sind.',
  },
  {
    question: 'Gibt es ein festes Reinigungsintervall für jede Küchenabluftanlage?',
    answer:
      'Nein. Ein belastbares Prüf- und Reinigungsintervall ist objektbezogen aus Nutzung und Belastung, dokumentiertem Anlagenzustand, Herstellerangaben sowie den aktuellen behördlichen, vertraglichen und versicherungsbezogenen Vorgaben abzuleiten. Die Entwicklung zwischen zwei Prüfungen hilft, das Intervall anzupassen.',
  },
  {
    question: 'Ist Küchenabluftreinigung dasselbe wie Wartung?',
    answer:
      'Nein. Reinigung entfernt die im vereinbarten Umfang zugänglichen Ablagerungen. Wartung, technische Zustandsbewertung, Funktionsprüfung und Reparatur sind eigene Leistungen. Sie können gemeinsam beauftragt werden, müssen dann aber mit Zuständigkeit, Umfang und Abnahmekriterien getrennt beschrieben sein.',
  },
  {
    question: 'Wer darf die Anlage nach der Reinigung wieder in Betrieb nehmen?',
    answer:
      'Das muss der Betreiber vor Beginn festlegen. Die Wiederinbetriebnahme sollte durch die im betrieblichen Freigabeprozess benannte und dafür befugte Person erfolgen. Reinigungskraft, technischer Prüfer und freigabeberechtigte Person können unterschiedliche Rollen sein.',
  },
  {
    question: 'Was gehört in ein Reinigungsprotokoll?',
    answer:
      'Dokumentiert werden sollten mindestens Anlagenidentifikation, Datum, Ausgangszustand, vereinbarter und tatsächlich gereinigter Umfang, nicht zugängliche Bereiche, Verfahren und Mittel, Vorher-/Nachher-Fotos, Abweichungen, verantwortliche Personen sowie die getrennte Übergabe und Wiederinbetriebnahme. Zusätzliche Anforderungen sind objektbezogen festzulegen.',
  },
  {
    question: 'Reicht ein Reinigungsprotokoll automatisch für Behörde oder Versicherer?',
    answer:
      'Nicht automatisch. Welche Inhalte, Prüfschritte und Aufbewahrungsfristen gefordert sind, hängt von den für das Objekt geltenden Vorgaben und dem Versicherungsvertrag ab. Der benötigte Nachweisumfang sollte vor der Beauftragung mit den zuständigen Stellen geklärt werden.',
  },
];

export default function FachwissenVDI2052() {
  const articleSchema = buildArticleSchema(EDITORIAL_ARTICLES[SLUG]);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <article>
      <SEO
        title="Küchenabluftreinigung: VDI 2052 Blatt 2 prüfen | AHAD"
        description="VDI 2052 Blatt 2 richtig einordnen: objektbezogene Intervalle, klar abgegrenzter Reinigungsumfang, sichere Übergabe und nachvollziehbares Musterprotokoll."
        keywords="Küchenabluftreinigung VDI 2052 Blatt 2, Küchenlüftung reinigen, Reinigungsintervall Küchenabluft, Reinigungsprotokoll Abluftanlage"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Hygiene & Brandschutz"
        title="Küchenabluft nach VDI 2052 Blatt 2 prüfen und dokumentieren"
        lead="Belastung, Anlagenzustand und geltende Vorgaben bestimmen, wann und in welchem Umfang gereinigt wird. Entscheidend sind eine klare Leistungsgrenze, geregelte Freigaben und ein Protokoll, das auch nicht zugängliche Bereiche sichtbar macht."
        image={IMG.kuechenabluft}
        imageAlt="Fachgerechte Reinigung einer gewerblichen Küchenabluftanlage"
        crumbs={[{ label: 'Fachwissen', href: '/fachwissen' }, { label: 'VDI 2052 Blatt 2' }]}
      />

      <ArticleMeta slug={SLUG} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="vdi-einordnung" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Die VDI-2052-Reihe richtig einordnen
            </h2>
            <p>
              „Nach VDI 2052“ ist ohne Blattangabe zu ungenau. Die Richtlinienreihe trennt technische und
              betriebliche Themen, die Reinigung von Abluftanlagen und das dazugehörige Schulungskonzept. Für die
              konkrete Ausschreibung sollte deshalb benannt werden, welches Blatt und welche Leistung gemeint sind.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Einordnung der Richtlinienreihe VDI 2052"
              tabIndex={0}
            >
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Einordnung der drei Blätter der Richtlinienreihe VDI 2052
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Dokument</th>
                    <th scope="col" className="px-5 py-4 font-bold">Schwerpunkt</th>
                    <th scope="col" className="px-5 py-4 font-bold">Bedeutung für den Auftrag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">VDI 2052 Blatt 1</th>
                    <td className="px-5 py-4">Technik und Betrieb raumlufttechnischer Anlagen in Küchen</td>
                    <td className="px-5 py-4">Rahmenbedingungen der vorhandenen Anlage und ihres Betriebs einordnen</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">VDI 2052 Blatt 2</th>
                    <td className="px-5 py-4">Reinigung von Abluftanlagen in gewerblichen Küchen</td>
                    <td className="px-5 py-4">Prüfung, Reinigungsumfang, Verfahren und Dokumentation beschreiben</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">VDI-MT 2052 Blatt 3</th>
                    <td className="px-5 py-4">Schulungskonzept für mit der Reinigung befasste Personen</td>
                    <td className="px-5 py-4">Benötigte Qualifikation passend zu Rolle und Leistungsumfang prüfen</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-10 rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-xl font-bold text-navy">Richtlinie, Vertrag und Objekt zusammen lesen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
                    Eine VDI-Richtlinie ist keine pauschale Aussage zu jeder Betreiberpflicht. Maßgeblich sind die für
                    das Objekt anwendbaren gesetzlichen und behördlichen Vorgaben, Herstellerunterlagen,
                    Versicherungsbedingungen und vertraglichen Zuständigkeiten in ihrer aktuellen Fassung.
                  </p>
                </div>
              </div>
            </div>

            <h2 id="intervall-festlegen" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Prüf- und Reinigungsintervall objektbezogen festlegen
            </h2>
            <p>
              Eine allgemeine Kalenderfrist kann die Zustandsprüfung nicht ersetzen. Ein belastbarer Plan verbindet
              das Belastungsprofil der Küche mit dokumentierten Feststellungen an der konkreten Anlage. Nachfolgende
              Prüfungen zeigen, ob das angesetzte Intervall beibehalten, verkürzt oder verlängert werden kann.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Faktoren für das Prüf- und Reinigungsintervall"
              tabIndex={0}
            >
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Faktoren und Nachweise für ein objektbezogenes Prüf- und Reinigungsintervall
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Faktor</th>
                    <th scope="col" className="px-5 py-4 font-bold">Zu klärende Frage</th>
                    <th scope="col" className="px-5 py-4 font-bold">Sinnvoller Nachweis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Nutzung und Belastung</th>
                    <td className="px-5 py-4">Wann, wie lange und mit welchen Zubereitungsarten wird die Küche betrieben?</td>
                    <td className="px-5 py-4">Nutzungsprofil und dokumentierte Änderungen im Küchenbetrieb</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Anlagenzustand</th>
                    <td className="px-5 py-4">Welche Bauteile wurden wie geprüft und welche Ablagerungen festgestellt?</td>
                    <td className="px-5 py-4">Datierte Zustandsaufnahme mit eindeutig zugeordneten Fotos</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Zugänglichkeit</th>
                    <td className="px-5 py-4">Welche Hauben, Abscheider, Kanalabschnitte und Ventilatoren sind erreichbar?</td>
                    <td className="px-5 py-4">Anlagenskizze, Revisionsöffnungen und dokumentierte Prüflücken</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Hersteller und Instandhaltung</th>
                    <td className="px-5 py-4">Welche Vorgaben gelten für Bauteile, Verfahren und Wartung?</td>
                    <td className="px-5 py-4">Aktuelle Betriebs-, Hersteller- und Wartungsunterlagen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Weitere Vorgaben</th>
                    <td className="px-5 py-4">Welche Anforderungen stellen Behörde, Brandschutz, Hygieneorganisation oder Versicherer?</td>
                    <td className="px-5 py-4">Objektbezogene Bescheide, Konzepte, Verträge und Abstimmungen</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Verlauf</th>
                    <td className="px-5 py-4">Wie hat sich der Zustand seit der letzten Prüfung oder Reinigung verändert?</td>
                    <td className="px-5 py-4">Vergleichbare Protokolle mit identifizierten Prüfstellen</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ol className="not-prose my-10 grid gap-4 sm:grid-cols-2">
              {[
                ['Ausgangslage erfassen', 'Anlage, Nutzung, Zugänglichkeit und vorhandene Vorgaben dokumentieren.'],
                ['Erstprüfung durchführen', 'Definierte Bauteile und Prüfstellen nachvollziehbar bewerten.'],
                ['Intervall vorläufig festlegen', 'Termin und Begründung aus Belastung, Zustand und Vorgaben ableiten.'],
                ['Nachprüfung auswerten', 'Verlauf vergleichen und Intervall dokumentiert anpassen.'],
              ].map(([title, text], index) => (
                <li key={title} className="rounded-2xl border border-line bg-paper p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-headline font-bold text-navy">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">{text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <h2 id="reinigungsablauf" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Reinigungsablauf und Verantwortlichkeiten trennen
            </h2>
            <p>
              Vor Arbeitsbeginn müssen Umfang, Zugänge, Schutzmaßnahmen und Freigaben feststehen. Besonders wichtig:
              Reinigung, Wartung, technische Funktionsprüfung und Wiederinbetriebnahme sind verschiedene Leistungen.
              Sie können in einem Auftrag kombiniert werden, benötigen dann aber jeweils eine benannte verantwortliche
              Person und eindeutige Abnahmekriterien.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Ablauf einer Küchenabluftreinigung"
              tabIndex={0}
            >
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Ablauf, Verantwortlichkeit und Dokumentation einer Küchenabluftreinigung
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Schritt</th>
                    <th scope="col" className="px-5 py-4 font-bold">Vorab zu regeln</th>
                    <th scope="col" className="px-5 py-4 font-bold">Zu dokumentieren</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">1. Umfang und Zugang</th>
                    <td className="px-5 py-4">Anlagenteile, Revisionsöffnungen, Ausschlüsse und Arbeitsbereich</td>
                    <td className="px-5 py-4">Vereinbarter Scope und bekannte nicht zugängliche Bereiche</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">2. Außerbetriebnahme und Freigabe</th>
                    <td className="px-5 py-4">Befugte Person, Abschaltung, Sicherung und Freigabe des Arbeitsbereichs</td>
                    <td className="px-5 py-4">Zeitpunkt, Zustand und verantwortliche freigebende Person</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">3. Schutz und Reinigung</th>
                    <td className="px-5 py-4">Abschirmung, Verfahren, Mittel, Entsorgung und Arbeitsschutz</td>
                    <td className="px-5 py-4">Tatsächlich bearbeitete Teile, Verfahren und festgestellte Abweichungen</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">4. Reinigungsabnahme</th>
                    <td className="px-5 py-4">Erwarteter Reinigungszustand und Umgang mit nicht erreichbaren Stellen</td>
                    <td className="px-5 py-4">Ergebnis, Fotos, Restbefunde, Schäden und offene Punkte</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">5. Technik und Wiederinbetriebnahme</th>
                    <td className="px-5 py-4">Separater Auftrag für Montagekontrolle, Funktion, Wartung oder Reparatur</td>
                    <td className="px-5 py-4">Prüfende und freigebende Person, Ergebnis und Übergabezeitpunkt</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-10 rounded-2xl bg-navy p-6 text-white sm:p-8">
              <div className="flex items-start gap-4">
                <Wrench className="mt-0.5 h-8 w-8 shrink-0 text-mint" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-xl font-bold">Keine stillschweigende technische Freigabe</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100 sm:text-base">
                    Ein sauberes Bauteil ist nicht automatisch technisch geprüft. Wer Montage, Dichtheit, Funktion und
                    Wiederinbetriebnahme bewertet, muss vorab im betrieblichen Freigabeprozess benannt sein.
                  </p>
                </div>
              </div>
            </div>

            <h2 id="nachweis" className="scroll-mt-28 font-headline text-2xl font-bold text-navy sm:text-3xl">
              Ein nachvollziehbares Reinigungsprotokoll aufbauen
            </h2>
            <p>
              Ein Protokoll ist dann entscheidungsnützlich, wenn der dokumentierte Umfang eindeutig zur Anlage passt.
              Es sollte nicht nur erledigte Arbeiten zeigen, sondern auch Grenzen, Abweichungen und die getrennte
              Übergabe an den Betreiber. Ob der Bericht für eine Behörde, Versicherung oder interne Hygieneorganisation
              ausreicht, ist anhand deren konkreter Anforderungen zu prüfen.
            </p>

            <div
              className="not-prose my-10 overflow-x-auto rounded-2xl border border-line bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Musterfelder für das Reinigungsprotokoll"
              tabIndex={0}
            >
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Musterfelder für ein nachvollziehbares Protokoll der Küchenabluftreinigung
                </caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Protokollfeld</th>
                    <th scope="col" className="px-5 py-4 font-bold">Erforderliche Zuordnung</th>
                    <th scope="col" className="px-5 py-4 font-bold">Warum es hilft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-slate">
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Objekt und Anlage</th>
                    <td className="px-5 py-4">Standort, Anlagen-ID, Bereich und Anlagenskizze</td>
                    <td className="px-5 py-4">Verhindert die Zuordnung zum falschen System</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Ausgangszustand</th>
                    <td className="px-5 py-4">Datum, Prüfstellen, Befund und referenzierte Fotos</td>
                    <td className="px-5 py-4">Macht die Intervallentscheidung später vergleichbar</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Leistungsumfang</th>
                    <td className="px-5 py-4">Gereinigte Bauteile und ausdrücklich nicht bearbeitete Bereiche</td>
                    <td className="px-5 py-4">Vermeidet einen vermeintlichen Vollnachweis</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Verfahren und Mittel</th>
                    <td className="px-5 py-4">Eingesetztes Verfahren, Produkte und relevante Schutzmaßnahmen</td>
                    <td className="px-5 py-4">Unterstützt Nachvollziehbarkeit und spätere Ursachenklärung</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Ergebnis und Abweichungen</th>
                    <td className="px-5 py-4">Nachher-Fotos, Restbefunde, Schäden und empfohlene Folgearbeiten</td>
                    <td className="px-5 py-4">Zeigt Grenzen und offene Entscheidungen transparent</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-4 font-bold text-navy">Übergabe und Folgetermin</th>
                    <td className="px-5 py-4">Verantwortliche Personen, getrennte Freigaben und begründeter Prüftermin</td>
                    <td className="px-5 py-4">Sichert Verantwortungswechsel und weitere Planung</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FileSearch className="mt-0.5 h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-headline text-xl font-bold text-navy">Vor dem Angebot klären</h3>
                  <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate sm:grid-cols-2">
                    <li className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> Welche Anlagenteile gehören zum Scope?</li>
                    <li className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> Wo fehlen sichere Zugänge?</li>
                    <li className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> Wer schaltet ab und gibt frei?</li>
                    <li className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> Welche technische Prüfung ist separat nötig?</li>
                    <li className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> Wer nimmt Reinigung und Technik ab?</li>
                    <li className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> Welcher Nachweisumfang wird verlangt?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="vdi-faq-heading" className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center text-brand">Häufige Fragen</span>
            <h2 id="vdi-faq-heading" className="mt-4 font-headline text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              Küchenabluftreinigung und VDI 2052 Blatt 2
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      <ArticleFooter slug={SLUG} />

      <CTABand
        title="Prüfumfang und Reinigung Ihrer Küchenabluft klären"
        lead="Wir erfassen Anlage, Zugänglichkeit und Nutzung, grenzen den Reinigungsumfang nachvollziehbar ab und stimmen die benötigte Dokumentation vor dem Einsatz mit Ihnen ab."
      />
    </article>
  );
}
