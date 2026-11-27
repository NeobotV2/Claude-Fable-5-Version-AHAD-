import { TRUST_BADGES } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Belegbare Vertrauenssignale (Zertifikate, Absicherung) als reiner Text, im
 * selben Vier-Spalten-Raster wie die Zahlenleiste. Google-Wertung,
 * Mitarbeiterzahl und Jahre am Markt stehen bereits im Hero und in der
 * Zahlenleiste — hier nicht ein zweites Mal.
 *
 * `embedded`: unter der Zahlenleiste in derselben dunklen Fläche (Startseite),
 * sonst als eigene helle Zeile.
 */
export default function TrustBand({ embedded = false }: { embedded?: boolean }) {
  if (TRUST_BADGES.length === 0) return null;

  const list = (
    <ul
      className={cn(
        'container-page grid grid-cols-2 lg:grid-cols-4 lg:divide-x',
        embedded ? 'border-t border-white/15 divide-white/15' : 'divide-line',
      )}
      aria-label={embedded ? 'Zertifikate und Absicherung' : undefined}
    >
      {TRUST_BADGES.map((b) => (
        <li key={b.label} className="py-5 pr-4 lg:px-8 lg:first:pl-0">
          <span className={cn('block text-body-sm font-semibold leading-snug', embedded ? 'text-white' : 'text-navy')}>
            {b.label}
          </span>
          <span className={cn('block text-caption mt-0.5', embedded ? 'text-ondark/80' : 'text-slate')}>{b.sub}</span>
        </li>
      ))}
    </ul>
  );

  if (embedded) return list;

  return (
    <section className="bg-white border-b border-line" aria-label="Zertifikate und Absicherung">
      {list}
    </section>
  );
}
