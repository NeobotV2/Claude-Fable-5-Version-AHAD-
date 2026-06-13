import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Info, CheckCircle2, ArrowRight, Building, Factory, Stethoscope, Truck } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import ButtonLink from '@/components/ui/Button';
import { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import Accordion from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site';
import {
  estimate,
  eur,
  OBJEKT_TYPEN,
  FREQUENZEN,
  type ObjektTyp,
  type Frequenz,
} from '@/lib/pricing';

const TYP_ICON: Record<ObjektTyp, React.ReactNode> = {
  buero: <Building size={20} />,
  industrie: <Factory size={20} />,
  medizin: <Stethoscope size={20} />,
  gewerbe: <Truck size={20} />,
};

const faqs: FAQItem[] = [
  {
    question: 'Wie verlässlich ist der berechnete Richtpreis?',
    answer:
      'Der Rechner liefert eine Orientierungs-Spanne auf Basis branchenüblicher Leistungswerte (Flächenleistung, Reinigungsintervall, Objekttyp). Den verbindlichen Festpreis ermitteln wir nach einer kurzen Objektbesichtigung — kostenlos und unverbindlich. Erfahrungsgemäß liegt das spätere Angebot innerhalb der angezeigten Spanne.',
  },
  {
    question: 'Warum kein exakter Preis ohne Besichtigung?',
    answer:
      'Seriöse Gebäudereinigung kalkuliert nach tatsächlicher Nutzung, Verschmutzungsgrad, Bodenbelägen und Erreichbarkeit. Ein exakter Preis ohne Objektkenntnis wäre geraten — und führt später zu Nachträgen. Wir machen es transparent: Spanne jetzt, Festpreis nach der Besichtigung.',
  },
  {
    question: 'Sind Glas-, Sonder- oder Winterdienst im Richtpreis enthalten?',
    answer:
      'Nein. Der Rechner bildet die laufende Unterhaltsreinigung ab. Glas- & Fassadenreinigung, Grund-/Sonderreinigung und Winterdienst kalkulieren wir projektbezogen und weisen sie separat aus — so bleibt Ihr monatlicher Preis transparent.',
  },
  {
    question: 'Gibt es Mindestlaufzeiten oder versteckte Kosten?',
    answer:
      'Nein. Sie erhalten ein transparentes Leistungsverzeichnis mit Festpreis, ohne versteckte Nachträge, und faire Laufzeiten ohne Knebelverträge. Das ist Teil des AHAD-Versprechens.',
  },
];

const ADDONS = [
  { id: 'glas', label: 'Glas- & Fassadenreinigung' },
  { id: 'sonder', label: 'Grund- / Sonderreinigung' },
  { id: 'winter', label: 'Winterdienst & Hausmeister' },
];

export default function Kostenrechner() {
  const [objektTyp, setObjektTyp] = useState<ObjektTyp>('buero');
  const [sqm, setSqm] = useState(800);
  const [frequenz, setFrequenz] = useState<Frequenz>('twice');
  const [addons, setAddons] = useState<string[]>([]);

  const result = useMemo(() => estimate({ objektTyp, sqm, frequenz }), [objektTyp, sqm, frequenz]);
  const toggleAddon = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const inputCard = (active: boolean) =>
    cn(
      'rounded-2xl border-2 text-left transition-all duration-200 p-4',
      active ? 'border-accent bg-accent/5 shadow-[0_0_0_4px_rgb(13_107_56/0.10)]' : 'border-line bg-white hover:border-brand/40'
    );

  return (
    <div>
      <SEO
        title="Kostenrechner Gebäudereinigung — Richtpreis in 30 Sekunden | AHAD Cleaning"
        description="Was kostet Gebäudereinigung? Berechnen Sie Ihren monatlichen Richtpreis für Unterhaltsreinigung transparent nach Fläche, Objekttyp und Intervall — kostenlos und unverbindlich."
        keywords="Kostenrechner Gebäudereinigung, Gebäudereinigung Preise, Unterhaltsreinigung Kosten pro m², Reinigung Kosten berechnen, Büroreinigung Preis"
        schema={faqSchemaFrom(faqs)}
      />

      <PageHero
        compact
        eyebrow="Kostenrechner"
        title="Was kostet Ihre Reinigung? In 30 Sekunden zur Orientierung."
        lead="Transparent statt Blackbox: Berechnen Sie den monatlichen Richtpreis für Ihre Unterhaltsreinigung — nachvollziehbar, ohne Anruf, ohne Verpflichtung."
        crumbs={[{ label: 'Kostenrechner' }]}
      />

      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Eingaben */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line shadow-soft p-6 sm:p-8 space-y-8">
            {/* Objekttyp */}
            <div>
              <label className="block text-sm font-bold text-navy mb-3">1. Um welches Objekt geht es?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OBJEKT_TYPEN.map((t) => (
                  <button key={t.id} onClick={() => setObjektTyp(t.id)} className={inputCard(objektTyp === t.id)}>
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          'w-10 h-10 rounded-xl grid place-items-center flex-shrink-0 transition-colors',
                          objektTyp === t.id ? 'bg-accent text-white' : 'bg-paper text-brand'
                        )}
                      >
                        {TYP_ICON[t.id]}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-bold text-navy">{t.label}</span>
                        <span className="block text-xs text-slate">{t.hint}</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fläche */}
            <div>
              <label htmlFor="sqm" className="flex items-center justify-between text-sm font-bold text-navy mb-3">
                <span>2. Wie groß ist die Reinigungsfläche?</span>
                <span className="font-accent text-brand text-lg tabular-nums">{sqm.toLocaleString('de-DE')} m²</span>
              </label>
              <input
                id="sqm"
                type="range"
                min={50}
                max={10000}
                step={50}
                value={sqm}
                onChange={(e) => setSqm(Number(e.target.value))}
                className="w-full accent-[#0D6B38]"
              />
              <div className="flex justify-between text-[11px] text-slate/70 mt-1.5">
                <span>50 m²</span>
                <span>10.000 m²</span>
              </div>
            </div>

            {/* Frequenz */}
            <div>
              <label className="block text-sm font-bold text-navy mb-3">3. Wie oft soll gereinigt werden?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FREQUENZEN.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrequenz(f.id)}
                    className={cn(
                      'rounded-xl border-2 py-3 px-2 text-sm font-bold text-center transition-all',
                      frequenz === f.id ? 'border-accent bg-accent/5 text-navy' : 'border-line bg-white text-slate hover:border-brand/40'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Zusatzleistungen (Kontext, projektbezogen) */}
            <div>
              <label className="block text-sm font-bold text-navy mb-3">
                4. Zusätzlich gewünscht? <span className="font-medium text-slate/70">(optional, projektbezogen)</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {ADDONS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[13px] font-semibold transition-all',
                      addons.includes(a.id) ? 'border-accent bg-accent/5 text-navy' : 'border-line text-slate hover:border-brand/40'
                    )}
                  >
                    <CheckCircle2 size={14} className={addons.includes(a.id) ? 'text-accent' : 'text-slate/40'} />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ergebnis */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="relative bg-navy text-white rounded-3xl overflow-hidden grain shadow-lifted p-7 sm:p-8">
                <div className="absolute inset-0 blueprint-grid" />
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/25 blur-[90px]" />
                <div className="relative z-10">
                  <span className="eyebrow text-mint mb-4">
                    <Calculator size={13} />
                    Ihr Richtpreis · Unterhaltsreinigung
                  </span>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-accent text-4xl sm:text-5xl font-bold tabular-nums">{eur(result.monthlyLow)}</span>
                    <span className="text-blue-100/70 text-xl font-bold">–</span>
                    <span className="font-accent text-4xl sm:text-5xl font-bold tabular-nums">{eur(result.monthlyHigh)}</span>
                  </div>
                  <p className="text-blue-100/70 text-sm font-medium mb-6">pro Monat · netto, zzgl. MwSt.</p>

                  {/* Sichtbare Annahmen — schafft Vertrauen */}
                  <div className="space-y-2 text-[13px] text-blue-100/85 border-t border-white/10 pt-5">
                    <div className="flex justify-between gap-4">
                      <span>Reinigungen / Monat</span>
                      <span className="font-bold text-white tabular-nums">≈ {Math.round(result.cleaningsPerMonth)}×</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Rechenbasis</span>
                      <span className="font-bold text-white tabular-nums">
                        {result.perSqmLow.toFixed(2).replace('.', ',')}–{result.perSqmHigh.toFixed(2).replace('.', ',')} €/m²
                      </span>
                    </div>
                    {addons.length > 0 && (
                      <div className="flex justify-between gap-4">
                        <span>Zusatzleistungen</span>
                        <span className="font-bold text-mint">projektbezogen</span>
                      </div>
                    )}
                  </div>

                  <ButtonLink to="/angebot" size="lg" arrow className="w-full mt-7">
                    Verbindlichen Festpreis anfordern
                  </ButtonLink>
                  <p className="text-center text-[12px] text-blue-100/60 mt-3">
                    Objektbesichtigung in 48h · Angebot in 24h danach
                  </p>
                </div>
              </div>

              {/* Disclaimer — Ehrlichkeit */}
              <div className="flex gap-3 bg-white border border-line rounded-2xl p-4">
                <Info size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-slate leading-relaxed">
                  <strong className="text-navy">Unverbindliche Orientierung, kein Angebot.</strong> Der reale Aufwand
                  hängt von Nutzung, Verschmutzung, Bodenbelägen und Erreichbarkeit ab. Den belastbaren Festpreis
                  nennen wir nach einer kurzen Objektbesichtigung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertrauensbrücke */}
      <section className="py-12 bg-white border-y border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            'Transparentes Leistungsverzeichnis',
            'Festpreis ohne versteckte Nachträge',
            'Faire Laufzeiten statt Knebelverträge',
          ].map((t) => (
            <div key={t} className="flex items-center justify-center gap-2.5 text-sm font-semibold text-navy">
              <CheckCircle2 size={17} className="text-accent flex-shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-brand justify-center mb-4">
              <span className="h-px w-8 bg-brand/40" />
              Häufige Fragen zum Preis
            </span>
            <h2 className="display-md text-navy">Was Sie zum Preis wissen sollten</h2>
          </div>
          <Accordion items={faqs} />
          <Reveal delay={0.2} className="mt-8 text-center">
            <Link to="/leistungen/unterhaltsreinigung" className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-light transition-colors">
              Mehr zur Unterhaltsreinigung <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Vom Richtpreis zum Festpreis"
        lead={`Lassen Sie uns Ihr Objekt besichtigen — kostenlos, in 48 Stunden. Den verbindlichen Preis erhalten Sie 24 Stunden danach. Oder rufen Sie direkt an: ${SITE.phone}.`}
      />
    </div>
  );
}
