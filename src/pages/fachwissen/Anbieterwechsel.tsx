import { motion } from 'motion/react';
import { BookOpen, RefreshCw, ClipboardCheck, ArrowRight, CheckCircle2, ChevronDown, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

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
        "url": "https://www.ahad-cleaning.de/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.ahad-cleaning.de/fachwissen/reinigungsfirma-wechseln-checkliste"
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
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0B2341] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600" 
            alt="Vertragsmanagement und Anbieterwechsel" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
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
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
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

            <h2 className="text-3xl font-black text-[#0B2341] mb-6">Die Übergabe: Der kritische Moment</h2>
            <p className="mb-8">
              Ein reibungsloser Start mit dem neuen Partner erfordert Planung. Stellen Sie sicher, dass Schlüsselübergaben, Einweisungen in die Objektspezifika und die Bereitstellung von Lagerräumen für Reinigungsmittel rechtzeitig geklärt sind. Wir bei AHAD Cleaning setzen hier auf ein strukturiertes Onboarding-Protokoll.
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
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="w-full flex justify-between items-center p-6 text-left cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-lg text-[#0B2341] pr-8">{faq.name}</span>
                  <span className="transition group-open:rotate-180 bg-[#f7f9fb] p-2 rounded-full text-[#0B2341]">
                    <ChevronDown size={20} />
                  </span>
                </summary>
                <div className="p-6 pt-0 text-[#424751] leading-relaxed border-t border-gray-100 mt-2">
                  <p className="pt-4">{faq.acceptedAnswer.text}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#0B2341] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-black mb-6">Planen Sie einen Wechsel?</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Wir unterstützen Sie bei der Analyse Ihres aktuellen Bedarfs und zeigen Ihnen, wie wir die Qualität in Ihrem Objekt nachhaltig sichern können.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-[#0B2341] text-white font-bold rounded-xl hover:bg-blue-700 border border-white/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px]"
            >
              Kostenlose Erstberatung
            </Link>
            <Link
              to="/ahad-system"
              className="inline-flex items-center px-8 py-4 bg-white text-[#0B2341] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Unser System entdecken
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
