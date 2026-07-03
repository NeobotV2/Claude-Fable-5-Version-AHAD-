/**
 * Marken-Messaging — eine Quelle für Claim und Slogan-Optionen.
 *
 * WICHTIG (Designbook v2.4): Die Website nutzt GENAU EINEN Claim —
 * „Struktur. Sauberkeit. Sicherheit." Die übrigen Zeilen sind KEINE
 * Alternativ-Claims, sondern Kanal-/Kontext-Material (Fahrzeug, Kleidung,
 * Anzeigen, Social, LV-Deckblatt). Sie gehören NICHT verstreut auf die
 * Website, sondern jeweils dorthin, wo sie wirken. Diese Datei dokumentiert
 * das, damit Marketing eine saubere Quelle hat.
 */

/** Der eine, verbindliche Website-Claim (Positionierung: strukturierter
 *  B2B-Dienstleister, kein austauschbarer Reinigungsdienst). */
export const CLAIM = 'Sauberkeit mit System.';
/** Sekundärer Dreiklang — für LV-Deckblätter/Anzeigen, nie umgestellt/gekürzt. */
export const CLAIM_PARTS = ['Struktur', 'Sauberkeit', 'Sicherheit'] as const;

export type SloganKanal = 'website' | 'fahrzeug' | 'kleidung' | 'anzeige' | 'social' | 'lv-deckblatt';

export interface Slogan {
  text: string;
  typ: 'Claim' | 'Dreiklang' | 'Kurz-Tagline' | 'Nutzen' | 'Kampagne';
  /** Kanäle, für die der Slogan gedacht ist (Priorität: erster Eintrag). */
  kanaele: SloganKanal[];
  hinweis: string;
}

export const SLOGANS: Slogan[] = [
  {
    text: 'Struktur. Sauberkeit. Sicherheit.',
    typ: 'Claim',
    kanaele: ['website', 'fahrzeug', 'kleidung', 'anzeige', 'lv-deckblatt'],
    hinweis: 'Der Marken-Claim. Überall konsistent, nie verändern.',
  },
  {
    text: 'Sauber. Pünktlich. Dokumentiert.',
    typ: 'Dreiklang',
    kanaele: ['anzeige', 'social'],
    hinweis: 'Die drei härtesten B2B-Argumente. Anzeigen/Social, auf der Website nur sparsam.',
  },
  {
    text: 'Professionell. Gründlich. Zuverlässig.',
    typ: 'Dreiklang',
    kanaele: ['lv-deckblatt', 'anzeige'],
    hinweis: 'Vertrauens-Dreiklang für Ausschreibungen & LV-Deckblätter.',
  },
  {
    text: 'Sauberkeit mit System.',
    typ: 'Kurz-Tagline',
    kanaele: ['website', 'fahrzeug', 'kleidung'],
    hinweis: 'Kurz, merkfähig, passt zum AHAD-System. Footer-/Fahrzeug-Tagline.',
  },
  {
    text: 'Reinigung, auf die Sie bauen.',
    typ: 'Kurz-Tagline',
    kanaele: ['fahrzeug', 'anzeige'],
    hinweis: 'Leiser Bezug zu Bau-/Industriereinigung. Fahrzeug & Industrie-Kampagne.',
  },
  {
    text: 'Mehr als sauber — organisiert.',
    typ: 'Kurz-Tagline',
    kanaele: ['website', 'anzeige'],
    hinweis: 'Differenzierung über Struktur. Mögliche Sektions-Headline am System.',
  },
  {
    text: 'Ihr Gebäude in besten Händen.',
    typ: 'Nutzen',
    kanaele: ['anzeige', 'social'],
    hinweis: 'Nutzen-/Vertrauenszeile. Google-Ads-Headline, nicht als Web-Claim.',
  },
  {
    text: 'Werterhalt durch saubere Arbeit.',
    typ: 'Nutzen',
    kanaele: ['anzeige', 'website'],
    hinweis: 'Spricht Eigentümer/Verwalter an. Glas-/Fassade-Kontext oder Anzeige.',
  },
  {
    text: 'Wir reinigen. Sie arbeiten.',
    typ: 'Kampagne',
    kanaele: ['fahrzeug', 'social'],
    hinweis: 'Pointierte Kampagnenzeile — gebaut für Fahrzeugheck & Social.',
  },
];
