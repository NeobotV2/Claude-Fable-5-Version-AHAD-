import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';
import CTABand from '@/components/CTABand';
import { BRANCHEN } from '@/data/branchen';
import { IMG } from '@/lib/images';

export default function Branchen() {
  return (
    <div>
      <SEO
        title="Branchenlösungen für Gebäudereinigung | AHAD Cleaning"
        description="Spezialisierte Reinigungskonzepte für Industrie & Produktion, Medizintechnik, Büro & Verwaltung, Gewerbeobjekte und Hotellerie in Süddeutschland."
        keywords="Gebäudereinigung Branchen, Industriereinigung, Büroreinigung, Hotelreinigung, Reinigung Medizintechnik"
      />

      <PageHero
        eyebrow="Branchen"
        title="Jede Branche hat ihre eigene Logik."
        lead="Schichtbetrieb, Hygienezonen, Publikumsverkehr oder Abnahmetermine: Wir kennen die kritischen Punkte Ihrer Branche — und bauen die Reinigung darum herum, nicht umgekehrt."
        image={IMG.brancheIndustrie}
        crumbs={[{ label: 'Branchen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
      />

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Übersicht"
            title="Fünf Umgebungen, in denen wir zuhause sind."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANCHEN.map((branche, i) => (
              <Reveal key={branche.slug} delay={Math.min(i * 0.08, 0.25)} className={i === 0 ? 'md:col-span-2' : ''}>
                <Link
                  to={branche.path}
                  className={`group relative flex rounded-3xl overflow-hidden bg-navy shadow-soft card-lift ${
                    i === 0 ? 'min-h-[22rem]' : 'min-h-[17rem]'
                  }`}
                >
                  <SmartImage
                    src={branche.image}
                    alt={branche.name}
                    className="absolute inset-0"
                    imgClassName="opacity-70 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-navy/10" />
                  <div className="relative z-10 mt-auto p-8 text-white w-full">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-mint mb-2">{branche.claim}</p>
                    <div className="flex items-end justify-between gap-6">
                      <div className="min-w-0">
                        <h2 className="font-headline text-2xl lg:text-3xl font-bold mb-2">{branche.name}</h2>
                        <p className="text-blue-100/80 text-sm font-medium leading-relaxed max-w-xl hidden sm:block">
                          {branche.heroLead.split(':')[0]}.
                        </p>
                      </div>
                      <span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur grid place-items-center flex-shrink-0 transition-all duration-300 group-hover:bg-accent group-hover:translate-x-1">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ihre Branche, Ihre Anforderungen"
        lead="Erzählen Sie uns von Ihrem Objekt — wir antworten mit einem Konzept, das zu Ihrer Betriebslogik passt."
      />
    </div>
  );
}
