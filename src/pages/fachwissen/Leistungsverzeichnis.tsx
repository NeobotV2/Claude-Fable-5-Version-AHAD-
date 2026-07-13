import { BookOpen, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFooter from '@/components/ArticleFooter';
import PageHero from '@/components/PageHero';
import { buildArticleSchema, EDITORIAL_ARTICLES } from '@/data/editorial';

export default function FachwissenLeistungsverzeichnis() {
  const articleSchema = buildArticleSchema(
    EDITORIAL_ARTICLES['leistungsverzeichnis-gebaeudereinigung-erstellen'],
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist ein Leistungsverzeichnis in der Gebäudereinigung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein Leistungsverzeichnis (LV) ist die strukturierte, objektbezogene Beschreibung der zu erbringenden Reinigungsleistungen. Es benennt etwa Raumgruppe, Fläche, Tätigkeit, Turnus und Qualitätsziel. Für einen vollständigen Vertrag werden Service-Level, kaufmännische Regeln und geforderte Nachweise getrennt ergänzt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was gehört in ein Leistungsverzeichnis für die Reinigung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zum LV gehören vor allem Objektdaten, Flächen und Raumgruppen, Bodenbeläge, konkrete Tätigkeiten, Turnusse oder Bedarfsauslöser, Qualitätsziele und klar abgegrenzte Sonderleistungen. Service-Level wie Reaktions- und Eskalationszeiten, Preise und Abrechnungsregeln sowie Eignungs- oder Versicherungsnachweise sollten als eigene Vertragsbausteine erkennbar bleiben.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen verrichtungsorientiertem und ergebnisorientiertem Leistungsverzeichnis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beim verrichtungsorientierten LV werden Tätigkeit und Turnus vorgegeben. Beim ergebnisorientierten Modell wird ein prüfbares Ergebnis beschrieben und der Ausführungsweg innerhalb vereinbarter Grenzen dem Dienstleister überlassen. Beide Modelle benötigen eindeutige Kontrolle und Zuständigkeiten; welche Kombination geeignet ist, hängt von Raumgruppe, Hygieneanforderung, Risiko und Vertragsziel ab.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum ist ein Leistungsverzeichnis für den Preisvergleich wichtig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein gemeinsames, objektbezogenes LV verbessert die Vergleichbarkeit, weil Anbieter dieselben Flächen, Tätigkeiten, Turnusse und Qualitätsziele kalkulieren. Zusätzlich müssen kaufmännische Annahmen und Ausschlüsse vergleichbar ausgewiesen sein. Ein niedriger Preis allein erlaubt noch keine Aussage über Qualität oder Rechtskonformität.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wer erstellt das Leistungsverzeichnis — Auftraggeber oder Reinigungsfirma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beides ist üblich. Größere Auftraggeber und öffentliche Ausschreibungen geben das LV selbst (oft mit einem Berater) vor, damit alle Bieter dieselbe Grundlage haben. Kleinere Unternehmen lassen das LV häufig im Rahmen der Objektbegehung vom Reinigungsdienstleister erstellen. Wichtig ist in beiden Fällen, dass das LV objektbezogen, nachvollziehbar und prüfbar ist — kein Standard-Copy-Paste.',
        },
      },
    ],
  };

  return (
    <article>
      <SEO
        title="Leistungsverzeichnis Gebäudereinigung erstellen: Anleitung | AHAD"
        description="Wie erstellt man ein Leistungsverzeichnis (LV) für die Gebäudereinigung? Aufbau, Bestandteile, verrichtungs- vs. ergebnisorientiert und eine Schritt-für-Schritt-Anleitung für vergleichbare Angebote."
        keywords="Leistungsverzeichnis Gebäudereinigung, LV Reinigung erstellen, Reinigung ausschreiben, Reinigungsleistung Vergleich, ergebnisorientierte Reinigung, DIN EN 13549, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />

      <PageHero
        compact
        titleSize="lg"
        eyebrow="Fachwissen · Leistungsverzeichnis"
        title="Leistungsverzeichnis erstellen: Reinigungsangebote besser vergleichen"
        lead="Wie Sie Leistungen objektbezogen beschreiben und LV, Service-Level, kaufmännische Regeln sowie Nachweise sauber voneinander trennen."
        image={IMG.teamMeeting}
        imageAlt=""
        crumbs={[
          { label: 'Fachwissen', href: '/fachwissen' },
          { label: 'Leistungsverzeichnis erstellen' },
        ]}
      />

      {/* Auf einen Blick */}
      <section className="border-b border-line bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <h2 className="mb-8 text-center text-2xl font-black text-navy">Das Leistungsverzeichnis auf einen Blick</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <FileText className="mb-4 h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Leistung beschreiben</h3>
              <p className="text-sm text-slate">
                Die objektbezogene Beschreibung aller Leistungen: welche Fläche, in welchem Intervall, mit welchem
                Ergebnis gereinigt wird.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <CheckCircle2 className="mb-4 h-8 w-8 text-accent" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Ergebnis kontrollieren</h3>
              <p className="text-sm text-slate">
                Mess- und Kontrollkriterien sowie Zuständigkeiten ergänzen, damit Ergebnisse nachvollziehbar bewertet
                werden können.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <BookOpen className="mb-4 h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-bold text-navy">Vertragsbausteine trennen</h3>
              <p className="text-sm text-slate">
                LV, Service-Level, Preise und Nachweise getrennt strukturieren, damit Änderungen und Vergleiche
                eindeutig bleiben.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticleMeta slug="leistungsverzeichnis-gebaeudereinigung-erstellen" />

      {/* Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed text-slate">
            <h2 id="lv-grundlagen" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Welche Funktion ein Leistungsverzeichnis erfüllt</h2>
            <p className="mb-8">
              Konflikte entstehen häufig durch <strong>unklare Erwartungen</strong>. Das Leistungsverzeichnis übersetzt
              den Bedarf in konkrete Raumgruppen, Flächen, Tätigkeiten, Turnusse oder Auslöser und Qualitätsziele. Als
              gemeinsame Kalkulationsgrundlage kann es Angebote besser vergleichbar machen; für die spätere Steuerung
              werden zusätzlich Service-Level, kaufmännische Regeln und Nachweise benötigt. Zusammen bilden diese
              Bausteine den Maßstab der{' '}
              <Link to="/ahad-system" className="font-bold text-brand hover:underline">
                Qualitätskontrolle
              </Link>
              .
            </p>

            <div
              className="mb-12 overflow-x-auto rounded-2xl border border-line shadow-soft"
              role="region"
              aria-label="Musterzeile für ein Leistungsverzeichnis"
              tabIndex={0}
            >
              <table className="min-w-[52rem] w-full border-collapse bg-white text-left text-sm">
                <caption className="caption-top bg-paper px-4 py-3 text-left font-bold text-navy">
                  Beispiel einer konkreten LV-Zeile
                </caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-4 py-3 font-bold">Raumgruppe / Fläche</th>
                    <th scope="col" className="px-4 py-3 font-bold">Tätigkeit</th>
                    <th scope="col" className="px-4 py-3 font-bold">Turnus</th>
                    <th scope="col" className="px-4 py-3 font-bold">Qualitätskriterium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="px-4 py-3 align-top font-semibold text-navy">
                      Büro 1. OG · 420 m² Teppich
                    </th>
                    <td className="px-4 py-3 align-top">Freie Bodenflächen saugen; erreichbare Randzonen einbeziehen</td>
                    <td className="px-4 py-3 align-top">Mo., Mi. und Fr.; Zusatzleistung nach dokumentiertem Ereignis</td>
                    <td className="px-4 py-3 align-top">Kein loser sichtbarer Schmutz bei vereinbarter Stichprobe</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12 text-sm text-slate">
              Das Beispiel ist keine Vorlage für jedes Objekt. Es zeigt die notwendige Verknüpfung von Fläche,
              Tätigkeit, Auslösung und prüfbarem Ergebnis; Zugänglichkeit, Ausschlüsse und Messverfahren sind bei Bedarf
              zu ergänzen.
            </p>

            <h2 id="leistungsmodelle" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Verrichtungs- oder ergebnisorientiert?</h2>
            <p className="mb-6">
              Es gibt zwei grundlegende Logiken, ein LV aufzubauen. Die Wahl bestimmt, wie viel Spielraum der
              Dienstleister hat — und wie Sie die Qualität messen.
            </p>
            <div
              className="mb-12 overflow-x-auto rounded-2xl border border-line shadow-soft"
              role="region"
              aria-label="Vergleich von verrichtungs- und ergebnisorientiertem Leistungsmodell"
              tabIndex={0}
            >
              <table className="min-w-[48rem] w-full border-collapse bg-white text-left text-sm">
                <caption className="sr-only">Vergleich der beiden Leistungsmodelle</caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-4 py-3 font-bold">Kriterium</th>
                    <th scope="col" className="px-4 py-3 font-bold">Verrichtungsorientiert</th>
                    <th scope="col" className="px-4 py-3 font-bold">Ergebnisorientiert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Vorgabe</th>
                    <td className="px-4 py-3 align-top">Konkrete Tätigkeit &amp; Häufigkeit („Boden täglich wischen")</td>
                    <td className="px-4 py-3 align-top">Definiertes Sauberkeitsergebnis (Qualitätsniveau)</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Flexibilität</th>
                    <td className="px-4 py-3 align-top">Durch die vereinbarten Tätigkeiten und Turnusse begrenzt</td>
                    <td className="px-4 py-3 align-top">Innerhalb definierter Ergebnis-, Kontroll- und Verfahrensgrenzen</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Kontrolle</th>
                    <td className="px-4 py-3 align-top">Ausführung und vereinbartes Ergebnis prüfen</td>
                    <td className="px-4 py-3 align-top">Prüfbares Qualitäts- und Bewertungsverfahren vereinbaren</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Kalkulation</th>
                    <td className="px-4 py-3 align-top">Mengen und Häufigkeiten sind vorgegeben</td>
                    <td className="px-4 py-3 align-top">Aufwand hängt auch von Mess-, Steuerungs- und Dokumentationslogik ab</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Auswahl</th>
                    <td className="px-4 py-3 align-top">Geeignet, wenn Tätigkeit und Turnus eindeutig vorgegeben werden sollen</td>
                    <td className="px-4 py-3 align-top">Geeignet, wenn Ergebnis und Entscheidungsspielraum belastbar messbar sind</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12">
              Eine <strong>Kombination</strong> kann sinnvoll sein: klar definierte Tätigkeiten dort, wo feste Abläufe
              erforderlich sind, und ergebnisorientierte Steuerung dort, wo Kriterien und Kontrolle tragfähig sind.
              Die Entscheidung richtet sich nach Raumgruppe, Nutzung, Hygiene- und Qualitätsanforderung sowie der{' '}
              <Link to="/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle" className="font-bold text-brand hover:underline">
                Reinigungsintervalle
              </Link>{' '}
              im konkreten Objekt.
            </p>

            <h2 id="lv-bestandteile" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">LV, Service-Level, Konditionen und Nachweise trennen</h2>
            <p className="mb-6">
              Nicht jede Vertragsanforderung gehört in dieselbe Tabelle. Eine klare Trennung verhindert, dass eine
              fachliche Leistungsänderung unbemerkt kaufmännische oder organisatorische Folgen auslöst. Die konkrete
              Dokumentenstruktur richtet sich nach Vergabe und Vertrag; folgende Abgrenzung ist eine praxistaugliche
              Ausgangsbasis:
            </p>
            <div
              className="mb-12 overflow-x-auto rounded-2xl border border-line shadow-soft"
              role="region"
              aria-label="Abgrenzung der Vertragsbausteine"
              tabIndex={0}
            >
              <table className="min-w-[48rem] w-full border-collapse bg-white text-left text-sm">
                <caption className="sr-only">Inhalte von Leistungsverzeichnis, Service-Level, kaufmännischen Regelungen und Nachweisen</caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-4 py-3 font-bold">Baustein</th>
                    <th scope="col" className="px-4 py-3 font-bold">Typische Inhalte</th>
                    <th scope="col" className="px-4 py-3 font-bold">Prüffrage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Leistungsverzeichnis</th>
                    <td className="px-4 py-3 align-top">Objekt, Raumgruppe, Fläche, Belag, Tätigkeit, Turnus oder Auslöser, Qualitätsziel, Leistungsgrenzen und Sonderleistungen</td>
                    <td className="px-4 py-3 align-top">Kalkulieren alle Anbieter denselben fachlichen Umfang?</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Service-Level &amp; Qualität</th>
                    <td className="px-4 py-3 align-top">Messverfahren, Stichprobe, Toleranz, Meldung, Reaktions- und Eskalationszeit, Zuständigkeit und Abnahme</td>
                    <td className="px-4 py-3 align-top">Wie werden Ergebnis und Umgang mit Abweichungen geprüft?</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Kaufmännische Regelungen</th>
                    <td className="px-4 py-3 align-top">Preisblatt, Abrechnungsmodell, Laufzeit, Preisänderung, Zusatzauftrag, Mengenänderung und Abgrenzung von Verbrauchsmaterial</td>
                    <td className="px-4 py-3 align-top">Sind Preisannahmen, Optionen und Änderungsfolgen vergleichbar?</td>
                  </tr>
                  <tr className="bg-paper">
                    <th scope="row" className="px-4 py-3 font-semibold text-navy align-top">Eignung &amp; Nachweise</th>
                    <td className="px-4 py-3 align-top">Nur auftragsbezogen geforderte Erklärungen, Versicherungsnachweise, Referenzen, Zertifikate und sonstige Eignungsbelege</td>
                    <td className="px-4 py-3 align-top">Sind Anforderung, Stichtag, Geltungsbereich und Prüfmethode eindeutig?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="lv-erstellen" className="scroll-mt-28 text-2xl font-black text-navy sm:text-3xl">Schritt für Schritt zum eigenen Leistungsverzeichnis</h2>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Objekt begehen und Flächen aufmessen: Räume nach Nutzungsart gliedern und in m² erfassen.',
                'Bodenbeläge und Ausstattung dokumentieren: je Belag und Sanitärobjekt die Pflegeanforderung notieren.',
                'Nutzungsprofil festlegen: Mitarbeiterzahl, Besucherfrequenz, Schicht-/Öffnungszeiten, Homeoffice-Quote.',
                'Raumgruppen bilden und Intervalle definieren: was wird täglich, wöchentlich, monatlich, quartalsweise gereinigt?',
                'Hygiene- und Nutzungsanforderungen prüfen: Tätigkeiten und Turnusse aus Objektvorgaben statt pauschal festlegen.',
                'Geeignete Flächen ergebnisorientiert beschreiben: Qualitätsziel, Messung und Entscheidungsspielraum gemeinsam definieren.',
                'Sonderleistungen separat ausweisen: Glas, Grundreinigung, Bauschluss, Winterdienst getrennt kalkulierbar machen.',
                'Qualitätssicherung verankern: Sichtkontrollen, Begehungsprotokolle, Ansprechpartner und Eskalationsweg.',
                'Auftragsbezogene Nachweise separat definieren: Anforderung, Geltungsbereich, Stichtag und Prüfmethode benennen.',
                'Allen Bietern denselben Stand bereitstellen und Rückfragen beziehungsweise Änderungen zentral dokumentieren.',
              ].map((item, i) => (
                <li key={`lv-step-${i}`} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-12 rounded-3xl border border-line bg-paper p-6 shadow-soft sm:p-8">
              <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-navy">
                <AlertTriangle className="h-7 w-7 text-brand" aria-hidden="true" />
                Häufige Fehler im Leistungsverzeichnis
              </h3>
              <ul className="space-y-3 text-sm list-none pl-0">
                <li className="border-b border-line pb-3">
                  <strong className="text-navy">Standard-Vorlage ohne Objektprüfung:</strong> Eine Vorlage kann die
                  Struktur liefern, muss aber mit Flächen, Nutzung, Belägen und Leistungszielen des Objekts abgeglichen
                  werden.
                </li>
                <li className="border-b border-line pb-3">
                  <strong className="text-navy">Unklare Mengengrundlage:</strong> Fehlende oder uneinheitliche Flächen-
                  und Mengenangaben erhöhen Kalkulationsunsicherheit und erschweren den Vergleich.
                </li>
                <li className="border-b border-line pb-3">
                  <strong className="text-navy">Kein Qualitäts- oder Kontrollmaßstab:</strong> Ohne definiertes
                  Ergebnis und Prüfverfahren bleiben Abweichungen schwer nachvollziehbar.
                </li>
                <li>
                  <strong className="text-navy">Vermischte Vertragsbausteine:</strong> Leistung, Service-Level,
                  Konditionen und Nachweise sollten erkennbar getrennt sein, damit Änderungen gezielt bewertet werden
                  können.
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Ausschreibungsstand und Änderungen beherrschbar halten</h2>
            <p className="mb-8">
              Versehen Sie Unterlagen mit Version und Datum, führen Sie Bieterfragen zentral und geben Sie Klarstellungen
              allen Beteiligten in gleicher Form weiter. Änderungen an Fläche, Turnus oder Qualitätsziel sollten mit der
              betroffenen LV-Position sowie möglichen Auswirkungen auf Service-Level und Preis dokumentiert werden.
              Dadurch bleibt erkennbar, auf welchem Stand ein Angebot beruht.
            </p>

            <h2 className="text-2xl font-black text-navy sm:text-3xl">Fazit</h2>
            <p className="mb-8">
              Ein objektbezogenes LV verbessert die fachliche Vergleichbarkeit, wenn Fläche, Tätigkeit, Auslösung und
              Qualitätsziel eindeutig verbunden sind. Service-Level, kaufmännische Regeln und Nachweise bleiben als
              eigene Bausteine sichtbar. Erst diese gemeinsame und versionierte Grundlage ermöglicht eine belastbare
              Prüfung von Angebot, Leistung und späteren Änderungen.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="mb-12 text-center">
            <span className="mb-4 block text-sm font-bold uppercase tracking-wider text-brand">Häufige Fragen</span>
            <h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl lg:text-4xl">FAQs zum Leistungsverzeichnis</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <ArticleFooter slug="leistungsverzeichnis-gebaeudereinigung-erstellen" />

      <CTABand
        title="Sie möchten Reinigungsleistungen sauber ausschreiben?"
        lead="Wir erstellen mit Ihnen ein objektbezogenes Leistungsverzeichnis — transparent, vergleichbar und auf Ihr Gebäude zugeschnitten."
      />
    </article>
  );
}
