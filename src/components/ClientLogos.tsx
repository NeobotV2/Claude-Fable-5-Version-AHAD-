import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { CLIENT_REFERENCES, type ClientReference } from '@/lib/site';
import { intrinsicSizeFor } from '@/lib/images';

/**
 * Logos der Referenzkunden — als Laufband (Startseite) oder als ruhiges Raster
 * (Referenzen, Unternehmen).
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

function ClientLogo({ item, inline = false }: { item: ClientReference; inline?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <li className={inline ? 'h-12 flex items-center gap-2.5 shrink-0' : 'h-12 flex items-center gap-2.5 min-w-0'}>
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
            draggable={false}
            className={`h-full w-auto object-contain object-left select-none ${item.caption ? 'max-w-[3.25rem]' : 'max-w-[8.5rem]'}`}
          />
          {item.caption && (
            <span aria-hidden="true" className="font-semibold text-body-sm text-navy leading-tight whitespace-nowrap">
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

interface ClientLogosProps {
  /** Laufband (Startseite) oder statisches Raster. */
  layout?: 'marquee' | 'grid';
}

export default function ClientLogos({ layout = 'grid' }: ClientLogosProps) {
  const [paused, setPaused] = useState(false);
  if (REFERENCES.length === 0) return null;

  if (layout === 'marquee') {
    // Zwei identische Reihen laufen nacheinander durch; die zweite ist nur die
    // optische Fortsetzung und für Vorleseprogramme ausgeblendet. Pausiert bei
    // Maus darüber, bei Tastaturfokus und per Knopf; bei „Bewegung reduzieren“
    // steht das Band still und lässt sich seitlich wischen.
    return (
      <div className="marquee" data-paused={paused ? 'true' : 'false'}>
        <div className="marquee-track" role="region" aria-label="Referenzkunden von AHAD Cleaning">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-row" aria-hidden={copy > 0 || undefined}>
              {REFERENCES.map((ref) => (
                <ClientLogo key={ref.name} item={ref} inline />
              ))}
            </ul>
          ))}
        </div>
        <div className="container-page flex justify-end mt-2 motion-reduce:hidden">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="marquee-control inline-flex items-center gap-2 py-3 text-caption font-semibold text-slate hover:text-navy transition-colors"
            aria-pressed={paused}
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? 'Logoband weiterlaufen lassen' : 'Logoband anhalten'}
          </button>
        </div>
      </div>
    );
  }

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
