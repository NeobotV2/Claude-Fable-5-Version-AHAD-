import SectionHeading from '@/components/ui/SectionHeading';
import { GUARANTEES, PROOF_POINTS, OBJEKTLEITUNG } from '@/lib/site';

/**
 * Das AHAD-Versprechen: benannte Risikoumkehr (Nachbesserung, Festpreis,
 * faire Laufzeit) + operative Eckwerte + die Objektleitung.
 *
 * Gesetzt wie eine Vertragsübersicht: Eckwerte als Zahlenzeile, Zusagen als
 * Tabelle mit Haarlinien. Keine Karten, keine Icons.
 */
export default function Guarantee() {
  // Fail-closed konsistent zu Ende gedacht: Solange die Zusagen im
  // Claim-Register nicht freigegeben sind (GUARANTEES leer), darf auch die
  // Überschrift „Vier Zusagen …" nicht stehen — sonst verspricht die Sektion
  // Inhalte, die darunter fehlen (leeres Loch im Layout).
  if (GUARANTEES.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeading
          eyebrow="Das AHAD-Versprechen"
          title="Vier Zusagen, auf die Sie sich berufen können."
          lead="Wenn etwas nicht stimmt, bessern wir kostenfrei nach."
          className="max-w-3xl mb-12"
        />

        {/* Eckwerte (eigenständig gegated — nur rendern, wenn freigegeben) */}
        {PROOF_POINTS.length > 0 && (
          <ul className="grid grid-cols-2 lg:grid-cols-4 border-y border-line lg:divide-x divide-line mb-14">
            {PROOF_POINTS.map((p) => (
              <li key={p.label} className="py-7 pr-4 lg:px-8 lg:first:pl-0">
                <span className="block font-accent text-4xl lg:text-[2.75rem] leading-none font-semibold tracking-tight text-navy">
                  {p.value}
                </span>
                <span className="block text-[15px] font-semibold text-navy mt-3">{p.label}</span>
                <span className="block text-[13px] text-slate mt-0.5">{p.sub}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Die Zusagen im Wortlaut */}
          <dl className="lg:col-span-8 border-t border-navy">
            {GUARANTEES.map((g) => (
              <div key={g.title} className="grid sm:grid-cols-[13rem_1fr] gap-x-8 gap-y-1 py-5 border-b border-line">
                <dt className="font-semibold text-lg text-navy">{g.title}</dt>
                <dd className="text-slate leading-relaxed">{g.promise}</dd>
              </div>
            ))}
          </dl>

          {/* Objektleitung */}
          <figure className="lg:col-span-4 self-start border-l-2 border-accent pl-6">
            <blockquote className="text-lg font-medium text-navy leading-relaxed">„{OBJEKTLEITUNG.quote}“</blockquote>
            <figcaption className="mt-5 flex items-center gap-4">
              {OBJEKTLEITUNG.photo && (
                <img
                  src={OBJEKTLEITUNG.photo}
                  alt={OBJEKTLEITUNG.name}
                  className="w-14 h-14 object-cover"
                  loading="lazy"
                />
              )}
              <span className="text-[15px]">
                <span className="block font-semibold text-navy">{OBJEKTLEITUNG.name}</span>
                <span className="block text-slate">{OBJEKTLEITUNG.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
