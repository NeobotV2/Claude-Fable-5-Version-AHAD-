import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Building,
  Factory,
  Stethoscope,
  Truck,
  ConciergeBell,
  CheckCircle2,
  ArrowRight,
  Printer,
  Info,
  ChevronDown,
} from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import Accordion, { faqSchemaFrom, type FAQItem } from '@/components/ui/Accordion';
import CTABand from '@/components/CTABand';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/site';
import { estimate, eur, OBJEKT_TYPEN, FREQUENZEN, type ObjektTyp, type Frequenz } from '@/lib/pricing';
import { saveBedarfsprofil } from '@/lib/bedarfsprofil';

const TYP_ICON: Record<ObjektTyp, React.ReactNode> = {
  buero: <Building size={20} />,
  industrie: <Factory size={20} />,
  medizin: <Stethoscope size={20} />,
  gewerbe: <Truck size={20} />,
  hotellerie: <ConciergeBell size={20} />,
};

/** LV-Leistungspositionen zum Zusammenstellen des Bedarfsprofils. */
const BEREICHE = [
  { id: 'buero', label: 'Büro- & Arbeitsplätze', sonder: false },
  { id: 'empfang', label: 'Empfang & Eingangsbereich', sonder: false },
  { id: 'meeting', label: 'Besprechungs- & Konferenzräume', sonder: false },
  { id: 'sanitaer', label: 'Sanitär- & Sozialräume', sonder: false },
  { id: 'verkehr', label: 'Treppenhäuser & Verkehrsflächen', sonder: false },
  { id: 'kueche', label: 'Teeküchen / Kantine', sonder: false },
  { id: 'produktion', label: 'Produktions- & Hallenflächen', sonder: false },
  { id: 'lager', label: 'Lager- & Logistikflächen', sonder: false },
  { id: 'glas', label: 'Glas- & Fassadenflächen', sonder: true },
  { id: 'aussen', label: 'Außenanlagen & Winterdienst', sonder: true },
];

/** LV-relevante Anforderungen / Eignungskriterien. */
const ANFORDERUNGEN = [
  { id: 'objektleitung', label: 'Feste Objektleitung als zentraler Ansprechpartner', preset: true },
  { id: 'qs', label: 'Dokumentierte, digitale Qualitätskontrollen', preset: true },
  { id: 'audit', label: 'Auditfähige Leistungsnachweise', preset: true },
  { id: 'iso', label: 'ISO-konforme Abläufe (9001 / 14001)', preset: false },
  { id: 'schicht', label: 'Reinigung im laufenden Betrieb / Schichtintegration', preset: false },
  { id: 'hygiene', label: 'Hygieneplan / dokumentierte Desinfektion', preset: false },
  { id: 'umwelt', label: 'Umweltschonende Verfahren', preset: false },
  { id: 'personal', label: 'Festangestelltes, sicherheitsüberprüftes Personal', preset: true },
];

const PRESET_BEREICHE = ['buero', 'empfang', 'meeting', 'sanitaer', 'verkehr'];

const faqs: FAQItem[] = [
  {
    question: 'Wofür ist das Bedarfsprofil gut?',
    answer:
      'Es strukturiert Ihren Reinigungsbedarf nach Leistungspositionen und Anforderungen — die Grundlage für ein belastbares Leistungsverzeichnis (LV) oder eine Ausschreibung. Sie können es ausdrucken, intern abstimmen und als Anlage zu Ihrer Anfrage verwenden.',
  },
  {
    question: 'Bekomme ich darüber einen Preis?',
    answer:
      'Das Profil enthält optional eine grobe Budget-Indikation zur internen Planung. Ein belastbarer Festpreis je LV-Position folgt nach der Objektbegehung — seriös lässt sich das nur am Objekt kalkulieren, nicht pauschal über ein Formular.',
  },
  {
    question: 'Wir haben bereits ein eigenes Leistungsverzeichnis. Was dann?',
    answer:
      'Ideal — senden Sie es uns. Wir kalkulieren je Position, ergänzen sinnvolle Standards (Dokumentation, Audit, feste Objektleitung) und liefern ein vergleichbares, transparentes Angebot. Das Bedarfsprofil ist nur ein Angebot an alle, die noch kein LV haben.',
  },
  {
    question: 'Wie geht es nach dem Bedarfsprofil weiter?',
    answer:
      'Objektbegehung innerhalb von 48 Stunden, belastbares Angebot / LV 24 Stunden danach. Auf Wunsch begleiten wir auch die Erstellung des Leistungsverzeichnisses und den geräuschlosen Anbieterwechsel.',
  },
];

const inputCard = (active: boolean) =>
  cn(
    'rounded-2xl border-2 text-left transition-all duration-200 p-4',
    active ? 'border-accent bg-accent/5 shadow-[0_0_0_4px_rgb(13_107_56/0.10)]' : 'border-line bg-white hover:border-brand/40'
  );

const chip = (active: boolean) =>
  cn(
    'inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[13px] font-semibold transition-all text-left',
    active ? 'border-accent bg-accent/5 text-navy' : 'border-line text-slate hover:border-brand/40'
  );

export default function Reinigungskonzept() {
  const [objektTyp, setObjektTyp] = useState<ObjektTyp>('buero');
  const [sqm, setSqm] = useState(800);
  const [frequenz, setFrequenz] = useState<Frequenz>('twice');
  const [bereiche, setBereiche] = useState<string[]>(PRESET_BEREICHE);
  const [anforderungen, setAnforderungen] = useState<string[]>(ANFORDERUNGEN.filter((a) => a.preset).map((a) => a.id));

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const budget = useMemo(() => estimate({ objektTyp, sqm, frequenz }), [objektTyp, sqm, frequenz]);

  const navigate = useNavigate();

  const typLabel = OBJEKT_TYPEN.find((t) => t.id === objektTyp)!.label;
  const freqLabel = FREQUENZEN.find((f) => f.id === frequenz)!.label;
  const selectedBereiche = BEREICHE.filter((b) => bereiche.includes(b.id));
  const standard = selectedBereiche.filter((b) => !b.sonder);
  const sonder = selectedBereiche.filter((b) => b.sonder);
  const selectedAnf = ANFORDERUNGEN.filter((a) => anforderungen.includes(a.id));

  // Profil an den Funnel übergeben — keine Doppel-Eingabe, der Funnel
  // springt direkt zum Kontaktschritt und nimmt das Profil mit in den Lead.
  const uebernehmen = () => {
    const stdLabels = standard.map((b) => b.label);
    const sonderLabels = sonder.map((b) => b.label);
    const anfLabels = selectedAnf.map((a) => a.label);
    const summary = [
      `Objekt: ${typLabel} · ${sqm.toLocaleString('de-DE')} m² · Intervall ${freqLabel}`,
      `Leistungspositionen: ${stdLabels.join(', ') || '—'}`,
      `Sonderleistungen: ${sonderLabels.join(', ') || '—'}`,
      `Anforderungen: ${anfLabels.join(', ') || '—'}`,
      `Budget-Orientierung: ${eur(budget.monthlyLow)}–${eur(budget.monthlyHigh)}/Monat (grobe Indikation)`,
    ].join('\n');

    saveBedarfsprofil({
      objektTypId: objektTyp,
      objektTypLabel: typLabel,
      sqm,
      frequenzId: frequenz,
      frequenzLabel: freqLabel,
      bereiche: stdLabels,
      sonder: sonderLabels,
      anforderungen: anfLabels,
      budgetLow: budget.monthlyLow,
      budgetHigh: budget.monthlyHigh,
      summary,
    });
    navigate('/angebot');
  };

  return (
    <div>
      <SEO
        title="Reinigungskonzept & Leistungsverzeichnis erstellen | AHAD Cleaning"
        description="Stellen Sie in 2 Minuten ein strukturiertes Bedarfsprofil für Ihre Gebäudereinigung zusammen — Leistungspositionen, Anforderungen, Budget-Orientierung. Grundlage für LV & Ausschreibung."
        keywords="Reinigungskonzept erstellen, Leistungsverzeichnis Gebäudereinigung, Ausschreibung Reinigung, Bedarfsanalyse Reinigung, LV Muster Gebäudereinigung, Reinigung Kosten Orientierung"
        schema={faqSchemaFrom(faqs)}
      />

      <PageHero
        compact
        eyebrow="Reinigungskonzept-Assistent"
        title="Ihr Bedarfsprofil — die Basis für ein belastbares Leistungsverzeichnis."
        lead="Für Facility Management & Einkauf: Stellen Sie Leistungsumfang und Anforderungen strukturiert zusammen. Das Ergebnis nehmen Sie mit in Ihre Ausschreibung — oder direkt zu uns."
        crumbs={[{ label: 'Reinigungskonzept' }]}
      />

      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Eingaben */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line shadow-soft p-6 sm:p-8 space-y-8 no-print">
            <div>
              <label className="block text-sm font-bold text-navy mb-3">1. Objekttyp</label>
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

            <div>
              <label className="block text-sm font-bold text-navy mb-3">2. Leistungspositionen (Bereiche)</label>
              <div className="flex flex-wrap gap-2.5">
                {BEREICHE.map((b) => (
                  <button key={b.id} onClick={() => toggle(setBereiche)(b.id)} className={chip(bereiche.includes(b.id))}>
                    <CheckCircle2 size={14} className={bereiche.includes(b.id) ? 'text-accent' : 'text-slate/40'} />
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sqm" className="flex items-center justify-between text-sm font-bold text-navy mb-3">
                  <span>3. Gesamtfläche</span>
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
              <div>
                <label className="block text-sm font-bold text-navy mb-3">4. Reinigungsintervall</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {FREQUENZEN.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFrequenz(f.id)}
                      className={cn(
                        'rounded-xl border-2 py-2.5 px-2 text-[13px] font-bold text-center transition-all',
                        frequenz === f.id ? 'border-accent bg-accent/5 text-navy' : 'border-line bg-white text-slate hover:border-brand/40'
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-3">5. Anforderungen & Standards</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ANFORDERUNGEN.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggle(setAnforderungen)(a.id)}
                    className={cn(
                      'flex items-start gap-2.5 rounded-xl border-2 px-3.5 py-3 text-[13px] font-semibold text-left transition-all',
                      anforderungen.includes(a.id) ? 'border-accent bg-accent/5 text-navy' : 'border-line text-slate hover:border-brand/40'
                    )}
                  >
                    <CheckCircle2 size={15} className={cn('flex-shrink-0 mt-0.5', anforderungen.includes(a.id) ? 'text-accent' : 'text-slate/40')} />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bedarfsprofil */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="print-area bg-white rounded-3xl border border-line shadow-lifted overflow-hidden">
                <div className="bg-navy text-white p-6 grain relative">
                  <div className="absolute inset-0 blueprint-grid" />
                  <div className="relative z-10">
                    <span className="eyebrow text-mint mb-2">
                      <ClipboardList size={13} />
                      Bedarfsprofil · Gebäudereinigung
                    </span>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-blue-100/85 mt-1">
                      <span><strong className="text-white">Objekt:</strong> {typLabel}</span>
                      <span><strong className="text-white">Fläche:</strong> {sqm.toLocaleString('de-DE')} m²</span>
                      <span><strong className="text-white">Intervall:</strong> {freqLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-brand mb-3">Leistungspositionen</h3>
                    {standard.length > 0 ? (
                      <ul className="space-y-2">
                        {standard.map((b, i) => (
                          <li key={b.id} className="flex items-center gap-3 text-sm text-navy">
                            <span className="font-accent text-[12px] text-slate/50 tabular-nums w-7">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <CheckCircle2 size={15} className="text-accent flex-shrink-0" />
                            {b.label}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate/60">Noch keine Bereiche gewählt.</p>
                    )}
                  </div>

                  {sonder.length > 0 && (
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-brand mb-3">
                        Sonderleistungen <span className="text-slate/60 font-bold">· projektbezogen</span>
                      </h3>
                      <ul className="space-y-2">
                        {sonder.map((b) => (
                          <li key={b.id} className="flex items-center gap-3 text-sm text-navy">
                            <CheckCircle2 size={15} className="text-accent flex-shrink-0" />
                            {b.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedAnf.length > 0 && (
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-brand mb-3">Anforderungen & Standards</h3>
                      <ul className="space-y-2">
                        {selectedAnf.map((a) => (
                          <li key={a.id} className="flex items-start gap-3 text-sm text-navy">
                            <CheckCircle2 size={15} className="text-accent flex-shrink-0 mt-0.5" />
                            {a.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Budget-Indikation — bewusst sekundär, einklappbar */}
                  <details className="group bg-paper rounded-2xl border border-line overflow-hidden">
                    <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer text-sm font-bold text-navy [&::-webkit-details-marker]:hidden">
                      <span>Grobe Budget-Indikation <span className="text-slate/60 font-semibold">(optional)</span></span>
                      <ChevronDown size={18} className="text-brand transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4">
                      <div className="font-accent text-2xl font-bold text-navy tabular-nums">
                        {eur(budget.monthlyLow)} – {eur(budget.monthlyHigh)}
                        <span className="text-sm font-medium text-slate"> / Monat</span>
                      </div>
                      <p className="text-[12px] text-slate mt-2 leading-relaxed">
                        Reine Orientierung für Ihre interne Budgetplanung (Unterhaltsreinigung, ≈{' '}
                        {Math.round(budget.cleaningsPerMonth)} Reinigungen/Monat). Sonderleistungen und der belastbare
                        Festpreis je LV-Position folgen nach der Objektbegehung.
                      </p>
                    </div>
                  </details>

                  {/* Aktionen */}
                  <div className="space-y-3 no-print">
                    <button
                      type="button"
                      onClick={uebernehmen}
                      className="group/btn w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-accent-dark shadow-glow hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                    >
                      Profil übernehmen &amp; Anfrage abschließen
                      <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full inline-flex items-center justify-center gap-2 border-2 border-line bg-white text-navy px-6 py-3.5 rounded-xl font-bold text-sm hover:border-brand/40 transition-colors"
                    >
                      <Printer size={17} />
                      Bedarfsprofil drucken / als PDF
                    </button>
                    <p className="text-center text-[12px] text-slate/70">
                      Begehung in 48h · Angebot / LV 24h danach · {SITE.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 bg-white border border-line rounded-2xl p-4 mt-4 no-print">
                <Info size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <p className="text-[12.5px] text-slate leading-relaxed">
                  <strong className="text-navy">Schon ein eigenes LV?</strong> Senden Sie es uns — wir kalkulieren je
                  Position und liefern ein vergleichbares, transparentes Angebot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-brand justify-center mb-4">
              <span className="h-px w-8 bg-brand/40" />
              Für Facility Management & Einkauf
            </span>
            <h2 className="display-md text-navy">Häufige Fragen zum Reinigungskonzept</h2>
          </div>
          <Accordion items={faqs} />
          <Reveal delay={0.2} className="mt-8 text-center">
            <Link
              to="/fachwissen/reinigungsfirma-wechseln-checkliste-tipps"
              className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-light transition-colors"
            >
              Leitfaden: Reinigungsfirma wechseln <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Vom Bedarfsprofil zum belastbaren Angebot"
        lead={`Wir besichtigen Ihr Objekt in 48 Stunden und liefern ein transparentes Angebot bzw. LV 24 Stunden danach — auf Wunsch inklusive Begleitung des Anbieterwechsels. Direkt sprechen: ${SITE.phone}.`}
      />
    </div>
  );
}
