import { Search, Settings2, ClipboardCheck, Shield, CheckCircle2, FileSearch, Users, Repeat, FileCheck2, X } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';

const steps = [
  {
    letter: 'A',
    title: 'Analyse',
    subtitle: 'Objektlogik sauber erfassen',
    icon: <Search className="w-7 h-7" />,
    description:
      'Bevor wir reinigen, verstehen wir: Flächen, Nutzungsintensität, Risikozonen, Schichtlogik und Ihre internen Anforderungen werden systematisch erfasst.',
    deliverables: ['Objektaufnahme mit Flächenlogik', 'Risiko- & Anforderungsprofil', 'Leistungsverzeichnis als Festpreisbasis'],
    accent: <FileSearch className="w-5 h-5" />,
  },
  {
    letter: 'H',
    title: 'Handling',
    subtitle: 'Feste Teams, klare Zuständigkeit',
    icon: <Settings2 className="w-7 h-7" />,
    description:
      'Eingespielte Teams mit fester Objektleitung führen nach definierten Abläufen aus. Jeder weiß, was zu tun ist — und wer verantwortlich ist.',
    deliverables: ['Festes Reinigungsteam je Objekt', 'Objektleitung als Ihr Single Point of Contact', 'Definierte Eskalationswege'],
    accent: <Users className="w-5 h-5" />,
  },
  {
    letter: 'A',
    title: 'Audit',
    subtitle: 'Qualität regelmäßig prüfen',
    icon: <ClipboardCheck className="w-7 h-7" />,
    description:
      'Regelmäßige, dokumentierte Kontrollen machen Leistung messbar. Abweichungen werden erkannt und behoben, bevor sie zur Reklamation werden.',
    deliverables: ['Digitale Qualitätskontrollen', 'Definierte Prüfintervalle', 'Sofortmaßnahmen bei Abweichung'],
    accent: <Repeat className="w-5 h-5" />,
  },
  {
    letter: 'D',
    title: 'Dokumentation',
    subtitle: 'Nachweise auf Knopfdruck',
    icon: <Shield className="w-7 h-7" />,
    description:
      'Checklisten, Leistungen und Kontrollen werden lückenlos dokumentiert. Sie erhalten Transparenz, Nachweissicherheit und Auditfähigkeit — jederzeit.',
    deliverables: ['Leistungsnachweise & Reports', 'Audit-taugliche Historie', 'Klare Datenbasis für Entscheidungen'],
    accent: <FileCheck2 className="w-5 h-5" />,
    highlight: true,
  },
];

const outcomes = [
  { value: '1', label: 'feste Objektleitung je Objekt', text: 'Ein Verantwortlicher steuert — nicht Ihr Office-Management.' },
  { value: '24h', label: 'Reaktionszeit garantiert', text: 'Jedes Anliegen hat einen Verantwortlichen und eine Frist.' },
  { value: '100%', label: 'Nachweisbarkeit', text: 'Jede Leistung dokumentiert — für QM, Audit und Ihr Bauchgefühl.' },
];

/** Systemvergleich — macht den Unterschied zwischen "irgendeine Reinigungsfirma"
 *  und dem AHAD-System auf einen Blick greifbar. Bewusst generisch formuliert
 *  ("Reinigung ohne System"), keine Herabsetzung konkreter Wettbewerber. */
const VERGLEICH = [
  { thema: 'Ansprechpartner', ohne: 'Wechselnde Kontakte, niemand fühlt sich zuständig', ahad: 'Feste Objektleitung mit Namen und Gesicht' },
  { thema: 'Qualität', ohne: 'Fällt erst auf, wenn sich jemand beschwert', ahad: 'Dokumentierte Audits in festen Intervallen' },
  { thema: 'Angebot', ohne: 'Pauschalpreis ohne definierten Leistungsumfang', ahad: 'Festpreis auf Basis eines Leistungsverzeichnisses' },
  { thema: 'Reklamation', ohne: 'Diskussion, Vertröstung, Wiederholung', ahad: 'Kostenfreie Nachbesserung, Antwort in 24 h' },
  { thema: 'Personal', ohne: 'Anonyme Kolonnen, häufige Wechsel', ahad: 'Festangestellte, geschulte und eingespielte Teams' },
  { thema: 'Nachweise', ohne: 'Keine — Sauberkeit bleibt Bauchgefühl', ahad: 'Auditfähige Leistungs- und Qualitätsnachweise' },
];

export default function AHADSystem() {
  return (
    <div>
      <SEO
        title="Das AHAD System: Qualität mit Methode | AHAD Cleaning"
        description="Analyse, Handling, Audit, Dokumentation: Das AHAD System ersetzt Zufall durch messbare Reinigungsqualität — mit festen Teams und lückenlosen Nachweisen."
        keywords="AHAD System, Qualitätsmanagement Gebäudereinigung, dokumentierte Reinigung, Qualitätssicherung Reinigung"
      />

      <PageHero
        eyebrow="Unser Betriebssystem"
        title={
          <>
            Vier Buchstaben.
            <br />
            Null Zufall.
          </>
        }
        lead="AHAD steht für Analyse, Handling, Audit und Dokumentation — der Kreislauf, der aus Reinigung einen steuerbaren, messbaren Prozess macht. Unser Name ist unser Verfahren."
        image={IMG.heroArchitecture}
        crumbs={[{ label: 'AHAD System' }]}
        cta={{ label: 'System live erleben — Angebot anfordern', to: '/angebot' }}
      />

      {/* Die 4 Schritte — vertikale Editorial-Strecke */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Der Kreislauf"
            title="So entsteht Qualität, die bleibt."
            align="center"
            className="mb-16 lg:mb-24"
          />

          <div className="relative space-y-8 lg:space-y-12">
            {/* Verbindungslinie */}
            <div className="hidden lg:block absolute left-[3.45rem] top-12 bottom-12 w-px bg-gradient-to-b from-brand/10 via-brand/40 to-accent/40" aria-hidden />

            {steps.map((step, i) => (
              <Reveal key={i} delay={0.05}>
                <div
                  className={`relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-[2rem] border p-8 lg:p-12 overflow-hidden ${
                    step.highlight ? 'bg-navy text-white border-navy shadow-lifted grain' : 'bg-paper border-line'
                  }`}
                >
                  <span
                    className={`absolute -top-10 right-2 font-logo font-black text-[12rem] leading-none select-none pointer-events-none ${
                      step.highlight ? 'text-white/5' : 'text-navy/5'
                    }`}
                    aria-hidden
                  >
                    {step.letter}
                  </span>

                  <div className="lg:col-span-2 relative z-10">
                    <div
                      className={`w-[4.5rem] h-[4.5rem] rounded-2xl grid place-items-center ${
                        step.highlight ? 'bg-accent text-white shadow-glow' : 'bg-white border border-line text-brand shadow-soft'
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative z-10">
                    <div className={`text-[11px] font-black uppercase tracking-[0.2em] mb-2 ${step.highlight ? 'text-mint' : 'text-brand'}`}>
                      Schritt {i + 1} · {step.subtitle}
                    </div>
                    <h3 className={`font-headline text-3xl font-bold mb-4 ${step.highlight ? 'text-white' : 'text-navy'}`}>
                      {step.title}
                    </h3>
                    <p className={`leading-relaxed ${step.highlight ? 'text-blue-100/85' : 'text-slate'}`}>{step.description}</p>
                  </div>

                  <div className="lg:col-span-4 relative z-10">
                    <div
                      className={`rounded-2xl p-6 h-full ${
                        step.highlight ? 'bg-white/5 border border-white/10' : 'bg-white border border-line'
                      }`}
                    >
                      <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] mb-4 ${step.highlight ? 'text-mint' : 'text-accent'}`}>
                        {step.accent}
                        Das bekommen Sie
                      </div>
                      <ul className="space-y-2.5">
                        {step.deliverables.map((deliverable) => (
                          <li key={deliverable} className={`flex items-start gap-2.5 text-sm font-semibold ${step.highlight ? 'text-blue-50' : 'text-navy'}`}>
                            <CheckCircle2 size={15} className={`flex-shrink-0 mt-0.5 ${step.highlight ? 'text-mint' : 'text-accent'}`} />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ergebnis */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Das Ergebnis"
            title="Was das System für Sie verändert."
            align="center"
            className="mb-14 max-w-2xl mx-auto"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {outcomes.map((outcome, i) => (
              <Reveal key={outcome.label} delay={i * 0.1}>
                <div className="bg-white rounded-3xl border border-line p-8 text-center card-lift h-full">
                  <div className="font-accent text-5xl font-bold text-brand mb-2">{outcome.value}</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.18em] text-accent mb-4">{outcome.label}</div>
                  <p className="text-sm text-slate leading-relaxed">{outcome.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25} className="text-center mt-12">
            <ButtonLink to="/referenzen" variant="outline" arrow>
              Kunden, die dem System vertrauen
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Systemvergleich */}
      <section className="py-20 lg:py-28 bg-white border-t border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Der Unterschied"
            title="Reinigung ohne System — oder mit."
            lead="Der Preis pro Stunde sieht oft ähnlich aus. Der Unterschied zeigt sich im Betrieb: wenn etwas schiefgeht, wenn jemand fragt, wer zuständig ist, und wenn ein Audit Nachweise verlangt."
            align="center"
            className="mb-12 max-w-2xl mx-auto"
          />
          <Reveal>
            <div className="overflow-x-auto rounded-3xl border border-line shadow-soft">
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="px-5 py-4 font-bold text-navy bg-paper w-[22%]">&nbsp;</th>
                    <th className="px-5 py-4 font-bold text-slate bg-paper w-[39%]">Reinigung ohne System</th>
                    <th className="px-5 py-4 font-bold text-white bg-navy w-[39%]">Das AHAD System</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {VERGLEICH.map((row) => (
                    <tr key={row.thema}>
                      <td className="px-5 py-4 font-bold text-navy align-top">{row.thema}</td>
                      <td className="px-5 py-4 text-slate align-top">
                        <span className="flex items-start gap-2">
                          <X size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                          {row.ohne}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-navy font-medium align-top bg-accent/[0.04]">
                        <span className="flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-accent flex-shrink-0 mt-0.5" />
                          {row.ahad}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Erleben Sie das System im eigenen Objekt"
        lead="Starten Sie mit der Analyse: Objektbesichtigung in 48h, belastbares Angebot in 24h danach."
      />
    </div>
  );
}
