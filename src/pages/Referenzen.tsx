import { useState } from 'react';
import { Building2, Quote } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import CTABand from '@/components/CTABand';
import { IMG } from '@/lib/images';
import { CLIENT_REFERENCES, TESTIMONIALS } from '@/lib/site';

function ReferenceLogo({ name, domain, logoUrl }: { name: string; domain: string; logoUrl?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <Building2 className="w-8 h-8 text-gray-300" aria-label={name} />;

  return (
    <img
      src={logoUrl || `https://logo.clearbit.com/${domain}`}
      alt={`${name} Logo`}
      className="max-w-full max-h-full object-contain"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (!target.src.includes('google.com')) {
          target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

export default function Referenzen() {
  return (
    <div>
      <SEO
        title="Referenzen: Kunden, die uns vertrauen | AHAD Cleaning"
        description="Von Allianz über GOLDBECK bis zur Bundesagentur für Arbeit: Diese Unternehmen vertrauen auf die Gebäudereinigung von AHAD Cleaning."
        keywords="Referenzen Gebäudereinigung, Kunden AHAD Cleaning, Reinigungsfirma Referenzen"
      />

      <PageHero
        eyebrow="Referenzen"
        title={
          <>
            Vertrauen wird
            <br />
            verdient. Täglich.
          </>
        }
        lead="Konzerne, Mittelstand und öffentliche Hand: Diese Unternehmen verlassen sich Tag für Tag auf unsere Arbeit — und wir auf die Verantwortung, die das bedeutet."
        image={IMG.handshake}
        crumbs={[{ label: 'Referenzen' }]}
        cta={{ label: 'Referenzkunde werden', to: '/angebot' }}
      />

      {/* Logo-Wall */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Unsere Kunden"
            title="Unternehmen, die nicht mehr nachfassen müssen."
            lead="Vom regionalen Mittelständler bis zum internationalen Konzern — maßgeschneiderte Reinigungskonzepte für jeden Anspruch."
            className="mb-14"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {CLIENT_REFERENCES.map((ref, index) => (
              <Reveal key={ref.domain} delay={Math.min(index * 0.05, 0.3)} className="h-full">
                <a
                  href={`https://${ref.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${ref.name} besuchen`}
                  className="group flex flex-col items-center justify-center text-center gap-4 bg-paper hover:bg-white rounded-3xl border border-line p-8 aspect-square card-lift"
                >
                  <span className="w-20 h-20 bg-white rounded-2xl shadow-soft grid place-items-center p-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <ReferenceLogo name={ref.name} domain={ref.domain} logoUrl={ref.logoUrl} />
                  </span>
                  <span className="font-headline font-bold text-navy text-sm md:text-[15px] leading-snug">{ref.name}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stimmen */}
      <section className="py-20 lg:py-28 bg-paper border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading eyebrow="Stimmen" title="Was Verantwortliche berichten." align="center" className="mb-14 max-w-2xl mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full">
                <figure className="relative h-full bg-white rounded-3xl p-8 border border-line card-lift flex flex-col">
                  <Quote className="w-9 h-9 text-brand/15 mb-5" aria-hidden />
                  <blockquote className="text-navy font-medium leading-relaxed text-[15.5px] flex-grow">
                    „{testimonial.quote}“
                  </blockquote>
                  <figcaption className="mt-7 pt-6 border-t border-line">
                    <div className="font-bold text-navy text-sm">{testimonial.name}</div>
                    <div className="text-[13px] text-slate mt-0.5">{testimonial.company}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Werden Sie unsere nächste Referenz"
        lead="Lassen Sie uns gemeinsam ein Reinigungskonzept entwickeln, das Sie weiterempfehlen werden."
      />
    </div>
  );
}
