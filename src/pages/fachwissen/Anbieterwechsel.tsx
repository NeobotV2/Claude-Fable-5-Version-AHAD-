import { motion } from 'motion/react';
import { RefreshCw, ClipboardCheck, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';

export default function FachwissenAnbieterwechsel() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Reinigungsfirma wechseln: Checkliste & Tipps für Unternehmen",
    "description": "Wann ist der richtige Zeitpunkt, die Reinigungsfirma zu wechseln? Erfahren Sie alles über Kündigungsfristen, Neu-Ausschreibung und den reibungslosen Übergang.",
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
      "@id": "https://ahad-cleaning.de/fachwissen/reinigungsfirma-wechseln-checkliste-tipps"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wann sollte man die Reinigungsfirma wechseln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gründe für einen Wechsel sind meist dauerhafte Qualitätsmängel, mangelnde Kommunikation, unzuverlässiges Personal oder fehlende Transparenz in der Abrechnung. Wenn Nachbesserungsaufforderungen keine dauerhafte Besserung bringen, ist ein Wechsel ratsam."
        }
      },
      {
        "@type": "Question",
        "name": "Worauf muss ich bei der Kündigung des Reinigungsvertrags achten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prüfen Sie zuerst die vertraglich vereinbarten Kündigungsfristen und Laufzeiten. Meist liegen diese bei 3 bis 6 Monaten zum Quartalsende. Eine Kündigung sollte immer schriftlich per Einschreiben erfolgen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie finde ich eine bessere Reinigungsfirma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Achten Sie auf Zertifizierungen (ISO 9001), Referenzen in Ihrer Branche, die Qualifikation der Objektleiter und die Transparenz des Angebots. Ein seriöser Anbieter führt immer eine Vor-Ort-Besichtigung durch, bevor er ein Angebot erstellt."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Kündigungsfristen gelten bei Reinigungsverträgen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei unbefristeten Rahmen- oder Dienstleistungsverträgen sind Kündigungsfristen von 3 Monaten zum Quartalsende üblich, bei Verträgen mit fester Laufzeit (häufig 12 bis 24 Monate) oft 3 bis 6 Monate zum Vertragsende. Maßgeblich ist immer der individuelle Vertrag: Prüfen Sie Laufzeit, Kündigungsfrist und automatische Verlängerungsklauseln. Versäumen Sie die Frist, verlängert sich der Vertrag bei stillschweigender Verlängerung meist um ein weiteres Jahr. Kündigen Sie schriftlich per Einschreiben mit Rückschein und lassen Sie sich den Zugang bestätigen."
        }
      },
      {
        "@type": "Question",
        "name": "Gilt ein Betriebsübergang nach § 613a BGB beim Wechsel der Reinigungsfirma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein Betriebsübergang nach § 613a BGB kann greifen, wenn der neue Dienstleister eine wirtschaftliche Einheit unter Wahrung ihrer Identität übernimmt - in der personalintensiven Gebäudereinigung vor allem dann, wenn ein nach Zahl und Sachkunde wesentlicher Teil der bisherigen Reinigungskräfte vom neuen Anbieter weiterbeschäftigt wird. In diesem Fall gehen die Arbeitsverhältnisse mit allen Rechten und Pflichten auf den neuen Arbeitgeber über. Ob ein Betriebsübergang vorliegt, ist eine Einzelfallbeurteilung; eine rechtliche Prüfung im Vorfeld wird empfohlen, da sie die Kalkulation des neuen Anbieters beeinflusst."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert die Übergangsphase beim Anbieterwechsel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Als Orientierungswert sollten Sie zwischen Vertragsunterzeichnung und Reinigungsstart etwa 4 bis 8 Wochen für ein sauberes Onboarding einplanen. In dieser Zeit erfolgen Objektbegehung, Personaleinsatzplanung, Schlüssel- und Zutrittsregelung, Einweisung in Sicherheits- und Hygienevorgaben sowie die Beschaffung von Maschinen und Verbrauchsmaterial. Eine kurze Parallelphase oder ein klar definierter Stichtag mit Übergabeprotokoll vermeidet, dass an einzelnen Tagen niemand reinigt."
        }
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="Reinigungsfirma wechseln: Checkliste für Unternehmen | AHAD" 
        description="Planen Sie den Wechsel Ihrer Reinigungsfirma? Unsere Checkliste zeigt Ihnen, worauf Sie bei Kündigung, Ausschreibung und Übergabe achten müssen."
        keywords="Reinigungsfirma wechseln, Kündigung Reinigungsvertrag, Ausschreibung Gebäudereinigung, Checkliste Reinigungswechsel"
        schema={[articleSchema, faqSchema]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600" 
            alt="Vertragsmanagement und Anbieterwechsel" 
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
              <RefreshCw className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Strategischer Wechsel
            </span>
            <h1 className="display-lg text-white mb-8">
              Reinigungsfirma wechseln: So gelingt der Übergang
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Unzufrieden mit der aktuellen Reinigungsleistung? Wir zeigen Ihnen, wie Sie rechtssicher kündigen und einen Partner finden, der hält, was er verspricht.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary - Good for AEO/GEO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#f7f9fb] p-8 md:p-12 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-[#0B2341] mb-6">Der Wechsel in 30 Sekunden</h2>
              <p className="text-[#424751] mb-6 leading-relaxed">
                Ein Wechsel der Reinigungsfirma ist oft der einzige Weg, um langfristig Qualität und Hygiene zu sichern. Wichtig sind: Rechtzeitige Prüfung der Kündigungsfristen, eine präzise neue Leistungsbeschreibung und eine strukturierte Übergabe am Stichtag.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm font-bold text-[#0B2341]">
                  <CheckCircle2 className="text-[#0D6B38] w-5 h-5" /> Kündigungsfristen prüfen
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#0B2341]">
                  <CheckCircle2 className="text-[#0D6B38] w-5 h-5" /> LV neu definieren
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#0B2341]">
                  <CheckCircle2 className="text-[#0D6B38] w-5 h-5" /> Referenzen prüfen
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#0B2341]">
                  <CheckCircle2 className="text-[#0D6B38] w-5 h-5" /> Übergabe planen
                </div>
              </div>
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <ShieldAlert className="w-12 h-12 text-[#e63946] mx-auto mb-4" />
                <p className="text-xs text-gray-500 uppercase font-bold mb-2">Wichtigster Tipp</p>
                <p className="text-sm font-bold text-[#0B2341]">Kündigen Sie erst, wenn der neue Vertrag unterschrieben ist!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Wann ist ein Wechsel der Reinigungsfirma notwendig?</h2>
            <p className="mb-8">
              Oft beginnt es schleichend: Ecken werden nicht mehr gründlich gewischt, die Kommunikation mit dem Objektleiter wird zäh, oder das Personal wechselt ständig. Wenn Gespräche und Nachbesserungsaufforderungen keine dauerhafte Lösung bringen, leidet nicht nur die Optik Ihres Gebäudes, sondern auch der Werterhalt der Immobilie und das Wohlbefinden Ihrer Mitarbeiter.
            </p>

            <h3 className="text-2xl font-bold text-[#0B2341] mb-6">Die 5 häufigsten Warnsignale:</h3>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Sinkendes Qualitätsniveau trotz Reklamationen',
                'Hohe Personalfluktuation und mangelnde Einarbeitung',
                'Fehlende Eigenkontrolle durch den Dienstleister',
                'Unklare oder intransparente Abrechnungen',
                'Mangelnde Erreichbarkeit der Verantwortlichen'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mt-1">{i+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Schritt-für-Schritt zum neuen Partner</h2>
            
            <div className="space-y-12 my-12">
              <div className="relative pl-12 border-l-2 border-gray-100">
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-[#0B2341] rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="text-xl font-bold text-[#0B2341] mb-3">1. Bestandsaufnahme & Kündigung</h4>
                <p>Prüfen Sie Ihren aktuellen Vertrag. Welche Kündigungsfristen gelten? Dokumentieren Sie die Mängel der aktuellen Reinigung sorgfältig. Dies ist wichtig, falls Sie eine außerordentliche Kündigung in Erwägung ziehen (was rechtlich jedoch hohe Hürden hat).</p>
              </div>

              <div className="relative pl-12 border-l-2 border-gray-100">
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-[#0B2341] rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="text-xl font-bold text-[#0B2341] mb-3">2. Leistungsverzeichnis (LV) aktualisieren</h4>
                <p>Nutzen Sie den Wechsel, um Ihre Anforderungen neu zu definieren. Haben sich Flächen geändert? Sind neue Hygieneanforderungen hinzugekommen? Ein präzises LV ist die Basis für vergleichbare Angebote.</p>
              </div>

              <div className="relative pl-12 border-l-2 border-gray-100">
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-[#0B2341] rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="text-xl font-bold text-[#0B2341] mb-3">3. Marktsondierung & Begehung</h4>
                <p>Laden Sie potenzielle Partner zu einer Vor-Ort-Begehung ein. Ein seriöser Dienstleister wie AHAD Cleaning wird nie ein Angebot "blind" abgeben. Achten Sie bei der Begehung darauf, ob der Anbieter kritische Fragen stellt und Verbesserungspotenziale erkennt.</p>
              </div>

              <div className="relative pl-12 border-l-2 border-gray-100">
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-[#0B2341] rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="text-xl font-bold text-[#0B2341] mb-3">4. Angebotsprüfung & Referenzen</h4>
                <p>Vergleichen Sie nicht nur den Endpreis. Prüfen Sie die kalkulierten Stunden (Leistungswerte). Sind diese realistisch? Lassen Sie sich Referenzen aus Ihrer Branche nennen und rufen Sie dort an.</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Der Wechsel in 6 Schritten: Phasenplan im Überblick</h2>
            <p className="mb-8">
              Ein strukturierter Wechsel folgt einem klaren Zeitplan. Die folgende Tabelle zeigt die sechs Phasen vom ersten Bedarfscheck bis zur laufenden Qualitätskontrolle - inklusive empfohlener Vorlaufzeit und der wichtigsten Beteiligten. Die Zeitangaben sind Orientierungswerte und hängen von Objektgröße und Vertragslaufzeit ab.
            </p>

            <div className="overflow-x-auto my-12">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="p-4 font-bold rounded-tl-xl">Phase</th>
                    <th className="p-4 font-bold">Aufgabe</th>
                    <th className="p-4 font-bold">Vorlauf (Richtwert)</th>
                    <th className="p-4 font-bold rounded-tr-xl">Beteiligte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-[#f7f9fb]">
                    <td className="p-4 font-bold text-[#0B2341]">1. Bedarf &amp; Leistungsverzeichnis</td>
                    <td className="p-4">Flächen, Frequenzen und Hygieneanforderungen erfassen, LV erstellen</td>
                    <td className="p-4 whitespace-nowrap">ca. 6-9 Monate vorher</td>
                    <td className="p-4">Facility Management, Hausleitung</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#0B2341]">2. Ausschreibung &amp; Angebote</td>
                    <td className="p-4">Anbieter ansprechen, Begehung, Angebote auf Leistungswerte vergleichen</td>
                    <td className="p-4 whitespace-nowrap">ca. 5-6 Monate vorher</td>
                    <td className="p-4">Einkauf, FM, Anbieter</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="p-4 font-bold text-[#0B2341]">3. Kündigung Altvertrag</td>
                    <td className="p-4">Frist prüfen, schriftlich kündigen (erst nach neuem Vertragsentwurf)</td>
                    <td className="p-4 whitespace-nowrap">je nach Frist (3-6 Monate)</td>
                    <td className="p-4">Geschäftsführung, Recht</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#0B2341]">4. Personalübergang (§ 613a BGB)</td>
                    <td className="p-4">Prüfen, ob Betriebsübergang vorliegt; Personalfragen klären</td>
                    <td className="p-4 whitespace-nowrap">ca. 2-3 Monate vorher</td>
                    <td className="p-4">Personal/HR, beide Anbieter</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="p-4 font-bold text-[#0B2341]">5. Onboarding &amp; Stichtag</td>
                    <td className="p-4">Schlüssel, Einweisung, Maschinen, Übergabeprotokoll am Stichtag</td>
                    <td className="p-4 whitespace-nowrap">ca. 4-8 Wochen vorher</td>
                    <td className="p-4">Objektleitung neu, FM</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#0B2341] rounded-bl-xl">6. Qualitätskontrolle</td>
                    <td className="p-4">Regelmäßige Begehungen, Kennzahlen, Feedbackschleifen etablieren</td>
                    <td className="p-4 whitespace-nowrap">laufend ab Start</td>
                    <td className="p-4 rounded-br-xl">FM, Objektleitung</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Personalübergang nach § 613a BGB: Was Auftraggeber wissen müssen</h2>
            <p className="mb-8">
              In der Gebäudereinigung ist die Frage des Personalübergangs besonders relevant, weil die Branche personalintensiv ist und das Reinigungspersonal das eigentliche "Betriebsmittel" darstellt. Übernimmt der neue Dienstleister einen nach Zahl und Sachkunde wesentlichen Teil der bisherigen Reinigungskräfte, kann ein Betriebsübergang nach § 613a BGB vorliegen. Dann gehen die bestehenden Arbeitsverhältnisse - mit Kündigungsschutz, Betriebszugehörigkeit und bestehenden Ansprüchen - auf den neuen Arbeitgeber über.
            </p>
            <p className="mb-8">
              Für Sie als Auftraggeber hat das praktische Folgen: Die Übernahme von eingearbeitetem, objektkundigem Personal kann die Reinigungsqualität in der Anfangsphase stabil halten und Reibungsverluste reduzieren. Gleichzeitig beeinflusst die Personalfrage die Kalkulation des neuen Anbieters. Klären Sie das Thema deshalb früh und transparent. Ob im Einzelfall tatsächlich ein Betriebsübergang vorliegt, ist eine juristische Einzelfallbeurteilung - ziehen Sie im Zweifel arbeitsrechtliche Beratung hinzu.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Angebote richtig vergleichen: ein Rechenbeispiel</h2>
            <p className="mb-8">
              Der niedrigste Endpreis ist selten der beste. Entscheidend ist die Plausibilität der kalkulierten Leistungswerte (Quadratmeter pro Stunde). Wird zu eng kalkuliert, kann das Personal die Fläche in der vorgesehenen Zeit nicht ordentlich reinigen - Qualitätsmängel sind vorprogrammiert. Ein vereinfachtes Orientierungsbeispiel für eine Büroreinigung:
            </p>

            <div className="overflow-x-auto my-12">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="p-4 font-bold rounded-tl-xl">Kennzahl</th>
                    <th className="p-4 font-bold">Anbieter A (Billigangebot)</th>
                    <th className="p-4 font-bold rounded-tr-xl">Anbieter B (realistisch)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-[#f7f9fb]">
                    <td className="p-4 font-bold text-[#0B2341]">Reinigungsfläche</td>
                    <td className="p-4">1.500 m²</td>
                    <td className="p-4">1.500 m²</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#0B2341]">Leistungswert</td>
                    <td className="p-4">350 m²/Std. (zu hoch)</td>
                    <td className="p-4">220 m²/Std. (realistisch)</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="p-4 font-bold text-[#0B2341]">Benötigte Zeit/Tag</td>
                    <td className="p-4">ca. 4,3 Std.</td>
                    <td className="p-4">ca. 6,8 Std.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#0B2341] rounded-bl-xl">Realistisches Ergebnis</td>
                    <td className="p-4">Hetze, Flächen werden ausgelassen</td>
                    <td className="p-4 rounded-br-xl">Gründliche, gleichbleibende Qualität</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mb-8">
              Beide Werte sind Richtwerte und je nach Verschmutzungsgrad, Möblierung und Ausstattung unterschiedlich. Die Botschaft bleibt: Wer den Leistungswert künstlich hochrechnet, verkauft Ihnen einen niedrigen Preis, den am Ende die Qualität bezahlt. Fragen Sie im Angebotsgespräch gezielt nach den hinterlegten Leistungswerten und Einsatzzeiten.
            </p>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die komplette Wechsel-Checkliste</h2>
            <p className="mb-8">
              Diese Checkliste führt Sie durch alle wichtigen Punkte - von der Vorbereitung bis zur ersten Qualitätsbegehung nach dem Start. Haken Sie die Punkte ab, um nichts zu übersehen.
            </p>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Aktuellen Vertrag heraussuchen: Laufzeit, Kündigungsfrist und Verlängerungsklausel notieren',
                'Mängel der bisherigen Reinigung schriftlich und mit Datum dokumentieren',
                'Leistungsverzeichnis aktualisieren: Flächen, Raumtypen, Frequenzen, Sonderleistungen',
                'Hygiene- und Sicherheitsanforderungen sowie Glas-/Grundreinigungsintervalle festlegen',
                'Mindestens drei Anbieter zur Vor-Ort-Begehung einladen',
                'Angebote anhand von Leistungswerten und Einsatzzeiten vergleichen - nicht nur Endpreis',
                'Referenzen aus der eigenen Branche einholen und telefonisch prüfen',
                'Zertifikate (z. B. ISO 9001), Versicherungsnachweis und Tariftreue prüfen',
                'Personalübergang nach § 613a BGB rechtlich abklären lassen',
                'Neuen Vertrag erst unterschreiben, dann den Altvertrag fristgerecht schriftlich kündigen',
                'Kündigung per Einschreiben mit Rückschein versenden und Zugang dokumentieren',
                'Stichtag festlegen und Onboarding-Plan mit dem neuen Anbieter abstimmen',
                'Schlüssel-/Zutrittsregelung, Lagerraum und Stromanschlüsse für Maschinen klären',
                'Übergabeprotokoll am Stichtag erstellen (Zustand, Inventar, Schlüssel)',
                'Feste Ansprechpartner und Eskalationsweg auf beiden Seiten benennen',
                'Qualitätskontrolle vereinbaren: regelmäßige Begehungen und Bewertungsbogen'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ClipboardCheck className="flex-shrink-0 w-5 h-5 text-[#0D6B38] mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Typische Fehler beim Anbieterwechsel - und wie Sie sie vermeiden</h2>
            <p className="mb-8">
              Viele Wechsel scheitern nicht am neuen Anbieter, sondern an vermeidbaren Planungsfehlern. Die häufigsten Stolpersteine in der Praxis:
            </p>
            <div className="space-y-6 my-12">
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                <h4 className="font-bold text-[#0B2341] mb-2">Zu früh gekündigt</h4>
                <p className="text-sm">Wer den Altvertrag kündigt, bevor der neue Vertrag unterschrieben ist, riskiert eine Lücke ohne Reinigung oder muss unter Zeitdruck einen teuren Notdienst beauftragen. Reihenfolge: erst neu binden, dann kündigen.</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                <h4 className="font-bold text-[#0B2341] mb-2">Nur auf den Preis geschaut</h4>
                <p className="text-sm">Das billigste Angebot kalkuliert oft unrealistische Leistungswerte. Die Folge ist genau die Qualitätslücke, die Sie eigentlich loswerden wollten. Vergleichen Sie Stunden, nicht nur Summen.</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                <h4 className="font-bold text-[#0B2341] mb-2">Personalfrage ignoriert</h4>
                <p className="text-sm">Wird § 613a BGB nicht früh geprüft, kommt es kurz vor dem Stichtag zu unkalkulierten Personal- und Kostenfragen. Klären Sie den möglichen Betriebsübergang rechtzeitig.</p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                <h4 className="font-bold text-[#0B2341] mb-2">Keine Qualitätskontrolle vereinbart</h4>
                <p className="text-sm">Ohne messbare Kriterien und regelmäßige Begehungen lässt sich Qualität nicht steuern. Legen Sie vor dem Start einen Bewertungsbogen und feste Begehungstermine fest.</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die Übergabe: Der kritische Moment</h2>
            <p className="mb-8">
              Ein reibungsloser Start mit dem neuen Partner erfordert Planung. Stellen Sie sicher, dass Schlüsselübergaben, Einweisungen in die Objektspezifika und die Bereitstellung von Lagerräumen für Reinigungsmittel rechtzeitig geklärt sind. Wir bei AHAD Cleaning setzen hier auf ein strukturiertes Onboarding-Protokoll.
            </p>

            <h3 className="text-2xl font-bold text-[#0B2341] mb-6">Regionaler Bezug: Wechsel in Villingen-Schwenningen und der Region</h3>
            <p className="mb-8">
              Für Unternehmen in Villingen-Schwenningen und im gesamten Schwarzwald-Baar-Kreis ist die regionale Nähe des Dienstleisters ein wichtiger Qualitätsfaktor. Kurze Wege bedeuten schnelle Reaktionszeiten bei Sonderreinigungen, eine zuverlässige Vertretung bei Personalausfall und persönliche Objektbegehungen statt anonymer Fernbetreuung. Als regional verwurzelter Anbieter aus Baden-Württemberg kennt AHAD Cleaning die Anforderungen von Büro-, Praxis-, Industrie- und Handelsobjekten in der Region und begleitet Sie von der Begehung bis zur laufenden Qualitätssicherung.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zum Anbieterwechsel</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand title="Planen Sie einen Wechsel?" lead="Wir unterstützen Sie bei der Analyse Ihres aktuellen Bedarfs und zeigen Ihnen, wie wir die Qualität in Ihrem Objekt nachhaltig sichern können." />
    </div>
  );
}
