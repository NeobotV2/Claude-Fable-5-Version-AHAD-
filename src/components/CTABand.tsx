import { Phone, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import ButtonLink from '@/components/ui/Button';
import { SITE } from '@/lib/site';

interface CTABandProps {
  title?: string;
  lead?: string;
  bullets?: string[];
}

/** Conversion-Band am Seitenende — überall identische Abschlusslogik. */
export default function CTABand({
  title = 'Ihr Angebot in 24 Stunden.',
  lead = 'Beantworten Sie vier kurze Fragen — wir melden uns innerhalb von 24 Stunden mit einer belastbaren Ersteinschätzung.',
  bullets = ['Antwort innerhalb von 24h', 'Objektbesichtigung in 48h möglich', '100% unverbindlich & kostenfrei'],
}: CTABandProps) {
  return (
    <section className="py-20 lg:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="relative bg-navy text-white rounded-[2.5rem] overflow-hidden grain shadow-lifted">
            <div className="absolute inset-0 blueprint-grid" />
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand/40 blur-[120px]" />
            <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-accent/25 blur-[120px]" />

            <div className="relative z-10 px-6 py-14 sm:p-14 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="eyebrow text-mint mb-5">
                  <span className="h-px w-8 bg-mint/50" />
                  Nächster Schritt
                </span>
                <h2 className="display-lg text-white mb-5">{title}</h2>
                <p className="text-lg text-blue-100/85 font-medium max-w-xl">{lead}</p>
                <ul className="mt-8 space-y-3">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 font-semibold text-blue-50">
                      <CheckCircle2 className="w-5 h-5 text-mint flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <ButtonLink to="/angebot" size="lg" arrow className="w-full">
                  Angebot in 24h anfordern
                </ButtonLink>
                <a
                  href={SITE.phoneHref}
                  className="group flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl border-2 border-white/20 hover:border-white/45 hover:bg-white/5 transition-all font-bold"
                >
                  <span className="w-9 h-9 rounded-full bg-accent grid place-items-center group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </span>
                  {SITE.phone}
                </a>
                <p className="text-center text-sm text-blue-100/80 font-medium">{SITE.hours} · Persönlich erreichbar</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
