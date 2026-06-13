/**
 * Transparentes Richtpreis-Modell für die Unterhaltsreinigung.
 *
 * Bewusst ehrlich: Das Ergebnis ist eine *Orientierungs-Spanne*, kein Angebot.
 * Alle Annahmen sind sichtbar (€/m² je Reinigung, Reinigungen/Monat), damit
 * Entscheider die Zahl nachvollziehen können — das nimmt die Preis-Angst,
 * ohne einen Festpreis vorzutäuschen. Der verbindliche Preis folgt nach der
 * Objektbesichtigung.
 *
 * Grundlage: branchenübliche Leistungswerte (Flächenleistung 150–250 m²/h,
 * vollkostenbasierter Stundensatz) → ~0,12–0,34 €/m² je Reinigung nach
 * Objekttyp. Konservativ als Spanne gehalten.
 */

export type ObjektTyp = 'buero' | 'industrie' | 'medizin' | 'gewerbe' | 'hotellerie';
export type Frequenz = 'daily' | 'thrice' | 'twice' | 'weekly';

export const OBJEKT_TYPEN: { id: ObjektTyp; label: string; hint: string }[] = [
  { id: 'buero', label: 'Büro & Verwaltung', hint: 'Büros, Empfang, Besprechung, Sanitär' },
  { id: 'industrie', label: 'Industrie & Produktion', hint: 'Hallen, Anlagen, Sozialräume' },
  { id: 'medizin', label: 'Medizintechnik & Sensibel', hint: 'Dokumentiert, nach Hygieneplan' },
  { id: 'gewerbe', label: 'Gewerbe & Logistik', hint: 'Großflächen, Handel, Lager' },
  { id: 'hotellerie', label: 'Hotellerie & Objektbetrieb', hint: 'Housekeeping, öffentliche Bereiche' },
];

export const FREQUENZEN: { id: Frequenz; label: string; perMonth: number }[] = [
  { id: 'daily', label: '5× pro Woche', perMonth: 21.7 },
  { id: 'thrice', label: '3× pro Woche', perMonth: 13 },
  { id: 'twice', label: '2× pro Woche', perMonth: 8.7 },
  { id: 'weekly', label: '1× pro Woche', perMonth: 4.3 },
];

/** €/m² je einzelner Reinigung (Spanne) nach Objekttyp. */
const RATE: Record<ObjektTyp, { low: number; high: number }> = {
  buero: { low: 0.14, high: 0.2 },
  industrie: { low: 0.18, high: 0.28 },
  medizin: { low: 0.22, high: 0.34 },
  gewerbe: { low: 0.12, high: 0.18 },
  hotellerie: { low: 0.16, high: 0.26 },
};

/** Mengenrabatt: große Flächen sind pro m² günstiger. */
function sizeFactor(sqm: number): number {
  if (sqm >= 5000) return 0.82;
  if (sqm >= 2000) return 0.9;
  if (sqm >= 800) return 0.96;
  return 1;
}

export interface EstimateInput {
  objektTyp: ObjektTyp;
  sqm: number;
  frequenz: Frequenz;
}

export interface EstimateResult {
  monthlyLow: number;
  monthlyHigh: number;
  cleaningsPerMonth: number;
  perSqmLow: number;
  perSqmHigh: number;
}

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

export function estimate({ objektTyp, sqm, frequenz }: EstimateInput): EstimateResult {
  const rate = RATE[objektTyp];
  const cleanings = FREQUENZEN.find((f) => f.id === frequenz)!.perMonth;
  const factor = sizeFactor(sqm);

  const rawLow = sqm * rate.low * cleanings * factor;
  const rawHigh = sqm * rate.high * cleanings * factor;

  return {
    monthlyLow: Math.max(0, roundTo(rawLow, 10)),
    monthlyHigh: Math.max(0, roundTo(rawHigh, 10)),
    cleaningsPerMonth: cleanings,
    perSqmLow: rate.low * factor,
    perSqmHigh: rate.high * factor,
  };
}

export const eur = (n: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
