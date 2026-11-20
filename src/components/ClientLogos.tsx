import { useState } from 'react';
import { CLIENT_REFERENCES, type ClientReference } from '@/lib/site';
import { intrinsicSizeFor } from '@/lib/images';

/**
 * Logos der Referenzkunden als ruhiges, statisches Raster (kein Laufband).
 *
 * Zeigt nur Referenzen MIT freigegebenem Logo (Einträge ohne Logo werden
 * ausgeblendet). Alle Logos werden in eine einheitliche Box normiert
 * (gleiche Höhe, gedeckelte Breite) — so wirken unterschiedlich
 * proportionierte Logos optisch gleich groß. Logos ohne erkennbaren Schriftzug
 * bekommen ihren Kurznamen daneben.
 *
 * WICHTIG: Nur Logos von Kunden verwenden, die der Nennung zugestimmt haben.
 */
const REFERENCES = CLIENT_REFERENCES.filter((r) => r.logo);

function ClientLogo({ item }: { item: ClientReference }) {
  const [failed, setFailed] = useState(false);
  return (
    <li className="h-12 flex items-center gap-2.5 min-w-0">
      {item.logo && !failed ? (
        <>
          {/* Farbig statt grau: in Graustufen waren kleine Logos kaum zu erkennen. */}
          <img
            src={item.logo}
            alt={item.name}
            {...intrinsicSizeFor(item.logo)}
            title={item.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className={`h-full w-auto object-contain object-left ${item.caption ? 'max-w-[3.25rem]' : 'max-w-[8.5rem]'}`}
          />
          {item.caption && (
            <span aria-hidden="true" className="font-semibold text-body-sm text-navy leading-tight">
              {item.caption}
            </span>
          )}
        </>
      ) : (
        <span title={item.name} className="font-semibold text-sm text-navy/60 leading-tight">
          {item.name}
        </span>
      )}
    </li>
  );
}

export default function ClientLogos() {
  if (REFERENCES.length === 0) return null;

  return (
    <ul
      className="container-page grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-8 items-center"
      aria-label="Referenzkunden von AHAD Cleaning"
    >
      {REFERENCES.map((ref) => (
        <ClientLogo key={ref.name} item={ref} />
      ))}
    </ul>
  );
}
