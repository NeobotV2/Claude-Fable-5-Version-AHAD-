/**
 * Zentrale Bild-Bibliothek.
 *
 * Bevorzugt werden ECHTE AHAD-Fotos (web-optimierte WebP unter
 * /images/ahad/, erzeugt via scripts/process-photos.mjs aus uploads/).
 * Wo (noch) kein passendes Eigenfoto existiert (Medizintechnik, Winterdienst,
 * Branchen Produktion/Büro/Hotel, Region, Handshake, Vorher/Nachher), kommen
 * kuratierte, lizenzfreie Unsplash-Aufnahmen zum Einsatz (Unsplash License,
 * Hotlinking über images.unsplash.com erlaubt, CDN-optimiert).
 *
 * Fällt eine Quelle aus, greift <SmartImage> auf /images/fallback.jpg
 * (lokal generiertes, gebrandetes Bild) zurück.
 */

const u = (id: string, w = 1600, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}${extra}`;

/** Lokales, web-optimiertes AHAD-Foto (berücksichtigt GitHub-Pages-Unterpfad). */
const local = (name: string) => `${import.meta.env.BASE_URL}images/ahad/${name}`;

export const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}images/fallback.jpg`;

/**
 * Erzeugt ein responsives srcset für Unsplash-URLs (kleinere Geräte laden
 * kleinere Varianten — bessere mobile Ladezeit / Core Web Vitals).
 * Lokale Fotos liefern kein srcset (bereits in Zielgröße ausgespielt).
 */
export function unsplashSrcSet(url: string): string | undefined {
  if (!url.includes('images.unsplash.com')) return undefined;
  return [480, 768, 1080, 1600]
    .map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`)
    .join(', ');
}

export const IMG = {
  // ── Hero & Stimmung (echte AHAD-Fotos) ────────────────────────────
  heroMain: local('hero-hq-wide.webp'),        // Fuhrpark vor der Zentrale
  heroArchitecture: local('hero-hq.webp'),     // Zentrale Villingen-Schwenningen
  heroLowAngle: local('brand-back.webp'),      // „AHAD – Die Hygieneprofis"

  // ── Leistungen ─────────────────────────────────────────────────────
  unterhaltsreinigung: local('unterhalt.webp'),         // Flächenreinigung Foyer
  unterhaltDetail: local('unterhalt-detail.webp'),      // Flächenwischen, Brustlogo
  industrie: local('industrie.webp'),                   // Aufsitz-Scheuersaugmaschine
  industrieDetail: local('industrie-detail.webp'),      // Hände am Maschinensteuer
  kuechenabluft: local('kuechenabluft.webp'),           // Lamellen-/Filterreinigung (echt)
  glasfassade: local('glas.webp'),                      // Glasfassade Atrium
  glasDetail: local('glas-detail.webp'),                // Glasreinigung innen
  baureinigung: local('bau.webp'),                      // Glasreinigung Neubau/Atrium
  bauDetail: u('photo-1503387762-592deb58ef4e', 1200),  // Stock: Baupläne
  medizintechnik: u('photo-1551190822-a9333d879b1f', 1600), // Stock: Klinikflur
  medizinDetail: u('photo-1576091160399-112ba8d25d1d', 1200), // Stock: Medizin digital
  sonderreinigung: local('sonder.webp'),                // Sanitär-Grundreinigung
  sonderDetail: local('sonder-detail.webp'),            // Saugdüse auf Teppich
  winterdienst: u('photo-1418985991508-e47386d96a71', 1600), // Stock: Winter (kein Eigenfoto)
  hausmeister: u('photo-1581092160562-40aa08e78837', 1200),  // Stock: Techniker

  // ── Branchen ───────────────────────────────────────────────────────
  brancheIndustrie: local('branche-industrie.webp'),             // Aufsitz-Scheuersaugmaschine (echt)
  brancheMedizin: u('photo-1582719508461-905c673771fd', 1600),   // Stock: Reinraum
  brancheBuero: local('branche-buero.webp'),                     // Reinigung modernes Foyer (echt)
  brancheGewerbe: local('gewerbe.webp'),                         // Markt/Großfläche (echt)
  brancheHotel: local('branche-hotel.webp'),                     // Reinigung Lounge-/Gastrobereich am Pool (echt)

  // ── Unternehmen / Team / Karriere (echte AHAD-Fotos) ──────────────
  team: local('team.webp'),                              // Geschäftsführung
  teamMeeting: local('meeting.webp'),                    // Besprechung Zentrale
  handshake: u('photo-1600880292203-757bb62b4baf', 1600), // Stock: Partnerschaft
  karriere: local('karriere.webp'),                      // Team mit Reinigungswagen

  // ── Standorte / Region ────────────────────────────────────────────
  schwarzwald: u('photo-1441974231531-c6227db76b6e', 1600), // Stock: Schwarzwald (Region)
  bodensee: local('konstanz.webp'),   // echtes Konstanz-Stadtfoto (Luftaufnahme Bodensee)
  stuttgart: local('stuttgart.webp'), // echtes Stuttgart-Stadtfoto (Schlossplatz)

  // ── Vorher / Nachher (echtes AHAD-Objekt) ─────────────────────────
  vorher: local('vorher.webp'),
  nachher: local('nachher.webp'),
} as const;

export type ImageKey = keyof typeof IMG;
