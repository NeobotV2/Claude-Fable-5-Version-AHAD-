import { useState } from 'react';
import { CLIENT_REFERENCES, type ClientReference } from '@/lib/site';

/**
 * Endlos-Band der Referenzkunden.
 *
 * Zeigt nur Referenzen MIT freigegebenem Logo (Einträge ohne Logo werden
 * ausgeblendet). Alle Logos werden in eine einheitliche Box normiert
 * (gleiche Höhe, gedeckelte Breite, zentriert) — so wirken unterschiedlich
 * proportionierte Logos optisch gleich groß. Dezent in Graustufen, bei Hover
 * farbig.
 *
 * WICHTIG: Nur Logos von Kunden verwenden, die der Nennung zugestimmt haben.
 */
const REFERENCES = CLIENT_REFERENCES.filter((r) => r.logo);

function ClientLogo({ item }: { item: ClientReference }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="h-10 sm:h-12 w-28 sm:w-36 flex items-center justify-center shrink-0">
      {item.logo && !failed ? (
        <img
          src={item.logo}
          alt={item.name}
          title={item.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none"
        />
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
  return (
    <div className="flex overflow-hidden marquee-container mask-fade-x" aria-label="Referenzkunden von AHAD Cleaning">
      {[0, 1, 2].map((i) => (
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
  );
}
