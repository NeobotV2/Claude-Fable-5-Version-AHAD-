import { Link } from 'react-router-dom';
import { ArrowRight, Handshake, Target, ShieldCheck, Leaf, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import Stat from '@/components/ui/Stat';
import LogoMarquee from '@/components/LogoMarquee';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import { CLIENT_REFERENCES, STATS } from '@/lib/site';

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Verbindlichkeit',
    text: 'Wir stimmen Leistungen, Zuständigkeiten und Termine transparent ab und halten Vereinbarungen nachvollziehbar fest.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Nachweisbarkeit',
    text: 'Wir dokumentieren, was wir leisten. Qualität, die man nicht belegen kann, zählt für uns nicht.',
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: 'Partnerschaft',
    text: 'Faire Verträge ohne Knebel, feste Ansprechpartner und ein Umgang auf Augenhöhe — mit Kunden wie Mitarbeitenden.',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Verantwortung',
    text: 'Umweltschonende Verfahren, faire Arbeitsbedingungen und regionale Verwurzelung in Süddeutschland.',
  },
];

const milestones = [
  { year: 'Gründung', text: 'Start als regionaler Reinigungsdienst im Schwarzwald-Baar-Kreis — mit dem Anspruch, es besser zu machen.' },
  { year: 'Wachstum', text: 'Ausbau des Einsatzgebiets für gewerbliche Kunden in Süddeutschland.' },
  { year: 'System', text: 'Entwicklung des AHAD-Systems: Analyse, Handling, Audit, Dokumentation als verbindlicher Standard.' },
  { year: 'Heute', text: 'Gebäudedienstleistungen mit klaren Abläufen für Unternehmen und Organisationen.' },
];

export default function Unternehmen() {
  return (
    <div>
      <SEO
        title="Über AHAD Cleaning: Das Unternehmen | AHAD Cleaning"
        description="AHAD Cleaning ist Ihr Partner für systematische Gebäudereinigung in Süddeutschland — mit klaren Abläufen und persönlicher Betreuung."
        keywords="AHAD Cleaning Unternehmen, Gebäudereinigung Firma Villingen-Schwenningen, Reinigungsunternehmen Süddeutschland"
      />

      <PageHero
        eyebrow="Über uns"
        title={
          <>
            <span className="block">Wir sind die,{' '}</span>
            <span className="block">die Wort halten.</span>
          </>
        }
        lead="AHAD Cleaning ist ein inhabergeführtes Gebäudedienstleistungsunternehmen aus Villingen-Schwenningen. Unser Antrieb: Reinigung so verlässlich machen, dass Sie nie wieder darüber nachdenken müssen."
        image={IMG.team}
        crumbs={[{ label: 'Unternehmen' }]}
        cta={{ label: 'Mit uns arbeiten', to: '/angebot' }}
        secondaryCta={{ label: 'Karriere bei AHAD', to: '/karriere' }}
      />

      {/* Zahlen */}
      {STATS.length > 0 && <section className="bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} y={16}>
              <Stat value={stat.value} suffix={stat.suffix} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </section>}

      {/* Story */}
      <section className="py-20 lg:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeading
              eyebrow="Unsere Geschichte"
              title="Vom regionalen Dienstleister zum System-Anbieter."
              lead="Was als kleiner Reinigungsbetrieb begann, ist heute ein strukturiertes Unternehmen mit eigenem Qualitätssystem — gewachsen durch Empfehlungen, nicht durch Versprechen."
            />
            <div className="mt-10 space-y-6">
              {milestones.map((milestone, i) => (
                <Reveal key={milestone.year} delay={i * 0.08}>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="w-3 h-3 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                      {i < milestones.length - 1 && <span className="w-px flex-grow bg-line mt-1" />}
                    </div>
                    <div className="pb-2">
                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-brand mb-1">{milestone.year}</div>
                      <p className="text-slate text-[15px] leading-relaxed">{milestone.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative">
              <SmartImage src={IMG.teamMeeting} alt="Das AHAD Team bei der Einsatzplanung" className="rounded-3xl shadow-lifted aspect-[4/5] lg:aspect-[4/4.5]" />
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lifted border border-line max-w-[18rem]">
                <span className="w-12 h-12 rounded-xl bg-accent/10 text-accent grid place-items-center flex-shrink-0">
                  <MapPin size={22} />
                </span>
                <p className="text-sm font-semibold text-navy leading-snug">
                  Verwurzelt in Villingen-Schwenningen, im Einsatz in ganz Süddeutschland.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Werte */}
      <section className="py-20 lg:py-32 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Wofür wir stehen"
            title="Vier Werte, an denen Sie uns messen können."
            align="center"
            className="mb-14 max-w-2xl mx-auto"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08} className="h-full">
                <div className="h-full bg-paper rounded-3xl border border-line p-8 card-lift">
                  <span className="inline-flex w-13 h-13 p-3.5 rounded-2xl bg-navy text-mint items-center justify-center mb-5">
                    {value.icon}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-navy mb-2.5">{value.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Referenzen-Band */}
      {CLIENT_REFERENCES.length > 0 && <section className="py-16 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 flex items-center justify-between gap-4">
          <p className="eyebrow text-slate">
            <span className="h-px w-8 bg-slate/30" />
            Unternehmen, die uns vertrauen
          </p>
          <Link to="/referenzen" className="text-sm font-bold text-brand hover:text-brand-light transition-colors inline-flex items-center gap-1.5 flex-shrink-0">
            Alle Referenzen <ArrowRight size={15} />
          </Link>
        </div>
        <LogoMarquee />
      </section>}

      {/* Karriere-Hinweis */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="relative bg-gradient-to-br from-brand to-navy text-white rounded-[2rem] p-8 sm:p-12 lg:p-16 overflow-hidden grain">
              <div className="absolute inset-0 blueprint-grid" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="eyebrow text-mint mb-4">Werden Sie Teil davon</span>
                  <h2 className="display-md text-white mb-4">Menschen, die Qualität ernst nehmen, passen zu uns.</h2>
                  <p className="text-blue-100/85 font-medium">
                    Ob Reinigungskraft, Vorarbeiter:in oder Objektleitung: Wir wachsen — und suchen Kolleginnen und
                    Kollegen mit Anspruch.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:justify-end gap-4">
                  <ButtonLink to="/karriere" variant="white" arrow>
                    Offene Stellen
                  </ButtonLink>
                  <ButtonLink to="/karriere/bewerbung" variant="outline-light">
                    Direkt bewerben
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
