import { motion } from 'motion/react';
import { BookOpen, ShieldCheck, Award, ArrowRight, CheckCircle2, ChevronDown, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

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
        "url": "https://www.ahad-cleaning.de/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.ahad-cleaning.de/fachwissen/iso-9001-14001"
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
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0B2341] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600" 
            alt="Qualitätsmanagement und ISO Zertifizierung" 
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
              <Award className="w-4 h-4 text-[#A9DCBE]" />
              Fachwissen: Qualität & Umwelt
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
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
          <h2 className="text-3xl lg:text-4xl font-black mb-6">Suchen Sie einen zertifizierten Reinigungspartner?</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Gerne erläutern wir Ihnen unser Qualitäts- und Umweltmanagement im Detail und erstellen ein Konzept für Ihr Objekt.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center px-8 py-4 bg-[#0D6B38] text-white font-bold rounded-xl hover:bg-[#0A552C] transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px]"
          >
            Jetzt Kontakt aufnehmen
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
