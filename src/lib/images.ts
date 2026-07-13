/**
 * Zentrale Bild-Bibliothek.
 *
 * Bevorzugt werden ECHTE AHAD-Fotos (web-optimierte WebP unter
 * /images/ahad/, erzeugt via scripts/process-photos.mjs aus uploads/).
 * Wo noch kein eigenes Detailmotiv existiert, wird ein thematisch nahes
 * lokales AHAD-Foto genutzt. Externe Bildabrufe und die damit verbundene
 * Übertragung von IP-/Referrer-Daten finden nicht statt.
 *
 * Fällt eine Quelle aus, greift <SmartImage> auf /images/fallback.jpg
 * (lokal generiertes, gebrandetes Bild) zurück.
 */

/** Lokales, web-optimiertes AHAD-Foto (berücksichtigt GitHub-Pages-Unterpfad). */
const local = (name: string) => `${import.meta.env.BASE_URL}images/ahad/${name}`;

export const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}images/fallback.jpg`;

/** Responsives srcset für lokale AHAD-Fotos aus dem Varianten-Manifest. */
import VARIANTS from './image-variants.json';

export function srcSetFor(url: string): string | undefined {
  const match = url.match(/images\/ahad\/([^/?]+\.webp)$/);
  if (!match) return undefined;
  const entry = (VARIANTS as Record<string, { width: number; variants: number[] }>)[match[1]];
  if (!entry || entry.variants.length === 0) return undefined;
  const stemUrl = url.replace(/\.webp$/, '');
  const parts = entry.variants.map((w) => `${stemUrl}-${w}.webp ${w}w`);
  parts.push(`${url} ${entry.width}w`);
  return parts.join(', ');
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
  bauDetail: local('bau.webp'),
  medizintechnik: local('medizintechnik.webp'),        // Hygienische Flächendesinfektion, Einweghandschuhe (echt)
  medizinDetail: local('medizin-detail.webp'),          // AHAD-Flächendesinfektion, Nitrilhandschuh (echt)
  sonderreinigung: local('sonder.webp'),                // Sanitär-Grundreinigung
  sonderDetail: local('sonder-detail.webp'),            // Saugdüse auf Teppich
  winterdienst: local('brand-back.webp'),
  hausmeister: local('hero-hq.webp'),

  // ── Branchen ───────────────────────────────────────────────────────
  brancheIndustrie: local('branche-industrie.webp'),             // Aufsitz-Scheuersaugmaschine (echt)
  brancheMedizin: local('branche-medizin.webp'),                 // Hygiene mit Mundschutz & Handschuhen (echt)
  brancheBuero: local('branche-buero.webp'),                     // Reinigung modernes Foyer (echt)
  brancheGewerbe: local('gewerbe.webp'),                         // Markt/Großfläche (echt)
  brancheHotel: local('branche-hotel.webp'),                     // Reinigung Lounge-/Gastrobereich am Pool (echt)

  // ── Unternehmen / Team / Karriere (echte AHAD-Fotos) ──────────────
  team: local('team.webp'),                              // Geschäftsführung
  teamMeeting: local('meeting.webp'),                    // Besprechung Zentrale
  handshake: local('meeting.webp'),
  karriere: local('karriere.webp'),                      // Team mit Reinigungswagen

  // ── Standorte / Region ────────────────────────────────────────────
  schwarzwald: local('hero-hq-wide.webp'),
  bodensee: local('konstanz.webp'),   // echtes Konstanz-Stadtfoto (Luftaufnahme Bodensee)
  stuttgart: local('stuttgart.webp'), // echtes Stuttgart-Stadtfoto (Schlossplatz)

  // ── Vorher / Nachher (echtes AHAD-Objekt) ─────────────────────────
  vorher: local('vorher.webp'),
  nachher: local('nachher.webp'),
} as const;

export type ImageKey = keyof typeof IMG;
