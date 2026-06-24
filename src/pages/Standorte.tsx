import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import { SITE } from '@/lib/site';

const standorte = [
  {
    name: 'Villingen-Schwenningen',
    path: '/standorte/villingen-schwenningen',
    region: 'Zentrale · Schwarzwald-Baar-Kreis',
    description:
      'Unsere Zentrale: Von hier steuern wir Einsatzplanung, Qualitätssicherung und die Betreuung des Schwarzwald-Baar-Kreises.',
    image: IMG.heroArchitecture,
    badge: 'Hauptsitz',
  },
  {
    name: 'Stuttgart',
    path: '/standorte/stuttgart',
    region: 'Landeshauptstadt & Umland',
    description:
      'Gebäude- und Industriereinigung für die Metropolregion Stuttgart — von Bürotürmen bis Produktionsstandorten.',
    image: IMG.stuttgart,
    badge: 'Metropolregion',
  },
  {
    name: 'Konstanz',
    path: '/standorte/konstanz',
    region: 'Bodenseeregion',
    description:
      'Zuverlässige Objektbetreuung rund um den Bodensee — für Gewerbe, Hotellerie und öffentliche Auftraggeber.',
    image: IMG.bodensee,
    badge: 'Bodensee',
  },
];

const einzugsgebiete = [
  'Villingen-Schwenningen', 'Stuttgart', 'Konstanz', 'Rottweil', 'Tuttlingen', 'Donaueschingen',
  'Bad Dürrheim', 'Singen', 'Freiburg', 'Offenburg', 'Balingen', 'Sindelfingen',
];

export default function Standorte() {
  return (
    <div>
      <SEO
        title="Standorte & Einsatzgebiete in Süddeutschland | AHAD Cleaning"
        description="AHAD Cleaning ist mit Standorten in Villingen-Schwenningen, Stuttgart und Konstanz in ganz Süddeutschland für Sie im Einsatz — mit schnellen Reaktionszeiten."
        keywords="Gebäudereinigung Standorte, Reinigungsfirma Villingen-Schwenningen, Gebäudereinigung Stuttgart, Reinigung Konstanz"
      />

      <PageHero
        eyebrow="Standorte & Regionen"
        title={
          <>
            Nah genug für
            <br />
            24h-Reaktionszeit.
          </>
        }
        lead="Drei Standorte, ein Qualitätssystem: Wir betreuen Objekte in ganz Süddeutschland — mit regionalen Teams, kurzen Wegen und einer festen Objektleitung vor Ort."
        image={IMG.schwarzwald}
        crumbs={[{ label: 'Standorte' }]}
        cta={{ label: 'Kostenlose Besichtigung anfragen', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Standort-Karten */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standorte.map((standort, i) => (
              <Reveal key={standort.name} delay={i * 0.1} className="h-full">
                <Link
                  to={standort.path}
                  className="group flex flex-col h-full bg-paper rounded-3xl border border-line overflow-hidden card-lift"
                >
                  <div className="relative">
                    <SmartImage
                      src={standort.image}
                      alt={`AHAD Cleaning Standort ${standort.name}`}
                      className="aspect-[16/10]"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur text-mint text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                      {standort.badge}
                    </span>
                  </div>
                  <div className="flex flex-col flex-grow p-7">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-brand uppercase tracking-wider mb-2">
                      <MapPin size={13} />
                      {standort.region}
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-navy mb-3">{standort.name}</h2>
                    <p className="text-sm text-slate leading-relaxed flex-grow">{standort.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand group-hover:text-brand-light transition-colors">
                      Standort ansehen
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Einzugsgebiet + Kontakt */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading
              eyebrow="Einzugsgebiet"
              title="Im Einsatz in ganz Süddeutschland."
              lead="Auch außerhalb unserer Standorte betreuen wir Objekte zuverlässig — fragen Sie uns einfach an, wir prüfen jede Region."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {einzugsgebiete.map((stadt) => (
                  <span
                    key={stadt}
                    className="text-[13px] font-semibold bg-white border border-line px-4 py-2 rounded-full text-navy"
                  >
                    {stadt}
                  </span>
                ))}
                <span className="text-[13px] font-bold bg-navy text-mint px-4 py-2 rounded-full">+ Umgebung</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="bg-navy text-white rounded-3xl p-8 lg:p-10 grain relative overflow-hidden shadow-lifted">
              <div className="absolute inset-0 blueprint-grid" />
              <div className="relative z-10">
                <h3 className="font-headline text-2xl font-bold mb-6">Zentrale Villingen-Schwenningen</h3>
                <ul className="space-y-4 text-blue-100/85">
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                    <span>
                      {SITE.address.street}
                      <br />
                      {SITE.address.zip} {SITE.address.city}
                    </span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Phone className="w-5 h-5 text-mint flex-shrink-0" />
                    <a href={SITE.phoneHref} className="font-bold text-white hover:text-mint transition-colors">
                      {SITE.phone}
                    </a>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Clock className="w-5 h-5 text-mint flex-shrink-0" />
                    {SITE.hours}
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt liegt in unserer Region?"
        lead="Dann sichern Sie sich jetzt Besichtigung in 48h und Angebot in 24h — unverbindlich und kostenfrei."
      />
    </div>
  );
}
