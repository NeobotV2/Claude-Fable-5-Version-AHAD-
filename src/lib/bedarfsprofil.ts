/**
 * Übergabe des Bedarfsprofils vom Reinigungskonzept-Assistenten in den
 * Angebots-Funnel. Verhindert Doppel-Eingabe: Der Assistent strukturiert,
 * der Funnel schließt ab — ohne dieselben Fragen erneut zu stellen.
 * sessionStorage (nicht localStorage), damit das Profil pro Sitzung gilt.
 */
export interface Bedarfsprofil {
  objektTypId: string;
  objektTypLabel: string;
  sqm: number;
  frequenzId: string;
  frequenzLabel: string;
  bereiche: string[]; // Leistungspositionen (Standard)
  sonder: string[]; // Sonderleistungen
  anforderungen: string[];
  budgetLow: number;
  budgetHigh: number;
  /** Menschenlesbare Zusammenfassung — geht mit in den Lead. */
  summary: string;
}

const KEY = 'ahad_bedarfsprofil';

export function saveBedarfsprofil(profile: Bedarfsprofil): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* sessionStorage nicht verfügbar — Funnel startet dann normal */
  }
}

/** Liest das Profil und entfernt es (einmalige Übergabe). */
export function consumeBedarfsprofil(): Bedarfsprofil | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as Bedarfsprofil;
  } catch {
    return null;
  }
}
