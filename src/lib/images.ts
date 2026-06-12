/**
 * Zentrale Bild-Bibliothek.
 *
 * Alle Fotos sind kuratierte, lizenzfreie Unsplash-Aufnahmen (Unsplash License,
 * Hotlinking über images.unsplash.com ist ausdrücklich erlaubt und CDN-optimiert).
 * Über `u()` werden Format, Qualität und Breite gesteuert.
 *
 * Fällt eine Quelle aus, greift <SmartImage> auf /images/fallback.jpg
 * (lokal generiertes, gebrandetes Bild) zurück.
 */

const u = (id: string, w = 1600, extra = '') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}${extra}`;

export const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}images/fallback.jpg`;

export const IMG = {
  // ── Hero & Stimmung ────────────────────────────────────────────────
  heroMain: u('photo-1486406146926-c627a92ad1ab', 2000),        // Glasfassade, blaue Stunde
  heroArchitecture: u('photo-1487958449943-2429e8be8625', 2000), // weiße Architektur
  heroLowAngle: u('photo-1481026469463-66327c86e544', 1800),     // Fassade von unten

  // ── Leistungen ─────────────────────────────────────────────────────
  unterhaltsreinigung: u('photo-1497366216548-37526070297c', 1600), // helles Büro
  unterhaltDetail: u('photo-1524758631624-e2822e304c36', 1200),     // Büro Detail
  industrie: u('photo-1504917595217-d4dc5ebe6122', 1600),           // Industriehalle
  industrieDetail: u('photo-1581094794329-c8112a89af12', 1200),     // Techniker Anlage
  glasfassade: u('photo-1448630360428-65456885c650', 1600),         // Hochhaus Glas
  glasDetail: u('photo-1486325212027-8081e485255e', 1200),          // Fassadenraster
  baureinigung: u('photo-1541888946425-d81bb19240f5', 1600),        // Baustelle
  bauDetail: u('photo-1503387762-592deb58ef4e', 1200),              // Baupläne
  medizintechnik: u('photo-1551190822-a9333d879b1f', 1600),         // Klinikflur
  medizinDetail: u('photo-1576091160399-112ba8d25d1d', 1200),       // Medizin digital
  sonderreinigung: u('photo-1581578731548-c64695cc6952', 1600),     // Reinigungskraft
  sonderDetail: u('photo-1556911220-bff31c812dba', 1200),           // Reinigung Detail
  winterdienst: u('photo-1418985991508-e47386d96a71', 1600),        // Winter / Schnee
  hausmeister: u('photo-1581092160562-40aa08e78837', 1200),         // Techniker

  // ── Branchen ───────────────────────────────────────────────────────
  brancheIndustrie: u('photo-1565043666747-69f6646db940', 1600),    // Produktion
  brancheMedizin: u('photo-1582719508461-905c673771fd', 1600),      // Reinraum-Anmutung
  brancheBuero: u('photo-1497366811353-6870744d04b2', 1600),        // Büro modern
  brancheGewerbe: u('photo-1586528116311-ad8dd3c8310d', 1600),      // Logistik / Halle
  brancheHotel: u('photo-1566073771259-6a8506099945', 1600),        // Hotel

  // ── Unternehmen / Team / Karriere ─────────────────────────────────
  team: u('photo-1522071820081-009f0129c71c', 1600),                // Team
  teamMeeting: u('photo-1521737711867-e3b97375f902', 1200),         // Besprechung
  handshake: u('photo-1600880292203-757bb62b4baf', 1600),           // Partnerschaft
  karriere: u('photo-1521791136064-7986c2920216', 1600),            // Zusammenarbeit

  // ── Standorte / Region ────────────────────────────────────────────
  schwarzwald: u('photo-1441974231531-c6227db76b6e', 1600),         // Schwarzwald
  bodensee: u('photo-1531366936337-7c912a4589a7', 1600),            // See & Berge
  stuttgart: u('photo-1449824913935-59a10b8d2000', 1600),           // Stadt-Skyline

  // ── Vorher / Nachher ──────────────────────────────────────────────
  beforeDirty: u('photo-1504307651254-35680f356dfd', 1400),         // Baustelle roh
  afterClean: u('photo-1497366754035-f200968a6e72', 1400),          // Büro makellos
} as const;

export type ImageKey = keyof typeof IMG;
