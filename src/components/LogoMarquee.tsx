import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { CLIENT_REFERENCES, type ClientReference } from '@/lib/site';

/**
 * Endlos-Band der Referenzkunden mit einer für die Schleife nötigen Kopie.
 *
 * Zeigt nur Referenzen MIT freigegebenem Logo (Einträge ohne Logo werden
 * ausgeblendet). Alle Logos werden in eine einheitliche Box normiert
 * (gleiche Höhe, gedeckelte Breite, zentriert) — so wirken unterschiedlich
 * proportionierte Logos optisch gleich groß. Logos ohne erkennbaren Schriftzug
 * bekommen ihren Kurznamen daneben.
 *
 * WICHTIG: Nur Logos von Kunden verwenden, die der Nennung zugestimmt haben.
 */
const REFERENCES = CLIENT_REFERENCES.filter((r) => r.logo);

function ClientLogo({ item }: { item: ClientReference }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="h-12 sm:h-14 min-w-[8rem] sm:min-w-[10rem] flex items-center justify-center gap-2.5 shrink-0">
      {item.logo && !failed ? (
        <>
          {/* Farbig statt grau: in Graustufen waren kleine Logos kaum zu erkennen. */}
          <img
            src={item.logo}
            alt={item.name}
            title={item.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className={`h-full object-contain select-none ${item.caption ? 'max-w-[3.5rem]' : 'max-w-[10rem]'}`}
          />
          {item.caption && (
            <span aria-hidden="true" className="font-headline font-bold text-[15px] text-navy whitespace-nowrap select-none">
              {item.caption}
            </span>
          )}
        </>
      ) : (
        <span
          title={item.name}
          className="font-headline font-bold text-sm tracking-tight text-navy/40 text-center leading-tight select-none"
        >
          {item.name}
        </span>
      )}
    </div>
  );
}

export default function LogoMarquee() {
  const [paused, setPaused] = useState(false);

  if (REFERENCES.length === 0) return null;

  return (
    <div className="relative marquee-shell">
      <div
        className="flex overflow-hidden marquee-container mask-fade-x pr-12"
        role="region"
        aria-label="Referenzkunden von AHAD Cleaning"
        data-paused={paused ? 'true' : 'false'}
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex animate-marquee whitespace-nowrap shrink-0 gap-8 sm:gap-12 px-4 sm:px-6 items-center py-4"
            aria-hidden={i > 0}
          >
            {REFERENCES.map((ref, index) => (
              <ClientLogo key={`${i}-${index}`} item={ref} />
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className="marquee-control absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-navy border border-line shadow-soft grid place-items-center hover:bg-paper"
        aria-pressed={paused}
        aria-label={paused ? 'Logoband weiterlaufen lassen' : 'Logoband pausieren'}
      >
        {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
      </button>
    </div>
  );
}
