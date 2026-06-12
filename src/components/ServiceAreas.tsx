import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const areas = [
  { name: 'Villingen-Schwenningen', path: '/standorte/villingen-schwenningen', region: 'Zentrale · Schwarzwald-Baar-Kreis' },
  { name: 'Stuttgart', path: '/standorte/stuttgart', region: 'Landeshauptstadt & Umland' },
  { name: 'Konstanz', path: '/standorte/konstanz', region: 'Bodenseeregion' },
  { name: 'Süddeutschland', path: '/standorte', region: 'Überregionaler Service' },
];

export default function ServiceAreas() {
  return (
    <section className="py-20 lg:py-28 bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Einsatzgebiete"
          title="Regional verwurzelt, überregional im Einsatz."
          lead="Profitieren Sie von kurzen Wegen, regionalen Teams und garantierten Reaktionszeiten."
          align="center"
          className="mb-14 max-w-2xl mx-auto"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {areas.map((area, i) => (
            <Reveal key={area.name} delay={i * 0.08} className="h-full">
              <Link
                to={area.path}
                className="group flex flex-col h-full bg-white p-7 rounded-3xl border border-line card-lift"
              >
                <div className="w-12 h-12 bg-brand/8 text-brand rounded-xl grid place-items-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                  <MapPin className="w-5.5 h-5.5" size={22} />
                </div>
                <h3 className="font-headline font-bold text-navy text-lg mb-1">{area.name}</h3>
                <p className="text-[13px] text-slate mb-5 flex-grow">{area.region}</p>
                <span className="flex items-center text-brand font-bold text-sm">
                  Details ansehen
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
