import { useState } from 'react';
import { CLIENT_REFERENCES, type ClientReference } from '@/lib/site';

/**
 * Endlos-Band der Referenzkunden.
 *
 * Zeigt das echte Logo (lokal unter /images/clients/, einheitliche Höhe,
 * dezent in Graustufen, bei Hover farbig). Ist kein Logo hinterlegt — oder
 * lädt es nicht — wird automatisch auf die Wortmarke (Name als Text)
 * zurückgegriffen. So lassen sich freigegebene Logos nach und nach ergänzen,
 * ohne dass das Band je „kaputt" aussieht.
 *
 * WICHTIG: Nur Logos von Kunden verwenden, die der Nennung zugestimmt haben.
 */
function ClientLogo({ item }: { item: ClientReference }) {
  const [failed, setFailed] = useState(false);

  if (item.logo && !failed) {
    return (
      <img
        src={item.logo}
        alt={item.name}
        title={item.name}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-7 sm:h-9 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none"
      />
    );
  }

  return (
    <span
      title={item.name}
      className="font-headline font-bold text-lg sm:text-xl tracking-tight text-navy/40 hover:text-navy transition-colors whitespace-nowrap select-none"
    >
      {item.name}
    </span>
  );
}

export default function LogoMarquee() {
  return (
    <div className="flex overflow-hidden marquee-container mask-fade-x" aria-label="Referenzkunden von AHAD Cleaning">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex animate-marquee whitespace-nowrap shrink-0 gap-10 sm:gap-14 px-5 sm:px-7 items-center py-4"
          aria-hidden={i > 0}
        >
          {CLIENT_REFERENCES.map((ref, index) => (
            <ClientLogo key={`${i}-${index}`} item={ref} />
          ))}
        </div>
      ))}
    </div>
  );
}
