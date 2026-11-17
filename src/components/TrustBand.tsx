import { TRUST_BADGES } from '@/lib/site';

/**
 * Schlanke Zeile direkt unter der Zahlenleiste: belegbare Vertrauenssignale
 * als reiner Text, im selben Vier-Spalten-Raster wie die Zahlen darüber.
 * Google-Wertung, Mitarbeiterzahl und Jahre am Markt stehen bereits im Hero
 * und in der Zahlenleiste — hier nicht ein zweites Mal.
 */
export default function TrustBand() {
  if (TRUST_BADGES.length === 0) return null;

  return (
    <section className="bg-white border-b border-line" aria-label="Zertifikate und Absicherung">
      <ul className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-line">
        {TRUST_BADGES.map((b) => (
          <li key={b.label} className="py-5 pr-4 lg:px-8 lg:first:pl-0">
            <span className="block text-[15px] font-semibold text-navy leading-snug">{b.label}</span>
            <span className="block text-[13px] text-slate mt-0.5">{b.sub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
