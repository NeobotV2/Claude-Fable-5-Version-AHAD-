import { prefersReducedMotion } from '@/lib/a11y';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, TrendingUp, Users, Clock, Euro, GraduationCap, BadgeCheck, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import { IMG } from '@/lib/images';
import { JOB_PROFILES } from '@/data/jobs';

const benefits = [
  {
    icon: <Euro className="w-6 h-6" />,
    title: 'Klare Vergütung',
    text: 'Vergütung, Arbeitszeitmodell und mögliche Zuschläge besprechen wir vor dem ersten Einsatz verbindlich mit Ihnen.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Planbare Arbeitszeiten',
    text: 'Sie arbeiten in festen Objekten und auf festen Touren. So können Sie Ihre Zeit planen, auch für die Familie.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Festes Team, feste Objektleitung',
    text: 'Sie arbeiten in eingespielten Teams mit einer Objektleitung, die für Sie erreichbar ist und Sie unterstützt.',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Einarbeitung & Weiterbildung',
    text: 'Strukturierte Einarbeitung, Maschinenschulungen und Aufstiegswege bis zur Objektleitung.',
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: 'Passende Arbeitsmodelle',
    text: 'Je nach Einsatzgebiet prüfen wir Minijob, Teilzeit oder Vollzeit gemeinsam mit Ihnen.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Respekt & Wertschätzung',
    text: 'Ordentliche Arbeitskleidung, modernes Material und ein respektvoller Umgang miteinander.',
  },
];

export default function Karriere() {
  return (
    <div>
      <SEO
        title="Jobs Reinigungskraft Villingen-Schwenningen | AHAD"
        description="Jobs in der Gebäudereinigung in Villingen-Schwenningen und Region: Minijob, Teilzeit oder Vollzeit. Bewerbung in vier kurzen Schritten, ganz ohne Lebenslauf."
        keywords="Jobs Gebäudereinigung, Reinigungskraft Job Villingen-Schwenningen, Objektleiter Stelle, Karriere Reinigungsfirma"
      />

      <PageHero
        eyebrow="Karriere bei AHAD"
        title={
          <>
            <span className="block text-mint text-lg sm:text-2xl font-bold mb-3 sm:mb-5" style={{ letterSpacing: 'normal' }}>
              Jobs in der Gebäudereinigung
            </span>{' '}
            <span className="block">Arbeit, die{' '}</span>
            <span className="block">
              <span className="whitespace-nowrap">gesehen wird.</span>
            </span>
          </>
        }
        lead="Unsere Teams reinigen täglich Betriebe in Süddeutschland. Einsatzort, Arbeitszeit und Vergütung besprechen wir mit Ihnen vor dem Start."
        image={IMG.karriere}
        crumbs={[{ label: 'Karriere' }]}
        cta={{ label: 'Interesse in vier Schritten senden', to: '/karriere/bewerbung' }}
        secondaryCta={{
          label: 'Einsatzprofile ansehen',
          href: '#offene-stellen',
          // Sanfter In-Page-Scroll statt Hash-Navigation — funktioniert in
          // beiden Router-Modi (Browser- und Hash-Router der Datei-Vorschau).
          onClick: (e) => {
            e.preventDefault();
            document.getElementById('offene-stellen')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          },
        }}
      />

      {/* Benefits */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Warum AHAD"
            title="Was wir unseren Mitarbeitenden bieten."
            lead="Gute Arbeit in der Gebäudereinigung setzt faire Arbeitsbedingungen voraus."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={benefit.title} className="h-full">
                <div className="h-full bg-paper rounded-3xl border border-line p-8">
                  <span className="inline-flex w-13 h-13 p-3.5 rounded-2xl bg-brand/8 text-brand items-center justify-center mb-5">
                    {benefit.icon}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-navy mb-2.5">{benefit.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offene Stellen */}
      <section id="offene-stellen" className="section-y bg-paper border-y border-line scroll-mt-28">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Einsatzprofile"
              title="In diesen Bereichen prüfen wir Bewerbungen."
              lead="Ob an Ihrem Wunschort und in Ihrem Arbeitsmodell gerade eine Stelle frei ist, klären wir persönlich mit Ihnen."
            />
            <div className="mt-8">
              <SmartImage src={IMG.team} alt="Das AHAD Team" className="rounded-3xl aspect-[4/3]" />
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            {JOB_PROFILES.map((job, i) => (
              <div key={job.title}>
                <Link
                  to={`/karriere/bewerbung?profile=${job.id}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-line p-6 lg:p-7"
                >
                  <div>
                    <h3 className="font-headline font-bold text-lg text-navy mb-1.5">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-caption font-semibold text-slate">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-accent" />
                        {job.employment}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-accent" />
                        {job.region}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-brand flex-shrink-0">
                    Interesse senden
                    <span className="w-9 h-9 rounded-full bg-paper grid place-items-center transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </span>
                </Link>
              </div>
            ))}

            <div>
              <div className="bg-navy text-white rounded-2xl p-7 relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <h3 className="font-headline font-bold text-lg mb-1">Initiativbewerbung</h3>
                    <p className="text-sm text-ondark/80">
                      Kein passendes Profil dabei? Senden Sie uns Ihr Einsatzinteresse. Wir prüfen die Möglichkeiten, können aber keine konkrete Stelle zusagen.
                    </p>
                  </div>
                  <ButtonLink to="/karriere/bewerbung" variant="white" arrow className="flex-shrink-0">
                    Bewerben
                  </ButtonLink>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate leading-relaxed">
                Konkrete, aktuell ausgeschriebene Stellen mit Einsatzort und Arbeitszeit veröffentlichen wir auch auf{' '}
                <a
                  href="https://join.com/companies/ahad-cleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline underline-offset-2 hover:text-brand-light"
                >
                  JOIN (öffnet neuen Tab)
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aufstieg */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Entwicklung"
            title="Vom Einstieg zur Objektleitung."
            align="center"
            className="mb-14 max-w-2xl mx-auto"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Einstieg & Einarbeitung', text: 'Einarbeitung nach dem Patenprinzip: Eine erfahrene Kollegin oder ein erfahrener Kollege arbeitet Sie ein.' },
              { step: '02', title: 'Vorarbeiter:in', text: 'Verantwortung für Team und Qualität im Objekt, mit Schulungen und mehr Gehalt.' },
              { step: '03', title: 'Objektleitung', text: 'Eigene Objekte, Kundenkontakt und Führungsverantwortung.' },
            ].map((stage, i) => (
              <div key={stage.step}>
                <div className="relative bg-paper rounded-3xl border border-line p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-headline text-3xl font-bold text-accent">{stage.step}</span>
                    <TrendingUp className="w-5 h-5 text-brand/30" />
                  </div>
                  <h3 className="font-headline font-bold text-lg text-navy mb-2">{stage.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{stage.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <ButtonLink to="/karriere/bewerbung" size="lg" arrow>
              Interesse in vier Schritten senden
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
