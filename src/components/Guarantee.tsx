import SectionHeading from '@/components/ui/SectionHeading';
import FactRow from '@/components/ui/FactRow';
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
  // Überschrift „Drei Zusagen …" nicht stehen — sonst verspricht die Sektion
  // Inhalte, die darunter fehlen (leeres Loch im Layout).
  if (GUARANTEES.length === 0) return null;

  return (
    <section className="section-y bg-white border-t border-line">
      <div className="container-page">
        <SectionHeading
          eyebrow="Das AHAD-Versprechen"
          title="Drei Zusagen, auf die Sie sich berufen können."
          lead="Wenn etwas nicht stimmt, bessern wir kostenfrei nach."
          className="max-w-3xl mb-12"
        />

        {/* Eckwerte (eigenständig gegated — nur rendern, wenn freigegeben) */}
        {PROOF_POINTS.length > 0 && <FactRow framed items={PROOF_POINTS} className="mb-14" />}

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
                  width={56}
                  height={56}
                  className="w-14 h-14 object-cover"
                  loading="lazy"
                />
              )}
              <span className="text-body-sm">
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
