import { motion } from 'motion/react';
import { BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';

export default function FachwissenIntervalle() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Reinigungsintervalle in Unternehmen: Ein Leitfaden",
    "description": "Wie oft muss ein Büro gereinigt werden? Erfahren Sie alles über optimale Reinigungsintervalle für Unterhaltsreinigung, Sanitäranlagen und Büroräume.",
    "author": {
      "@type": "Organization",
      "name": "AHAD Cleaning Company GmbH"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AHAD Cleaning Company GmbH",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ahad-cleaning.de/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://ahad-cleaning.de/fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie oft sollte ein Büro gereinigt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die optimale Reinigungshäufigkeit für Büros hängt von der Nutzung ab. Stark frequentierte Bereiche wie Sanitäranlagen und Küchen sollten täglich gereinigt werden. Normale Büroarbeitsplätze werden meist 2 bis 3 Mal pro Woche gereinigt, während Aufgaben wie Fensterputzen oder Grundreinigungen in größeren Abständen (z.B. monatlich oder quartalsweise) erfolgen."
        }
      },
      {
        "@type": "Question",
        "name": "Was bedeutet bedarfsorientierte Reinigung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bedarfsorientierte Reinigung (auch dynamische Reinigung genannt) bedeutet, dass nicht starr nach einem festen Plan geputzt wird, sondern nach tatsächlichem Verschmutzungsgrad und Nutzung. Wenn beispielsweise ein Konferenzraum nicht genutzt wurde, wird er auch nicht gereinigt. Das spart Kosten und schont die Umwelt."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Faktoren beeinflussen das Reinigungsintervall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wichtige Faktoren sind die Anzahl der Mitarbeiter, die Besucherfrequenz, die Art der Bodenbeläge (Teppich vs. Hartboden), die Jahreszeit (im Winter wird mehr Schmutz hereingetragen) und der Repräsentationsanspruch des Unternehmens."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollten Sanitäranlagen im Unternehmen gereinigt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sanitäranlagen gehören zu den hygienisch sensibelsten Bereichen und sollten als Grundregel mindestens einmal arbeitstäglich gereinigt und desinfiziert werden. In stark frequentierten Objekten (z. B. Verwaltungen mit hohem Publikumsverkehr, Produktion mit Schichtbetrieb oder Gastronomie) sind mehrfache Sichtreinigungen pro Tag oder eine Tagdienstkraft sinnvoll. Maßgeblich ist die Nutzerzahl pro WC-Einheit: Faustregel als Orientierungswert sind ab etwa 15 bis 20 Personen pro Sanitäreinheit zusätzliche Zwischenreinigungen einzuplanen. Aspekte des Arbeitsschutzes (ASR A4.1) und betriebliche Hygienevorgaben sollten dabei berücksichtigt werden."
        }
      },
      {
        "@type": "Question",
        "name": "Wie wirkt sich der Tariflohn auf die Reinigungskosten aus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Personalkostenanteil macht in der Gebäudereinigung typischerweise 70 bis 85 Prozent des Angebotspreises aus. Maßgeblich ist der allgemeinverbindliche Tariflohn der Gebäudereinigung (Lohngruppe 1, Innenreinigung). Steigt der Tariflohn, steigen die Reinigungskosten nahezu proportional mit, da Material- und Maschinenkosten nur einen kleinen Teil ausmachen. Genau deshalb ist die richtige Intervallplanung der wichtigste Kostenhebel: Wer ein Intervall von täglich auf bedarfsorientiert (z. B. 3x pro Woche) umstellt, kann die Reinigungskraftstunden und damit die Kosten in dem betreffenden Bereich spürbar senken, ohne die Hygiene in sensiblen Zonen zu gefährden. Konkrete Preise sind immer objektabhängig und nur als Richtwert zu verstehen."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen starrer und dynamischer (bedarfsorientierter) Reinigung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei der starren Reinigung wird jeder Bereich nach einem festen Plan in festen Intervallen gereinigt, unabhängig vom tatsächlichen Verschmutzungsgrad. Das ist einfach zu kalkulieren, kann aber zu unnötigen Leistungen (leere Räume werden gereinigt) oder zu Lücken führen. Bei der dynamischen, bedarfsorientierten Reinigung wird der tatsächliche Bedarf erfasst, etwa über Sichtkontrolle, Nutzungsdaten, Belegungspläne oder Sensorik, und es wird dort gereinigt, wo es nötig ist. Hygienisch kritische Bereiche (Sanitär, Küche, Empfang) bleiben dabei immer im festen Tagesintervall, während Büro- und Besprechungsflächen flexibel getaktet werden. So lassen sich Kosten und Ressourcen einsparen, ohne die Qualität in sensiblen Zonen zu reduzieren."
        }
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="Reinigungsintervalle im Büro: Wie oft putzen? | AHAD" 
        description="Wie oft sollte ein Büro gereinigt werden? Unser Leitfaden zu Reinigungsintervallen hilft Ihnen, die optimale Taktung für Ihr Unternehmen zu finden."
        keywords="Reinigungsintervalle, Unterhaltsreinigung Intervalle, Büroreinigung Taktung, wie oft Büro reinigen, Reinigungsplan Büro, AHAD Cleaning"
        schema={[articleSchema, faqSchema]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=1600" 
            alt="Reinigungsintervalle im modernen Büro" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold mb-6 tracking-wider uppercase border border-white/20">
              <BookOpen className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Unterhaltsreinigung
            </span>
            <h1 className="display-lg text-white mb-8">
              Reinigungsintervalle in Unternehmen: Ein Leitfaden
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Wie oft muss was gereinigt werden? Wir erklären die Logik hinter 
              effizienten Reinigungsintervallen für moderne Büro- und Verwaltungsflächen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick (At a glance) - Good for AEO/GEO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Reinigungsintervalle auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Clock className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Tägliche Reinigung</h3>
              <p className="text-[#424751] text-sm">Fokus auf Hygiene und stark frequentierte Bereiche: Sanitäranlagen, Teeküchen, Empfangsbereiche und Müllentsorgung.</p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <Calendar className="w-8 h-8 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Wöchentliche Reinigung</h3>
              <p className="text-[#424751] text-sm">Regelmäßige Pflege: Büroarbeitsplätze (2-3x pro Woche), Staubsaugen, Bodenwischen und Abstauben freier Flächen.</p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-2xl border border-gray-100">
              <BookOpen className="w-8 h-8 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#0B2341]">Monatliche Reinigung</h3>
              <p className="text-[#424751] text-sm">Tiefenpflege: Reinigung von Fußleisten, Heizkörpern, Glastüren und das Entfernen von Spinnweben.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die Bedeutung der richtigen Taktung in der Unterhaltsreinigung</h2>
            <p className="mb-8">
              In der <Link to="/leistungen/unterhaltsreinigung" className="text-[#0B2341] font-bold hover:underline">Unterhaltsreinigung</Link> ist das Intervall der entscheidende Hebel für 
              Wirtschaftlichkeit und Ergebnisqualität. Zu seltene Reinigung führt zu 
              sichtbarem Schmutz, Unzufriedenheit der Mitarbeiter und langfristigem Wertverlust der Immobilie. Zu häufige Reinigung hingegen verursacht unnötige Kosten. Das Ziel ist es, die perfekte Balance zu finden.
            </p>

            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0B2341] mb-6 flex items-center gap-3">
                <Calendar className="text-[#0B2341] w-8 h-8" />
                Typische Reinigungsintervalle im Überblick
              </h3>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-200 pb-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">Täglich:</span>
                  <span>Sanitärräume, Küchenbereiche, stark frequentierte Flure, Empfang, Müllentsorgung.</span>
                </li>
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-200 pb-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">2-3x pro Woche:</span>
                  <span>Büroarbeitsplätze (Schreibtische), Staubsaugen in weniger genutzten Bereichen, Besprechungsräume.</span>
                </li>
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-gray-200 pb-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">Wöchentlich:</span>
                  <span>Abstauben von freien Flächen, Reinigung von Glastüren, Treppenhäuser.</span>
                </li>
                <li className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <span className="font-bold text-[#0B2341] min-w-[120px]">Monatlich:</span>
                  <span>Spinnweben entfernen, Reinigung von Fußleisten, Heizkörpern, Polstermöbelpflege.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Empfohlene Reinigungsintervalle nach Bereich</h2>
            <p className="mb-6">
              Die folgende Tabelle fasst bewährte Richtwerte für die wichtigsten Bereiche in Büro- und Verwaltungsgebäuden zusammen. Die Angaben sind als <strong>Orientierungswerte</strong> zu verstehen und werden im konkreten Objekt anhand von Nutzung, Frequenz und Repräsentationsanspruch angepasst.
            </p>
            <div className="overflow-x-auto mb-12 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-3 font-bold">Bereich</th>
                    <th className="px-4 py-3 font-bold">Empfohlenes Intervall</th>
                    <th className="px-4 py-3 font-bold">Begründung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Sanitäranlagen (WC, Waschräume)</td>
                    <td className="px-4 py-3 align-top">Täglich (bei hoher Frequenz mehrmals täglich / Tagdienst)</td>
                    <td className="px-4 py-3 align-top">Hygienisch kritisch; Infektionsschutz und Akzeptanz erfordern arbeitstägliche Reinigung und Desinfektion von Kontaktflächen.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Büro &amp; Arbeitsplätze</td>
                    <td className="px-4 py-3 align-top">2&ndash;3x pro Woche (Papierkorb ggf. täglich)</td>
                    <td className="px-4 py-3 align-top">Geringe, gleichmäßige Verschmutzung; bei Homeoffice und Desk-Sharing oft bedarfsorientiert ausreichend.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Verkehrsflächen &amp; Treppenhäuser</td>
                    <td className="px-4 py-3 align-top">Täglich bis 2&ndash;3x pro Woche (je nach Frequenz)</td>
                    <td className="px-4 py-3 align-top">Hoher Schmutzeintrag durch Laufverkehr; im Eingangsbereich und bei Nässe (Winter) höhere Taktung.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Küche / Teeküche</td>
                    <td className="px-4 py-3 align-top">Täglich</td>
                    <td className="px-4 py-3 align-top">Lebensmittelkontakt und Geruchsbildung; Spüle, Arbeitsflächen und Müll erfordern tägliche Reinigung.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Glasflächen innen (Türen, Trennwände)</td>
                    <td className="px-4 py-3 align-top">Wöchentlich bis monatlich (Griffspuren bei Bedarf)</td>
                    <td className="px-4 py-3 align-top">Optik und Repräsentation; Fingerabdrücke an Glastüren werden bei Bedarf tagesaktuell entfernt.</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-3 font-semibold text-[#0B2341] align-top">Grundreinigung (Boden-Intensiv, Teppich)</td>
                    <td className="px-4 py-3 align-top">1&ndash;4x pro Jahr (quartalsweise bis jährlich)</td>
                    <td className="px-4 py-3 align-top">Werterhalt der Bodenbeläge; entfernt eingetragenen Tiefenschmutz, der die Unterhaltsreinigung allein nicht löst.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-12 text-sm text-[#6b7280]">
              Hinweis: Die genannten Intervalle sind branchenübliche Richtwerte. Verbindlich ist immer das im <Link to="/leistungen/unterhaltsreinigung" className="text-[#0B2341] font-bold hover:underline">Leistungsverzeichnis</Link> vereinbarte Konzept, das auf Ihr Objekt zugeschnitten wird.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Welche Faktoren beeinflussen die Intervallplanung?</h2>
            <p className="mb-6">
              Ein professionelles Reinigungsunternehmen erstellt nicht einfach einen Standardplan. Bei der Erstellung eines Leistungsverzeichnisses für die <Link to="/branchen/buero-verwaltung" className="text-[#0B2341] font-bold hover:underline">Büroreinigung</Link> berücksichtigen wir 
              folgende individuelle Faktoren:
            </p>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Besucherfrequenz & Mitarbeiteranzahl (Wie viele Menschen nutzen die Fläche?)',
                'Bodenbelagsart (Teppichboden benötigt andere Intervalle als Hartboden)',
                'Nutzungsart der Räume (Ein Konferenzraum verschmutzt anders als ein Einzelbüro)',
                'Jahreszeitliche Einflüsse (Im Winter wird mehr Schmutz und Nässe hereingetragen)',
                'Repräsentationsanspruch des Unternehmens (Kundenbereiche erfordern höhere Taktung)'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Intervall als Kostenhebel: ein Rechenbeispiel</h2>
            <p className="mb-6">
              In der Gebäudereinigung entfallen typischerweise <strong>70 bis 85 Prozent</strong> des Angebotspreises auf Personalkosten. Das Reinigungsintervall bestimmt unmittelbar die benötigten Reinigungskraftstunden und ist damit der größte Stellhebel für die Wirtschaftlichkeit. Das folgende vereinfachte Beispiel dient ausschließlich der Veranschaulichung und stellt keine Preisgarantie dar.
            </p>
            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B2341] mb-4">Beispiel: Büroetage mit 500 m&sup2;</h3>
              <p className="mb-4 text-sm">
                Angenommen, eine Reinigungskraft schafft die Unterhaltsreinigung der Büroflächen in rund 1,5 Stunden pro Durchgang. Bei einem Tariflohn von beispielhaft 14,25 &euro;/Stunde (Orientierungswert, Lohngruppe 1) ergibt sich vor Zuschlägen und Gemeinkosten:
              </p>
              <ul className="space-y-2 text-sm list-none pl-0">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span><strong>Tägliche Reinigung</strong> (5x/Woche): ca. 7,5 Std./Woche</span>
                  <span className="font-bold text-[#0B2341]">~ 107 &euro;/Woche*</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span><strong>Bedarfsorientiert</strong> (3x/Woche): ca. 4,5 Std./Woche</span>
                  <span className="font-bold text-[#0D6B38]">~ 64 &euro;/Woche*</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span><strong>Einsparpotenzial Büroflächen</strong></span>
                  <span className="font-bold text-[#0D6B38]">~ 40 %</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-[#6b7280]">
                *Reiner Lohnanteil ohne Lohnnebenkosten, Material, Maschinen, Regie und Wagnis/Gewinn. Sanitär und Küche bleiben dabei im Tagesintervall. Alle Zahlen sind illustrative Richtwerte; ein verbindliches Angebot erfolgt nach Objektbegehung.
              </p>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Checkliste: Reinigungsplan und Leistungsverzeichnis erstellen</h2>
            <p className="mb-6">
              Ein belastbares Leistungsverzeichnis (LV) ist die Grundlage für vergleichbare Angebote und eine nachvollziehbare Qualitätskontrolle. Die folgende Checkliste hilft Ihnen, alle relevanten Punkte zu erfassen, bevor Sie ein Reinigungskonzept ausschreiben oder beauftragen:
            </p>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Flächenaufmaß erstellen: Quadratmeter je Raum-/Nutzungsart (Büro, Sanitär, Verkehrsfläche, Küche) dokumentieren.',
                'Bodenbeläge erfassen: Hartboden, Teppich, Elastikbelag, Naturstein, Glas - je Belag eigene Pflegeintervalle.',
                'Nutzungsprofil festlegen: Mitarbeiterzahl, Besucherfrequenz, Öffnungs-/Schichtzeiten, Homeoffice-Quote.',
                'Intervall je Bereich definieren: Was wird täglich, wöchentlich, monatlich oder quartalsweise gereinigt?',
                'Hygienezonen priorisieren: Sanitär und Küche immer im Tagesintervall, ggf. mit Sicht-/Zwischenreinigung.',
                'Grundreinigung und Sonderleistungen planen: Glasreinigung, Teppich-Intensiv, Bauschluss separat ausweisen.',
                'Reinigungszeiten abstimmen: Tagdienst, Randzeiten oder außerhalb der Betriebszeiten festlegen.',
                'Qualitätssicherung definieren: Sichtkontrollen, Begehungsprotokolle, Ansprechpartner und Eskalationsweg.',
                'Dokumentationsfähigkeit sicherstellen: Nachweise zu Tariflohn, Sozialversicherung und Mindestlohn einfordern.'
              ].map((item, i) => (
                <li key={`lv-${i}`} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Regionaler Branchenbezug: Villingen-Schwenningen und Baden-Württemberg</h2>
            <p className="mb-8">
              In der Region Villingen-Schwenningen und im gesamten Schwarzwald-Baar-Kreis prägen Verwaltung, Mittelstand, Medizintechnik und produzierendes Gewerbe die Nachfrage nach <Link to="/branchen/buero-verwaltung" className="text-[#0B2341] font-bold hover:underline">Büroreinigung</Link>. Saisonale Einflüsse wie Streusalz, Nässe und Laub im Schwarzwald erhöhen im Herbst und Winter den Schmutzeintrag in Eingangs- und Verkehrsflächen spürbar - hier sind temporär engere Intervalle und ausreichend dimensionierte Sauberlaufzonen sinnvoll. Für tarif- und mindestlohnkonforme Leistungen gilt in Baden-Württemberg wie bundesweit der allgemeinverbindliche Rahmentarifvertrag der Gebäudereinigung; seriöse Anbieter weisen die Lohngrundlage transparent aus.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit: Dynamik schlägt Statik</h2>
            <p className="mb-8">
              Moderne Reinigungskonzepte verabschieden sich zunehmend von starren Intervallen. Die <strong>bedarfsorientierte Reinigung</strong> rückt in den Fokus. Das bedeutet: Es wird dort gereinigt, wo es tatsächlich nötig ist. Wenn ein Büro wegen Homeoffice tagelang leer steht, muss dort auch nicht gesaugt werden. Das AHAD System setzt auf intelligente Revierplanung und geschultes Personal, das Verschmutzungen erkennt und flexibel reagiert.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zu Reinigungsintervallen</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand title="Benötigen Sie ein maßgeschneidertes Reinigungskonzept?" lead="Wir analysieren Ihren Bedarf und erstellen ein Leistungsverzeichnis mit optimalen Reinigungsintervallen für Ihr Unternehmen." />
    </div>
  );
}
