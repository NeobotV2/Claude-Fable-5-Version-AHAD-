import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import CTABand from '@/components/CTABand';
import Reviews from '@/components/Reviews';
import FeaturedTestimonial from '@/components/FeaturedTestimonial';
import { IMG } from '@/lib/images';
import { CLIENT_REFERENCES } from '@/lib/site';

export default function Referenzen() {
  return (
    <div>
      <SEO
        title="Kundenstimmen & Referenzen | AHAD Cleaning"
        description="Erfahrungen mit den Gebäudedienstleistungen von AHAD Cleaning. Namentliche Referenzen veröffentlichen wir nur mit dokumentierter Freigabe."
        keywords="Referenzen Gebäudereinigung, Auftraggeber AHAD Cleaning, Reinigungsfirma Referenzen Süddeutschland"
      />

      <PageHero
        eyebrow="Referenzen"
        title={
          <>
            <span className="block">Vertrauen wird verdient.{' '}</span>
            <span className="block">Täglich.</span>
          </>
        }
        lead="Erfahrungen aus der Zusammenarbeit geben Orientierung. Namentliche Referenzen und Logos zeigen wir nur mit dokumentierter Freigabe."
        image={IMG.handshake}
        crumbs={[{ label: 'Referenzen' }]}
        cta={{ label: 'Referenzkunde werden', to: '/angebot' }}
      />

      {/* Referenz-Wand — echte Kundenlogos, einheitlich normiert (nur mit Logo) */}
      {CLIENT_REFERENCES.length > 0 && <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            eyebrow="Auswahl betreuter Auftraggeber"
            title="Auftraggeber, die nicht mehr nachfassen müssen."
            lead="Vom regionalen Mittelständler bis zum internationalen Konzern — maßgeschneiderte Reinigungskonzepte für jeden Anspruch."
            className="mb-14"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {CLIENT_REFERENCES.filter((ref) => ref.logo).map((ref, index) => (
              <Reveal key={ref.domain} delay={Math.min(index * 0.05, 0.3)} className="h-full">
                <div className="flex items-center justify-center h-full min-h-[8rem] bg-paper rounded-3xl border border-line p-7 card-lift">
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    title={ref.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-14 max-w-[78%] object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>}

      {/* Hervorgehobene, echte Kundenstimme (namentlich, mit Freigabe) */}
      <FeaturedTestimonial />

      {/* Echte Google-Bewertungen statt anonymer Zitate */}
      <Reviews />

      <CTABand
        title="Werden Sie unsere nächste Referenz"
        lead="Lassen Sie uns gemeinsam ein Reinigungskonzept entwickeln, das Sie weiterempfehlen werden."
      />
    </div>
  );
}
