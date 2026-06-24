import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle2, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';

export default function FachwissenISO() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ISO 9001 & 14001 in der Gebäudereinigung: Qualität & Umwelt",
    "description": "Warum sind ISO-Zertifizierungen (9001 & 14001) in der Gebäudereinigung wichtig? Erfahren Sie, wie Qualitätsmanagement und Umweltschutz die Reinigungsleistung verbessern.",
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
      "@id": "https://ahad-cleaning.de/fachwissen/iso-9001-iso-14001-gebaeudereinigung-unternehmen"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was bedeutet ISO 9001 in der Gebäudereinigung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die ISO 9001 ist die international anerkannte Norm für Qualitätsmanagement. In der Gebäudereinigung bedeutet das: standardisierte Reinigungsprozesse, lückenlose Dokumentation, regelmäßige Schulungen der Mitarbeiter und ein funktionierendes Fehlermanagement. Dies garantiert dem Kunden eine gleichbleibend hohe Reinigungsqualität."
        }
      },
      {
        "@type": "Question",
        "name": "Wofür steht die ISO 14001 Zertifizierung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die ISO 14001 ist die Norm für Umweltmanagementsysteme. Ein zertifizierter Reinigungsdienstleister verpflichtet sich, seine Umweltauswirkungen systematisch zu reduzieren. Dies umfasst den Einsatz ökologischer Reinigungsmittel, exakte Dosiersysteme zur Vermeidung von Überdosierung, Mülltrennung und wassersparende Reinigungsmethoden."
        }
      },
      {
        "@type": "Question",
        "name": "Warum sollte ich eine zertifizierte Reinigungsfirma beauftragen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zertifizierte Unternehmen bieten mehr Sicherheit, Transparenz und Verlässlichkeit. Sie haben nachgewiesen, dass ihre Prozesse funktionieren und regelmäßig von unabhängigen Auditoren überprüft werden. Das minimiert das Risiko von Ausfällen, Qualitätsschwankungen und rechtlichen Problemen (z.B. beim Arbeitsschutz oder der Entsorgung)."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen ISO 9001 und ISO 14001?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die ISO 9001 regelt das Qualitätsmanagement und stellt sicher, dass Reinigungsleistungen gleichbleibend gut und nachvollziehbar erbracht werden. Die ISO 14001 regelt das Umweltmanagement und sorgt dafür, dass Ressourcenverbrauch, Chemikalieneinsatz und Abfall systematisch reduziert werden. Vereinfacht gesagt: ISO 9001 sichert das WIE der Leistung, ISO 14001 sichert deren ökologische Verantwortung. Beide Normen folgen derselben Grundstruktur (High Level Structure) und lassen sich daher in einem integrierten Managementsystem kombinieren."
        }
      },
      {
        "@type": "Question",
        "name": "Wie kann ich als Auftraggeber prüfen, ob ein ISO-Zertifikat echt und gültig ist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Achten Sie auf drei Punkte: Erstens muss das Zertifikat von einer akkreditierten Zertifizierungsstelle ausgestellt sein (in Deutschland erkennbar am DAkkS-Akkreditierungssymbol). Zweitens muss der Geltungsbereich (Scope) ausdrücklich die Gebäudereinigung umfassen und nicht nur die Verwaltung. Drittens muss das Zertifikat zeitlich gültig sein: Ein ISO-Zertifikat hat eine Laufzeit von drei Jahren und wird in dieser Zeit jährlich durch Überwachungsaudits bestätigt. Lassen Sie sich im Zweifel das aktuelle Zertifikat mit Zertifikatsnummer vorlegen oder fragen Sie bei der Zertifizierungsstelle nach."
        }
      },
      {
        "@type": "Question",
        "name": "Sind ISO-Zertifikate bei öffentlichen Ausschreibungen Pflicht?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ISO-Zertifikate sind in der Regel keine gesetzliche Pflicht, werden aber bei öffentlichen Ausschreibungen und im professionellen Einkauf sehr häufig als Eignungs- oder Zuschlagskriterium gefordert oder positiv bewertet. Nach Vergaberecht dürfen öffentliche Auftraggeber Qualitäts- und Umweltmanagementsysteme als Nachweis verlangen, müssen aber gleichwertige Nachweise zulassen. Praktisch gilt: Ein gültiges ISO 9001- und ISO 14001-Zertifikat erleichtert die Teilnahme an Ausschreibungen erheblich und verschafft im Bietervergleich einen Vorteil."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft wird ein zertifiziertes Reinigungsunternehmen auditiert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein zertifiziertes Unternehmen durchläuft zunächst ein Zertifizierungsaudit (Stufe 1 und Stufe 2). Anschließend findet in jedem der beiden Folgejahre ein externes Überwachungsaudit durch die Zertifizierungsstelle statt. Nach drei Jahren ist ein vollständiges Re-Zertifizierungsaudit erforderlich. Zusätzlich führt das Unternehmen interne Audits und ein jährliches Management-Review durch. Für Auftraggeber bedeutet diese Audit-Kadenz, dass die Qualitäts- und Umweltprozesse dauerhaft und nicht nur einmalig überprüft werden."
        }
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="ISO 9001 & 14001 in der Gebäudereinigung | Fachwissen | AHAD" 
        description="Erfahren Sie, warum ISO-Zertifizierungen (9001 & 14001) in der Gebäudereinigung für Qualität und Umweltschutz stehen. Wir setzen auf zertifizierte Prozesse."
        keywords="ISO 9001 Gebäudereinigung, ISO 14001 Reinigung, Qualitätsmanagement Reinigung, Umweltmanagement Gebäudereinigung, zertifizierte Reinigungsfirma"
        schema={[articleSchema, faqSchema]}
      />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-navy text-white overflow-hidden grain">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600" 
            alt="Qualitätsmanagement und ISO Zertifizierung" 
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
              <Award className="w-4 h-4 text-[#9CDDB7]" />
              Fachwissen: Qualität & Umwelt
            </span>
            <h1 className="display-lg text-white mb-8">
              ISO 9001 & 14001 in der Gebäudereinigung
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-10 font-medium">
              Warum Zertifizierungen mehr als nur Papier sind: 
              Qualitätsmanagement und Umweltbewusstsein als Kern einer professionellen Dienstleistung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auf einen Blick (At a glance) - Good for AEO/GEO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#0B2341] mb-8 text-center">Zertifizierungen auf einen Blick</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f7f9fb] p-8 rounded-2xl border border-gray-100">
              <ShieldCheck className="w-10 h-10 text-[#0B2341] mb-4" />
              <h3 className="font-bold text-xl mb-3 text-[#0B2341]">ISO 9001: Qualitätsmanagement</h3>
              <p className="text-[#424751] mb-4">Der internationale Standard für Qualitätsmanagement. Er garantiert strukturierte Abläufe, klare Verantwortlichkeiten und eine kontinuierliche Verbesserung der Dienstleistungsqualität.</p>
              <ul className="space-y-2 text-sm text-[#424751]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D6B38]" /> Standardisierte Prozesse</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D6B38]" /> Lückenlose Dokumentation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D6B38]" /> Aktives Fehlermanagement</li>
              </ul>
            </div>
            <div className="bg-[#f7f9fb] p-8 rounded-2xl border border-gray-100">
              <Leaf className="w-10 h-10 text-[#0D6B38] mb-4" />
              <h3 className="font-bold text-xl mb-3 text-[#0B2341]">ISO 14001: Umweltmanagement</h3>
              <p className="text-[#424751] mb-4">Die Norm für systematisches Umweltmanagement. Sie belegt, dass ein Unternehmen ökologische Verantwortung übernimmt und Ressourcen schont.</p>
              <ul className="space-y-2 text-sm text-[#424751]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D6B38]" /> Ökologische Reinigungsmittel</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D6B38]" /> Exakte Dosiersysteme</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0D6B38]" /> Ressourcenschonung (Wasser/Energie)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-[#424751] leading-relaxed">
            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Qualität durch Struktur: Warum ISO 9001 entscheidend ist</h2>
            <p className="mb-8">
              In der Gebäudereinigung ist Vertrauen gut, Kontrolle und Struktur sind besser. Die ISO 9001 ist der weltweit anerkannte Standard für Qualitätsmanagement. Für Kunden bedeutet die Zusammenarbeit mit einem nach ISO 9001 zertifizierten Dienstleister wie dem <span className="font-logo">AHAD</span> System vor allem eines: <strong>Verlässlichkeit</strong>.
            </p>
            
            {/* Quick Links for SEO & UX */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider w-full mb-1">Passende Leistungen:</span>
              <Link to="/leistungen/unterhaltsreinigung" className="px-4 py-2 bg-blue-50 text-[#0B2341] rounded-full text-sm font-bold hover:bg-[#0B2341] hover:text-white transition-all border border-blue-100">Unterhaltsreinigung</Link>
              <Link to="/leistungen/industrie-produktionsreinigung" className="px-4 py-2 bg-blue-50 text-[#0B2341] rounded-full text-sm font-bold hover:bg-[#0B2341] hover:text-white transition-all border border-blue-100">Industriereinigung</Link>
              <Link to="/leistungen/medizintechnik-reinigung" className="px-4 py-2 bg-blue-50 text-[#0B2341] rounded-full text-sm font-bold hover:bg-[#0B2341] hover:text-white transition-all border border-blue-100">Medizintechnik</Link>
            </div>

            <p className="mb-8">
              Statt auf Zufall oder das Geschick einzelner Mitarbeiter zu hoffen, basieren alle Abläufe – von der <Link to="/leistungen/unterhaltsreinigung" className="text-[#0B2341] font-bold hover:underline">Unterhaltsreinigung</Link> bis zur komplexen <Link to="/leistungen/industrie-produktionsreinigung" className="text-[#0B2341] font-bold hover:underline">Industriereinigung</Link> – auf fest definierten, erprobten und dokumentierten Prozessen.
            </p>

            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0B2341] mb-6 flex items-center gap-3">
                <Award className="text-[#0B2341] w-8 h-8" />
                Konkrete Vorteile für unsere Kunden
              </h3>
              <ul className="space-y-4 list-none pl-0">
                {[
                  'Reproduzierbare Reinigungsqualität durch Standardisierung aller Arbeitsschritte',
                  'Lückenlose Dokumentation und transparente Leistungsnachweise',
                  'Effizientes Fehlermanagement: Fehler werden nicht nur behoben, sondern ihre Ursachen analysiert, um Wiederholungen zu vermeiden',
                  'Regelmäßige interne und externe Audits zur Sicherung des Qualitätsniveaus',
                  'Hohe Kundenzufriedenheit durch proaktive Kommunikation und feste Ansprechpartner'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-[#424751]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">ISO 9001 vs. ISO 14001 im direkten Vergleich</h2>
            <p className="mb-8">
              Beide Normen folgen seit der Revision 2015 derselben übergeordneten Grundstruktur (der sogenannten High Level Structure) und lassen sich daher in einem integrierten Managementsystem zusammenführen. Inhaltlich verfolgen sie jedoch unterschiedliche Ziele. Die folgende Übersicht zeigt, was Auftraggeber von der jeweiligen Norm konkret erwarten dürfen und welche Nachweise typischerweise damit verbunden sind.
            </p>

            <div className="overflow-x-auto mb-12 rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-[#0B2341] text-white">
                    <th className="px-4 py-4 font-bold align-top">Kriterium</th>
                    <th className="px-4 py-4 font-bold align-top">ISO 9001 (Qualität)</th>
                    <th className="px-4 py-4 font-bold align-top">ISO 14001 (Umwelt)</th>
                  </tr>
                </thead>
                <tbody className="text-[#424751]">
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="px-4 py-4 font-bold text-[#0B2341] align-top">Fokus</td>
                    <td className="px-4 py-4 align-top">Gleichbleibende Dienstleistungsqualität und Prozesssicherheit</td>
                    <td className="px-4 py-4 align-top">Systematische Reduktion der Umweltauswirkungen</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-[#f7f9fb]">
                    <td className="px-4 py-4 font-bold text-[#0B2341] align-top">Kernfrage</td>
                    <td className="px-4 py-4 align-top">Wird die Leistung zuverlässig und nachvollziehbar erbracht?</td>
                    <td className="px-4 py-4 align-top">Wird umwelt- und ressourcenschonend gearbeitet?</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="px-4 py-4 font-bold text-[#0B2341] align-top">Nutzen für Auftraggeber</td>
                    <td className="px-4 py-4 align-top">Konstante Reinigungsergebnisse, weniger Reklamationen, klare Ansprechpartner, planbare Abläufe</td>
                    <td className="px-4 py-4 align-top">Beitrag zu eigenen ESG-Zielen, Reduktion von Scope-3-Emissionen in der Lieferkette, geringeres Haftungsrisiko bei Chemie &amp; Entsorgung</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-[#f7f9fb]">
                    <td className="px-4 py-4 font-bold text-[#0B2341] align-top">Typische Nachweise</td>
                    <td className="px-4 py-4 align-top">Prozessbeschreibungen, Leistungsverzeichnisse, Qualitätskontrollen, Reklamationsprotokolle, Schulungsnachweise</td>
                    <td className="px-4 py-4 align-top">Umweltprogramm, Gefahrstoff- und Sicherheitsdatenblätter, Dosierprotokolle, Entsorgungsnachweise, Verbrauchskennzahlen</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="px-4 py-4 font-bold text-[#0B2341] align-top">Zentrales Prinzip</td>
                    <td className="px-4 py-4 align-top">Kontinuierliche Verbesserung (PDCA-Zyklus)</td>
                    <td className="px-4 py-4 align-top">Kontinuierliche Verbesserung (PDCA-Zyklus)</td>
                  </tr>
                  <tr className="bg-[#f7f9fb]">
                    <td className="px-4 py-4 font-bold text-[#0B2341] align-top">Gültigkeit &amp; Prüfung</td>
                    <td className="px-4 py-4 align-top">3 Jahre, jährliche Überwachungsaudits</td>
                    <td className="px-4 py-4 align-top">3 Jahre, jährliche Überwachungsaudits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Verantwortung für morgen: Umweltmanagement nach ISO 14001</h2>
            <p className="mb-8">
              Gebäudereinigung ist ressourcenintensiv. Es werden Wasser, Energie und chemische Produkte verbraucht. Ein Umweltmanagementsystem nach ISO 14001 bedeutet, diese Umweltauswirkungen systematisch zu erfassen, zu bewerten und kontinuierlich zu reduzieren.
            </p>
            <p className="mb-8">
              Für moderne Unternehmen, die eigene Nachhaltigkeitsziele (ESG-Kriterien) verfolgen, ist ein zertifizierter Dienstleister ein wichtiger Baustein in der eigenen Lieferkette (Scope 3 Emissionen).
            </p>

            <h3 className="text-2xl font-bold text-[#0B2341] mb-4">Nachhaltigkeit in der Praxis: Wie wir das umsetzen</h3>
            <ul className="space-y-4 mb-12 list-none pl-0">
              {[
                'Einsatz von biologisch abbaubaren und umweltschonenden Reinigungsmitteln (z.B. mit Ecolabel)',
                'Strikte Vermeidung von Überdosierung durch automatische Dosieranlagen und Hochkonzentrate',
                'Reduzierung des Wasser- und Energieverbrauchs durch moderne Maschinentechnik',
                'Vermeidung von Plastikmüll durch Mehrwegsysteme und Großgebinde',
                'Schulung der Mitarbeiter in ressourcenschonenden Reinigungstechniken',
                'CO2-optimierte Fuhrparklogistik und Tourenplanung'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Warum ISO-Zertifikate bei Ausschreibung, Einkauf und Audit zählen</h2>
            <p className="mb-8">
              Für professionelle Einkaufsabteilungen, Facility-Manager und öffentliche Auftraggeber sind ISO-Zertifikate weit mehr als ein Aushängeschild. Sie sind ein objektives, von einer unabhängigen Stelle bestätigtes Eignungsmerkmal, das den Auswahl- und Beauftragungsprozess absichert. Gerade in der Region Villingen-Schwenningen und im gesamten Baden-Württemberg, wo viele Industrie-, Gesundheits- und Verwaltungsobjekte hohe Anforderungen stellen, entscheidet die nachgewiesene Prozessreife häufig über den Zuschlag.
            </p>

            <h3 className="text-2xl font-bold text-[#0B2341] mb-4">Konkreter Nutzen in der Vergabe</h3>
            <ul className="space-y-4 mb-10 list-none pl-0">
              {[
                'Eignungsnachweis: Im Vergaberecht dürfen Auftraggeber Qualitäts- und Umweltmanagementsysteme als Nachweis der Leistungsfähigkeit verlangen. Ein gültiges Zertifikat erleichtert die Teilnahme an Ausschreibungen erheblich.',
                'Zuschlagskriterium: In vielen Leistungsverzeichnissen fließt eine ISO-Zertifizierung als bewertetes Kriterium in die Angebotswertung ein und verbessert die Position im Bietervergleich.',
                'Lieferantenaudit: Bei Eigenkontrollen oder Lieferantenaudits des Auftraggebers liefert ein zertifiziertes Unternehmen sofort prüffähige Dokumentation (Prozesse, Schulungen, Gefahrstoffe, Entsorgung).',
                'Compliance & Haftung: Dokumentierte Prozesse bei Arbeitsschutz, Chemikalieneinsatz und Abfallentsorgung reduzieren das rechtliche Risiko entlang der Lieferkette.',
                'ESG-Berichterstattung: Die ISO 14001 des Dienstleisters ist ein belastbarer Baustein für die eigene Nachhaltigkeits- und Scope-3-Berichterstattung des Auftraggebers.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-[#0B2341] mb-4">Rechenbeispiel: Was Qualitätssicherung in der Praxis bedeutet</h3>
            <p className="mb-8">
              Ein Praxisbeispiel verdeutlicht den Wert standardisierter Prozesse. Angenommen, ein Bürogebäude mit 4.000 m&sup2; wird fünfmal pro Woche unterhaltsgereinigt. Bei einem branchenüblichen Orientierungswert von rund 250 bis 350 m&sup2; Reinigungsleistung pro Stunde für Standard-Büroflächen ergibt sich ein täglicher Aufwand von etwa 11 bis 16 Arbeitsstunden. Ohne klar definierte Prozesse schwankt dieser Wert stark je nach eingesetzter Reinigungskraft. Ein ISO-9001-gestütztes Leistungsverzeichnis legt Frequenzen, Methoden und Kontrollpunkte fest, sodass Aufwand, Qualität und Kosten kalkulierbar bleiben. Die genannten Zahlen sind ausdrücklich Richtwerte und ersetzen keine objektbezogene Kalkulation.
            </p>
            <p className="mb-12">
              Ähnlich wirkt die ISO 14001 bei den Verbrauchsmaterialien: Wird Reinigungsmittel über ein automatisches Dosiersystem statt manuell dosiert, lassen sich Überdosierungen vermeiden. In der Praxis bedeutet das je nach Ausgangslage spürbar weniger Chemieverbrauch und Abwasserbelastung. Auch hier handelt es sich um Orientierungswerte, die je nach Objekt, Verschmutzungsgrad und Ausgangssituation variieren.
            </p>

            <div className="bg-[#f7f9fb] p-8 rounded-3xl mb-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0B2341] mb-2 flex items-center gap-3">
                <ShieldCheck className="text-[#0B2341] w-8 h-8" />
                Checkliste: Worauf Auftraggeber beim Zertifikat achten sollten
              </h3>
              <p className="text-[#424751] mb-6 text-base">
                Diese Punkte helfen Ihnen, ein ISO-Zertifikat in der Angebotsphase schnell und sicher zu prüfen:
              </p>
              <ul className="space-y-4 list-none pl-0">
                {[
                  'Akkreditierung prüfen: Wurde das Zertifikat von einer akkreditierten Stelle ausgestellt? In Deutschland erkennbar am DAkkS-Akkreditierungssymbol.',
                  'Geltungsbereich (Scope) lesen: Deckt der Scope ausdrücklich die Gebäudereinigung ab und nicht nur Verwaltung oder einen anderen Geschäftsbereich?',
                  'Gültigkeitsdatum kontrollieren: Ist das Zertifikat noch gültig (Laufzeit drei Jahre) und liegen die jährlichen Überwachungsaudits vor?',
                  'Zertifikatsnummer abgleichen: Lässt sich das Zertifikat über die Zertifizierungsstelle oder ein öffentliches Register verifizieren?',
                  'Beide Normen abfragen: Liegen sowohl ISO 9001 (Qualität) als auch ISO 14001 (Umwelt) vor, idealerweise als integriertes Managementsystem?',
                  'Nachweise anfordern: Kann das Unternehmen ergänzend Schulungsnachweise, Gefahrstoff- und Sicherheitsdatenblätter sowie Entsorgungsnachweise vorlegen?',
                  'Objektbezug herstellen: Werden die zertifizierten Prozesse auch auf Ihr konkretes Objekt angewendet (Leistungsverzeichnis, Qualitätskontrollen, Ansprechpartner)?'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 mt-1 flex-shrink-0" />
                    <span className="text-[#424751]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Fazit: Zertifizierungen schaffen Vertrauen</h2>
            <p className="mb-8">
              Zertifizierungen nach ISO 9001 und ISO 14001 sind für uns kein Selbstzweck und keine reinen Marketinginstrumente. Sie bilden das Fundament für eine verlässliche, transparente und zukunftsorientierte Partnerschaft mit unseren Kunden. Sie geben Ihnen die Sicherheit, dass Ihre Immobilien nicht nur sauber, sondern nach höchsten Qualitäts- und Umweltstandards gepflegt werden.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-[#f7f9fb]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#0B2341] font-bold tracking-wider uppercase text-sm mb-4 block">Häufige Fragen</span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-[#0B2341]">FAQs zu ISO-Zertifizierungen</h2>
          </div>
          <Accordion items={faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))} />
        </div>
      </section>

      <CTABand title="Suchen Sie einen zertifizierten Reinigungspartner?" lead="Gerne erläutern wir Ihnen unser Qualitäts- und Umweltmanagement im Detail und erstellen ein Konzept für Ihr Objekt." />
    </div>
  );
}
