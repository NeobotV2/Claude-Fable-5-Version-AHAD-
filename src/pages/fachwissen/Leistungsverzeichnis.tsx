import { motion } from 'motion/react';
import { BookOpen, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import ArticleMeta from '@/components/ArticleMeta';
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
          text: 'Ein Leistungsverzeichnis (LV) ist die strukturierte, objektbezogene Beschreibung aller zu erbringenden Reinigungsleistungen. Es legt fest, welche Flächen in welchem Intervall mit welchem Qualitätsziel gereinigt werden. Das LV ist die Grundlage für vergleichbare Angebote, eine eindeutige Beauftragung und die spätere Qualitätskontrolle. Ohne LV vergleichen Auftraggeber Pauschalpreise ohne zu wissen, welche Leistung tatsächlich dahintersteckt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was gehört in ein Leistungsverzeichnis für die Reinigung?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein vollständiges LV enthält: Objektdaten und Adresse, ein Flächenaufmaß je Raum- und Nutzungsart (m²), die Bodenbeläge, die Raumgruppen mit ihren Reinigungsintervallen (täglich, wöchentlich, monatlich, quartalsweise), die einzelnen Tätigkeiten je Raumgruppe, das gewünschte Qualitäts-/Ergebnisniveau, die Reinigungszeiten (Tagdienst/Randzeiten), Sonderleistungen (Glas, Grundreinigung, Winterdienst) sowie Vorgaben zu Qualitätssicherung, Dokumentation und Nachweisen (Tariflohn, Sozialversicherung).',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen verrichtungsorientiertem und ergebnisorientiertem Leistungsverzeichnis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beim verrichtungsorientierten LV wird genau vorgegeben, welche Tätigkeit in welchem Intervall ausgeführt wird (z. B. „Böden täglich wischen"). Es ist einfach zu kontrollieren, aber unflexibel. Beim ergebnisorientierten LV wird ein Sauberkeitsergebnis (Qualitätsniveau) definiert, und der Dienstleister entscheidet eigenverantwortlich über Häufigkeit und Methode, um dieses Ergebnis zu erreichen. Das ist flexibler und oft wirtschaftlicher, erfordert aber ein klares Qualitätsmesssystem (z. B. nach DIN EN 13549) und Vertrauen in den Anbieter. In der Praxis sind hygienisch kritische Bereiche meist verrichtungsorientiert, der Rest ergebnisorientiert.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum ist ein Leistungsverzeichnis für den Preisvergleich wichtig?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ohne einheitliches LV geben Anbieter Preise für unterschiedliche Leistungsumfänge ab — der günstigste Preis verbirgt dann oft die geringste Leistung. Erst ein objektbezogenes LV macht Angebote vergleichbar, weil alle Bieter dieselbe Flächen-, Intervall- und Qualitätsbasis kalkulieren. So lässt sich erkennen, ob ein auffällig niedriger Preis realistisch ist oder ob Leistungen, Tariflohn oder Sozialabgaben unrealistisch kalkuliert wurden.',
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
    <div>
      <SEO
        title="Leistungsverzeichnis Gebäudereinigung erstellen: Anleitung | AHAD"
        description="Wie erstellt man ein Leistungsverzeichnis (LV) für die Gebäudereinigung? Aufbau, Bestandteile, verrichtungs- vs. ergebnisorientiert und eine Schritt-für-Schritt-Anleitung für vergleichbare Angebote."
        keywords="Leistungsverzeichnis Gebäudereinigung, LV Reinigung erstellen, Reinigung ausschreiben, Reinigungsleistung Vergleich, ergebnisorientierte Reinigung, DIN EN 13549, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <img
            src={IMG.teamMeeting}
            alt="Leistungsverzeichnis für die Gebäudereinigung erstellen"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase border border-white/20">
              <BookOpen className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Entscheiderwissen
            </span>
            <h1 className="display-lg text-white mb-8">Das Leistungsverzeichnis: So machen Sie Reinigungsangebote vergleichbar</h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Ein belastbares Leistungsverzeichnis (LV) ist das wichtigste Dokument bei der Vergabe von
              Reinigungsleistungen. Wir zeigen Aufbau, Bestandteile und den Weg zu wirklich vergleichbaren Angeboten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Das Leistungsverzeichnis auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <FileText className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Was es ist</h3>
              <p className="text-[#424751] text-sm">
                Die objektbezogene Beschreibung aller Leistungen: welche Fläche, in welchem Intervall, mit welchem
                Ergebnis gereinigt wird.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <CheckCircle2 className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Wozu es dient</h3>
              <p className="text-[#424751] text-sm">
                Vergleichbare Angebote, eindeutige Beauftragung und eine messbare Grundlage für die Qualitätskontrolle.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <BookOpen className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Worauf es ankommt</h3>
              <p className="text-[#424751] text-sm">
                Flächenaufmaß, Intervalle je Raumgruppe und ein klares Qualitätsziel — kein Standard-Copy-Paste,
                sondern objektbezogen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ArticleMeta slug="leistungsverzeichnis-gebaeudereinigung-erstellen" />

      {/* Content */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Warum ein Leistungsverzeichnis über Erfolg oder Frust entscheidet</h2>
            <p className="mb-8">
              Die meisten Konflikte zwischen Auftraggeber und Reinigungsdienstleister entstehen nicht durch schlechte
              Arbeit, sondern durch <strong>unklare Erwartungen</strong>. Wurde nie festgehalten, ob ein Bereich täglich
              oder zweimal pro Woche gereinigt wird, ist jeder Streit über Sauberkeit ein Streit über ein nie
              vereinbartes Ziel. Das Leistungsverzeichnis löst genau dieses Problem: Es übersetzt die Erwartung
              „sauber" in nachvollziehbare, prüfbare Leistungen. Es ist damit zugleich Ausschreibungsgrundlage,
              Vertragsbestandteil und Maßstab der späteren{' '}
              <Link to="/ahad-system" className="text-[#0B2341] font-bold hover:underline">
                Qualitätskontrolle
              </Link>
              .
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Verrichtungs- oder ergebnisorientiert?</h2>
            <p className="mb-6">
              Es gibt zwei grundlegende Logiken, ein LV aufzubauen. Die Wahl bestimmt, wie viel Spielraum der
              Dienstleister hat — und wie Sie die Qualität messen.
            </p>
            <div className="overflow-x-auto mb-12 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Kriterium</th>
                    <th className="px-4 py-3 font-bold">Verrichtungsorientiert</th>
                    <th className="px-4 py-3 font-bold">Ergebnisorientiert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Vorgabe</td>
                    <td className="px-4 py-3 align-top">Konkrete Tätigkeit &amp; Häufigkeit („Boden täglich wischen")</td>
                    <td className="px-4 py-3 align-top">Definiertes Sauberkeitsergebnis (Qualitätsniveau)</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Flexibilität</td>
                    <td className="px-4 py-3 align-top">Gering — Methode &amp; Takt sind fest</td>
                    <td className="px-4 py-3 align-top">Hoch — Dienstleister wählt Methode &amp; Takt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Kontrolle</td>
                    <td className="px-4 py-3 align-top">Einfach (wurde die Tätigkeit ausgeführt?)</td>
                    <td className="px-4 py-3 align-top">Qualitätsmesssystem nötig (z. B. DIN EN 13549)</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Wirtschaftlichkeit</td>
                    <td className="px-4 py-3 align-top">Kann zu Leerleistung führen (leere Räume)</td>
                    <td className="px-4 py-3 align-top">Oft günstiger durch bedarfsorientierten Einsatz</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Geeignet für</td>
                    <td className="px-4 py-3 align-top">Sanitär, Küche, Hygienezonen</td>
                    <td className="px-4 py-3 align-top">Büro-, Besprechungs- und Nebenflächen</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12">
              In der Praxis bewährt sich eine <strong>Kombination</strong>: hygienisch kritische Bereiche
              verrichtungsorientiert im festen Tagesintervall, alle übrigen Flächen ergebnisorientiert und
              bedarfsgesteuert. So bleibt die Hygiene gesichert, während die{' '}
              <Link to="/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle" className="text-[#0B2341] font-bold hover:underline">
                Reinigungsintervalle
              </Link>{' '}
              dort flexibel werden, wo es wirtschaftlich sinnvoll ist.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die Bestandteile eines vollständigen LV</h2>
            <p className="mb-6">
              Ein belastbares Leistungsverzeichnis ist mehr als eine Tätigkeitsliste. Diese Bausteine sollten enthalten
              sein, damit Angebote wirklich vergleichbar werden:
            </p>
            <div className="overflow-x-auto mb-12 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Baustein</th>
                    <th className="px-4 py-3 font-bold">Inhalt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Objektdaten</td>
                    <td className="px-4 py-3 align-top">Adresse, Gebäudeart, Etagen, Nutzungszeiten, Ansprechpartner, Zugangsregelung.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Flächenaufmaß</td>
                    <td className="px-4 py-3 align-top">Quadratmeter je Raum- und Nutzungsart (Büro, Sanitär, Verkehrsfläche, Küche, Lager).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Bodenbeläge</td>
                    <td className="px-4 py-3 align-top">Hartboden, Teppich, Elastik, Naturstein, Glas — je Belag eigene Pflegelogik.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Raumgruppen &amp; Intervalle</td>
                    <td className="px-4 py-3 align-top">Welche Raumgruppe wird täglich, wöchentlich, monatlich oder quartalsweise gereinigt?</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Tätigkeiten je Gruppe</td>
                    <td className="px-4 py-3 align-top">Konkrete Leistungen (Böden, Oberflächen, Sanitärobjekte, Papierkörbe, Glas innen).</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Qualitätsziel</td>
                    <td className="px-4 py-3 align-top">Erwartetes Ergebnisniveau und Mess-/Kontrollverfahren (Sichtkontrolle, Stichprobe).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Zeiten &amp; Organisation</td>
                    <td className="px-4 py-3 align-top">Tagdienst, Randzeiten oder außerhalb der Betriebszeit; Schlüssel-/Alarmregelung.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Sonderleistungen</td>
                    <td className="px-4 py-3 align-top">Glas- und Fassadenreinigung, Grundreinigung, Bauschluss, Winterdienst — separat ausweisen.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Nachweise</td>
                    <td className="px-4 py-3 align-top">Tariflohn, Sozialversicherung, Mindestlohn, Versicherungsschutz, ggf. Zertifikate.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Schritt für Schritt zum eigenen Leistungsverzeichnis</h2>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Objekt begehen und Flächen aufmessen: Räume nach Nutzungsart gliedern und in m² erfassen.',
                'Bodenbeläge und Ausstattung dokumentieren: je Belag und Sanitärobjekt die Pflegeanforderung notieren.',
                'Nutzungsprofil festlegen: Mitarbeiterzahl, Besucherfrequenz, Schicht-/Öffnungszeiten, Homeoffice-Quote.',
                'Raumgruppen bilden und Intervalle definieren: was wird täglich, wöchentlich, monatlich, quartalsweise gereinigt?',
                'Hygienezonen verrichtungsorientiert sichern: Sanitär und Küche immer im festen Tagesintervall.',
                'Übrige Flächen ergebnisorientiert beschreiben: Qualitätsziel statt starrer Häufigkeit festlegen.',
                'Sonderleistungen separat ausweisen: Glas, Grundreinigung, Bauschluss, Winterdienst getrennt kalkulierbar machen.',
                'Qualitätssicherung verankern: Sichtkontrollen, Begehungsprotokolle, Ansprechpartner und Eskalationsweg.',
                'Nachweispflichten aufnehmen: Tariflohn, Sozialabgaben und Versicherung transparent einfordern.',
                'An alle Bieter identisch versenden: nur so werden die Angebote wirklich vergleichbar.',
              ].map((item, i) => (
                <li key={`lv-step-${i}`} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B2341] mb-4 flex items-center gap-3">
                <AlertTriangle className="text-[#0B2341] w-7 h-7" />
                Häufige Fehler im Leistungsverzeichnis
              </h3>
              <ul className="space-y-3 text-sm list-none pl-0">
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Standard-Vorlage ohne Objektbezug:</strong> Ein generisches LV
                  passt zu keinem Gebäude. Flächen und Intervalle müssen aus der Begehung stammen.
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Fehlendes Flächenaufmaß:</strong> Ohne m² je Nutzungsart kann
                  niemand seriös kalkulieren — der Preis wird zum Ratespiel.
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <strong className="text-[#0B2341]">Kein Qualitäts- oder Kontrollmaßstab:</strong> Ohne definiertes
                  Ergebnis ist jede Reklamation Auslegungssache.
                </li>
                <li>
                  <strong className="text-[#0B2341]">Sonderleistungen in der Pauschale versteckt:</strong> Glas- und
                  Grundreinigung gehören separat ausgewiesen, sonst sind Angebote nicht vergleichbar.
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Regionaler Bezug: Vergabe in Villingen-Schwenningen und der Region</h2>
            <p className="mb-8">
              Ob mittelständische Produktion im Schwarzwald-Baar-Kreis, Verwaltung in{' '}
              <Link to="/standorte/villingen-schwenningen" className="text-[#0B2341] font-bold hover:underline">
                Villingen-Schwenningen
              </Link>{' '}
              oder Dienstleister am{' '}
              <Link to="/standorte/konstanz" className="text-[#0B2341] font-bold hover:underline">
                Bodensee
              </Link>{' '}
              — ein sauberes Leistungsverzeichnis ist überall die Grundlage für faire, vergleichbare Angebote. Bei AHAD
              erstellen wir das LV im Rahmen der kostenlosen Objektbegehung gemeinsam mit Ihnen und weisen Tariflohn und
              Leistungsumfang transparent aus. So wissen Sie genau, wofür Sie zahlen — und können unser Angebot mit
              jedem anderen vergleichen.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit</h2>
            <p className="mb-8">
              Das Leistungsverzeichnis ist kein bürokratischer Selbstzweck, sondern der Hebel für Qualität und
              Kostenkontrolle. Wer Flächen, Intervalle und Qualitätsziele sauber beschreibt, bekommt vergleichbare
              Angebote, eine eindeutige Leistung und einen objektiven Maßstab für die Zusammenarbeit. Die Investition in
              ein gutes LV zahlt sich über die gesamte Vertragslaufzeit aus.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zum Leistungsverzeichnis</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand
        title="Sie möchten Reinigungsleistungen sauber ausschreiben?"
        lead="Wir erstellen mit Ihnen ein objektbezogenes Leistungsverzeichnis — transparent, vergleichbar und auf Ihr Gebäude zugeschnitten."
      />
    </div>
  );
}
