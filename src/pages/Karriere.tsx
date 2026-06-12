import { Link } from 'react-router-dom';
import { ArrowRight, Heart, TrendingUp, Users, Clock, Euro, GraduationCap, BadgeCheck, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import { IMG } from '@/lib/images';
import { STATS } from '@/lib/site';
import Stat from '@/components/ui/Stat';

const benefits = [
  {
    icon: <Euro className="w-6 h-6" />,
    title: 'Faire, pünktliche Bezahlung',
    text: 'Tariflohn oder besser, pünktlich auf dem Konto — plus Zuschläge, die wirklich ausgezahlt werden.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Planbare Arbeitszeiten',
    text: 'Feste Objekte und feste Touren statt täglichem Springen — Ihre Zeit ist planbar, auch für die Familie.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Echtes Team, feste Objekte',
    text: 'Sie arbeiten in eingespielten Teams mit fester Objektleitung, die erreichbar ist und Rückendeckung gibt.',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Einarbeitung & Weiterbildung',
    text: 'Strukturierte Einarbeitung, Maschinenschulungen und Aufstiegswege bis zur Objektleitung.',
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: 'Unbefristet & sozialversichert',
    text: 'Feste Anstellung mit allen Sozialleistungen — Minijob, Teilzeit oder Vollzeit, wie es zu Ihrem Leben passt.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Respekt & Wertschätzung',
    text: 'Ordentliche Arbeitskleidung, modernes Material und ein Umgang auf Augenhöhe — bei uns Standard.',
  },
];

const jobs = [
  { title: 'Reinigungskraft (m/w/d)', type: 'Minijob · Teilzeit · Vollzeit', location: 'Villingen-Schwenningen & Umgebung' },
  { title: 'Vorarbeiter:in Gebäudereinigung (m/w/d)', type: 'Vollzeit', location: 'Schwarzwald-Baar-Kreis' },
  { title: 'Objektleiter:in (m/w/d)', type: 'Vollzeit', location: 'Region Stuttgart' },
  { title: 'Glas- & Fassadenreiniger:in (m/w/d)', type: 'Vollzeit', location: 'Süddeutschland' },
];

export default function Karriere() {
  return (
    <div>
      <SEO
        title="Karriere & Jobs in der Gebäudereinigung | AHAD Cleaning"
        description="Jobs bei AHAD Cleaning: faire Bezahlung, planbare Arbeitszeiten, feste Teams. Jetzt in 2 Minuten bewerben — Reinigungskraft, Vorarbeiter, Objektleitung."
        keywords="Jobs Gebäudereinigung, Reinigungskraft Job Villingen-Schwenningen, Objektleiter Stelle, Karriere Reinigungsfirma"
      />

      <PageHero
        eyebrow="Karriere bei AHAD"
        title={
          <>
            Arbeit, die gesehen
            <br />
            wird. Bei uns.
          </>
        }
        lead="80+ Kolleginnen und Kollegen sorgen täglich dafür, dass Betriebe in Süddeutschland sauber laufen. Was sie eint: faire Bedingungen, feste Teams und ein Arbeitgeber, der Wort hält."
        image={IMG.karriere}
        crumbs={[{ label: 'Karriere' }]}
        cta={{ label: 'In 2 Minuten bewerben', to: '/karriere/bewerbung' }}
        secondaryCta={{
          label: 'Offene Stellen ansehen',
          href: '#offene-stellen',
          // Sanfter In-Page-Scroll statt Hash-Navigation — funktioniert in
          // beiden Router-Modi (Browser- und Hash-Router der Datei-Vorschau).
          onClick: (e) => {
            e.preventDefault();
            document.getElementById('offene-stellen')?.scrollIntoView({ behavior: 'smooth' });
          },
        }}
      >
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl">
          {STATS.map((stat) => (
            <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} dark />
          ))}
        </div>
      </PageHero>

      {/* Benefits */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Warum AHAD"
            title="Sechs Gründe, morgens gern zu starten."
            lead="Gebäudereinigung hat einen besseren Ruf verdient. Wir fangen bei den Arbeitsbedingungen an."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={Math.min(i * 0.08, 0.3)} className="h-full">
                <div className="h-full bg-paper rounded-3xl border border-line p-8 card-lift">
                  <span className="inline-flex w-13 h-13 p-3.5 rounded-2xl bg-brand/8 text-brand items-center justify-center mb-5">
                    {benefit.icon}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-navy mb-2.5">{benefit.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{benefit.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offene Stellen */}
      <section id="offene-stellen" className="py-20 lg:py-32 bg-paper border-y border-line scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Offene Stellen"
              title="Wir suchen Verstärkung."
              lead="Kein Anschreiben, kein Lebenslauf-Stress: Unsere Bewerbung dauert 2 Minuten — den Rest klären wir im persönlichen Gespräch."
            />
            <Reveal delay={0.2} className="mt-8">
              <SmartImage src={IMG.team} alt="Das AHAD Team" className="rounded-3xl aspect-[4/3] shadow-soft" />
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            {jobs.map((job, i) => (
              <Reveal key={job.title} delay={i * 0.08}>
                <Link
                  to="/karriere/bewerbung"
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-line p-6 lg:p-7 card-lift"
                >
                  <div>
                    <h3 className="font-headline font-bold text-lg text-navy mb-1.5">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-semibold text-slate">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-accent" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-accent" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-brand flex-shrink-0">
                    Jetzt bewerben
                    <span className="w-9 h-9 rounded-full bg-paper grid place-items-center transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={0.35}>
              <div className="bg-navy text-white rounded-2xl p-7 grain relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <h3 className="font-headline font-bold text-lg mb-1">Initiativbewerbung</h3>
                    <p className="text-sm text-blue-100/80">
                      Nichts Passendes dabei? Überzeugen Sie uns trotzdem — gute Leute finden bei uns immer einen Platz.
                    </p>
                  </div>
                  <ButtonLink to="/karriere/bewerbung" variant="white" arrow className="flex-shrink-0">
                    Bewerben
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Aufstieg */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Entwicklung"
            title="Vom Einstieg zur Objektleitung."
            align="center"
            className="mb-14 max-w-2xl mx-auto"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Einstieg & Einarbeitung', text: 'Strukturierter Start mit Patenprinzip — niemand wird ins kalte Wasser geworfen.' },
              { step: '02', title: 'Vorarbeiter:in', text: 'Verantwortung für Team und Qualität im Objekt, mit Schulungen und mehr Gehalt.' },
              { step: '03', title: 'Objektleitung', text: 'Eigene Objekte, Kundenkontakt und Führungsverantwortung — das Karriereziel im System.' },
            ].map((stage, i) => (
              <Reveal key={stage.step} delay={i * 0.12}>
                <div className="relative bg-paper rounded-3xl border border-line p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-headline text-3xl font-bold text-accent">{stage.step}</span>
                    <TrendingUp className="w-5 h-5 text-brand/30" />
                  </div>
                  <h3 className="font-headline font-bold text-lg text-navy mb-2">{stage.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{stage.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="text-center mt-12">
            <ButtonLink to="/karriere/bewerbung" size="lg" arrow>
              Jetzt in 2 Minuten bewerben
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
