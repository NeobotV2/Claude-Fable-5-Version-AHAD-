import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
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
        description="Reinigungskonzepte nach Branche: Industrie & Produktion, Medizintechnik, Büro & Verwaltung, Gewerbeobjekte und Hotellerie in Süddeutschland."
        keywords="Gebäudereinigung Branchen, Industriereinigung, Büroreinigung, Hotelreinigung, Reinigung Medizintechnik"
      />

      <PageHero
        eyebrow="Branchen"
        title="Gebäudereinigung nach Branche: jede mit eigenen Anforderungen."
        lead="Schichtbetrieb, Hygienezonen, Publikumsverkehr oder Abnahmetermine: Wir kennen die kritischen Punkte Ihrer Branche und planen die Reinigung danach."
        image={IMG.brancheIndustrie}
        crumbs={[{ label: 'Branchen' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading eyebrow="Fünf Branchen" title="In diesen Branchen arbeiten wir." className="mb-10" />
          <ul className="border-t border-navy">
            {BRANCHEN.map((branche) => (
              <li key={branche.slug} className="border-b border-line">
                <Link
                  to={branche.path}
                  className="group grid grid-cols-1 sm:grid-cols-[15rem_1fr_auto] items-center gap-x-10 gap-y-4 py-6"
                >
                  <SmartImage
                    src={branche.image}
                    alt={branche.name}
                    sizes="(min-width:640px) 240px, 100vw"
                    className="aspect-[3/2]"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-accent mb-1">{branche.claim}</p>
                    <h2 className="text-2xl font-bold text-navy group-hover:text-accent transition-colors">
                      {branche.name}
                    </h2>
                    <p className="mt-2 text-slate leading-relaxed max-w-2xl">{branche.heroLead.split(':')[0]}.</p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="hidden sm:block flex-shrink-0 text-navy/40 group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        title="Reinigungskonzept für Ihr Objekt"
        lead="Beschreiben Sie uns Ihr Objekt und Ihre Abläufe. Wir schlagen Ihnen ein passendes Konzept vor."
      />
    </div>
  );
}
