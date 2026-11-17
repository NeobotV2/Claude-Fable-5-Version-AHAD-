import { Phone } from 'lucide-react';
import ButtonLink from '@/components/ui/Button';
import { SITE } from '@/lib/site';

interface CTABandProps {
  title?: string;
  lead?: string;
  bullets?: string[];
}

/**
 * Abschluss am Seitenende — überall identische Logik: eine vollflächige
 * Fläche in AHAD Grün, links der nächste Schritt, rechts die zwei Wege
 * (Formular oder Telefon).
 */
export default function CTABand({
  title = 'In vier Schritten zur Objektbesichtigung.',
  lead = 'Beschreiben Sie Objekt, Leistung und Umfang. Wir melden uns persönlich zur Terminabstimmung. Das Angebot erstellen wir nach der Besichtigung.',
  bullets = ['Bedarfserfassung per Formular', 'Unverbindliche Terminabstimmung', 'Angebot nach der Besichtigung'],
}: CTABandProps) {
  return (
    <section className="bg-accent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-7">
          {/* Weiß statt Mint: Mint auf AHAD Grün erreicht nur 4,2:1 Kontrast. */}
          <p className="eyebrow text-white mb-3">Nächster Schritt</p>
          <h2 className="display-lg text-white">{title}</h2>
          <p className="mt-5 text-lg text-white/90 leading-relaxed max-w-xl">{lead}</p>
          <ol className="mt-8 pt-6 border-t border-white/25 grid sm:grid-cols-3 gap-x-6 gap-y-3">
            {bullets.map((bullet, i) => (
              <li key={bullet} className="flex gap-3 text-[15px] font-medium leading-snug">
                <span className="font-accent font-semibold text-white" aria-hidden="true">
                  {i + 1}
                </span>
                {bullet}
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5 lg:pl-8 flex flex-col gap-3">
          <ButtonLink to="/angebot" variant="white" size="lg" arrow className="w-full">
            Kostenlose Besichtigung anfragen
          </ButtonLink>
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-md border border-white/45 font-semibold hover:bg-white hover:text-navy transition-colors"
          >
            <Phone size={17} aria-hidden="true" />
            {SITE.phone}
          </a>
          <p className="text-sm text-white/85 mt-1">{SITE.hours} · Persönlich erreichbar</p>
        </div>
      </div>
    </section>
  );
}
