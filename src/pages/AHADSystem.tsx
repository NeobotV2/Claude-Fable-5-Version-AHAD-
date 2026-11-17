import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import FactRow from '@/components/ui/FactRow';
import ButtonLink from '@/components/ui/Button';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';

const steps = [
  {
    letter: 'A',
    title: 'Analyse',
    subtitle: 'Objekt und Anforderungen erfassen',
    description:
      'Vor dem ersten Einsatz erfassen wir Flächen, Nutzungsintensität, Risikozonen, Schichtzeiten und Ihre internen Anforderungen.',
    deliverables: ['Objektaufnahme mit Flächenaufstellung', 'Risiko- & Anforderungsprofil', 'Leistungsverzeichnis als Festpreisbasis'],
  },
  {
    letter: 'H',
    title: 'Handling',
    subtitle: 'Feste Teams, klare Zuständigkeit',
    description:
      'Eingespielte Teams arbeiten unter einer festen Objektleitung nach festgelegten Abläufen. Jeder im Team kennt seine Aufgaben und weiß, wer verantwortlich ist.',
    deliverables: ['Festes Reinigungsteam je Objekt', 'Objektleitung als Ihr zentraler Ansprechpartner', 'Festgelegte Eskalationswege'],
  },
  {
    letter: 'A',
    title: 'Audit',
    subtitle: 'Qualität regelmäßig prüfen',
    description:
      'Wir kontrollieren die Leistung regelmäßig und dokumentieren das Ergebnis. Abweichungen beheben wir, bevor daraus eine Reklamation wird.',
    deliverables: ['Digitale Qualitätskontrollen', 'Definierte Prüfintervalle', 'Sofortmaßnahmen bei Abweichung'],
  },
  {
    letter: 'D',
    title: 'Dokumentation',
    subtitle: 'Leistungen belegen',
    description:
      'Wir dokumentieren Checklisten, erbrachte Leistungen und Kontrollen. Die Nachweise können Sie für Ihr Qualitätsmanagement und für Audits verwenden.',
    deliverables: ['Leistungsnachweise & Reports', 'Nachvollziehbare Historie für Audits', 'Datengrundlage für Ihre Entscheidungen'],
  },
];

const outcomes = [
  { value: '1', label: 'feste Objektleitung je Objekt', text: 'Die Objektleitung steuert die Reinigung. Ihr Office-Management muss das nicht übernehmen.' },
  { value: '1', label: 'fester Meldeweg', text: 'Jedes Anliegen erhält einen Verantwortlichen und einen dokumentierten Status.' },
  { value: 'Jede', label: 'Leistung nachweisbar', text: 'Die Ausführung ist dokumentiert und für QM und Audits verwendbar.' },
];

/** Systemvergleich — macht den Unterschied zwischen "irgendeine Reinigungsfirma"
 *  und dem AHAD-System auf einen Blick greifbar. Bewusst generisch formuliert
 *  ("Reinigung ohne System"), keine Herabsetzung konkreter Wettbewerber. */
const VERGLEICH = [
  { thema: 'Ansprechpartner', ohne: 'Wechselnde Kontakte, niemand fühlt sich zuständig', ahad: 'Feste Objektleitung mit Namen und Gesicht' },
  { thema: 'Qualität', ohne: 'Fällt erst auf, wenn sich jemand beschwert', ahad: 'Dokumentierte Audits in festen Intervallen' },
  { thema: 'Angebot', ohne: 'Pauschalpreis ohne definierten Leistungsumfang', ahad: 'Festpreis auf Basis eines Leistungsverzeichnisses' },
  { thema: 'Reklamation', ohne: 'Lange Diskussionen, Mängel treten wieder auf', ahad: 'Dokumentierter Meldeweg und vereinbarte Nachbesserung' },
  { thema: 'Personal', ohne: 'Anonyme Kolonnen, häufige Wechsel', ahad: 'Festangestellte, geschulte Teams' },
  { thema: 'Nachweise', ohne: 'Keine, Sauberkeit lässt sich nicht belegen', ahad: 'Auditfähige Leistungs- und Qualitätsnachweise' },
];

export default function AHADSystem() {
  return (
    <div>
      <SEO
        title="Das AHAD System: So arbeiten wir | AHAD Cleaning"
        description="Analyse, Handling, Audit, Dokumentation: So organisiert AHAD Cleaning die Gebäudereinigung, mit festen Teams, regelmäßigen Kontrollen und Leistungsnachweisen."
        keywords="AHAD System, Qualitätsmanagement Gebäudereinigung, dokumentierte Reinigung, Qualitätssicherung Reinigung"
      />

      <PageHero
        eyebrow="Unser Verfahren"
        title="Vier Schritte, nach denen wir arbeiten."
        lead="AHAD steht für Analyse, Handling, Audit und Dokumentation. Nach diesen vier Schritten planen, führen und prüfen wir die Reinigung Ihres Objekts."
        image={IMG.heroArchitecture}
        crumbs={[{ label: 'AHAD System' }]}
        cta={{ label: 'Angebot anfordern', to: '/angebot' }}
      />

      {/* Die 4 Schritte — je Buchstabe der Wortmarke eine Zeile */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Der Kreislauf" title="Die vier Schritte im Einzelnen." className="mb-12" />

          <ol className="border-t-2 border-navy">
            {steps.map((step, i) => (
              <li
                key={i}
                className="grid grid-cols-[3.5rem_1fr] lg:grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-6 py-10 border-b border-line"
              >
                <span
                  className="lg:col-span-2 font-logo font-black text-6xl lg:text-8xl leading-none text-navy"
                  aria-hidden
                >
                  {step.letter}
                </span>

                <div className="lg:col-span-6">
                  <p className="text-sm font-semibold text-accent mb-1.5">
                    Schritt {i + 1} · {step.subtitle}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-3">{step.title}</h3>
                  <p className="text-slate leading-relaxed">{step.description}</p>
                </div>

                <div className="col-span-2 lg:col-span-4">
                  <p className="pb-2.5 border-b border-navy text-sm font-semibold text-navy">Das bekommen Sie</p>
                  <ul>
                    {step.deliverables.map((deliverable) => (
                      <li key={deliverable} className="py-2.5 border-b border-line text-body-sm font-medium text-navy">
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ergebnis */}
      <section className="section-y bg-paper border-t border-line">
        <div className="container-page">
          <SectionHeading
            eyebrow="Im Alltag"
            title="Was sich für Sie ändert."
            className="mb-12"
          />
          <FactRow
            framed
            items={outcomes.map((outcome) => ({ value: outcome.value, label: outcome.label, sub: outcome.text }))}
          />
          <ButtonLink to="/referenzen" variant="outline" arrow className="mt-10">
            Referenzen ansehen
          </ButtonLink>
        </div>
      </section>

      {/* Systemvergleich */}
      <section className="section-y bg-white border-t border-line">
        <div className="container-page">
          <SectionHeading
            eyebrow="Vergleich"
            title="Reinigung mit und ohne festes System."
            lead="Der Stundenpreis ist oft ähnlich. Unterschiede zeigen sich im Alltag: bei Mängeln, bei der Frage nach der Zuständigkeit und wenn ein Audit Nachweise verlangt."
            className="mb-10 max-w-3xl"
          />
            <div
              className="overflow-x-auto border-t-2 border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              role="region"
              aria-label="Vergleich: Reinigung ohne System und mit dem AHAD System"
              tabIndex={0}
            >
              <table className="w-full text-left text-sm border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="pr-5 py-4 font-semibold text-navy w-[22%]">&nbsp;</th>
                    <th className="px-5 py-4 font-semibold text-slate w-[39%]">Reinigung ohne System</th>
                    <th className="px-5 py-4 font-semibold text-white bg-navy w-[39%]">Das AHAD System</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {VERGLEICH.map((row) => (
                    <tr key={row.thema}>
                      <td className="pr-5 py-4 font-semibold text-navy align-top">{row.thema}</td>
                      <td className="px-5 py-4 text-slate align-top">{row.ohne}</td>
                      <td className="px-5 py-4 text-navy font-medium align-top bg-paper">{row.ahad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </section>

      <CTABand
        title="Das AHAD System für Ihr Objekt"
        lead="Am Anfang steht die Objektbesichtigung. Den Termin stimmen wir mit Ihnen ab, danach erhalten Sie ein Angebot."
      />
    </div>
  );
}
