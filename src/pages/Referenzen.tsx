import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import CTABand from '@/components/CTABand';
import Reviews from '@/components/Reviews';
import { IMG } from '@/lib/images';
import { CLIENT_REFERENCES } from '@/lib/site';

export default function Referenzen() {
  return (
    <div>
      <SEO
        title="Referenzen: Auftraggeber, die uns vertrauen | AHAD Cleaning"
        description="Konzerne, Mittelstand und öffentliche Hand in Süddeutschland setzen auf die Gebäudereinigung von AHAD Cleaning — mit fester Objektleitung und dokumentierter Qualität."
        keywords="Referenzen Gebäudereinigung, Auftraggeber AHAD Cleaning, Reinigungsfirma Referenzen Süddeutschland"
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
        lead="Konzerne, Mittelstand und öffentliche Hand: Diese Auftraggeber verlassen sich Tag für Tag auf unsere Arbeit — und wir auf die Verantwortung, die das bedeutet."
        image={IMG.handshake}
        crumbs={[{ label: 'Referenzen' }]}
        cta={{ label: 'Referenzkunde werden', to: '/angebot' }}
      />

      {/* Referenz-Wand — echte Kundenlogos, einheitlich normiert (nur mit Logo) */}
      <section className="py-20 lg:py-32 bg-white">
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
      </section>

      {/* Echte Google-Bewertungen statt anonymer Zitate */}
      <Reviews />

      <CTABand
        title="Werden Sie unsere nächste Referenz"
        lead="Lassen Sie uns gemeinsam ein Reinigungskonzept entwickeln, das Sie weiterempfehlen werden."
      />
    </div>
  );
}
