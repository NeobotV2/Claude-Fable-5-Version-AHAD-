import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import routeManifest from './route-manifest.json';

// Code-Splitting: nur die Startseite lädt sofort, jede weitere Seite bei Bedarf.
const Unternehmen = lazy(() => import('./pages/Unternehmen'));
const Karriere = lazy(() => import('./pages/Karriere'));
const KarriereFunnel = lazy(() => import('./pages/KarriereFunnel'));
const AngebotsFunnel = lazy(() => import('./pages/AngebotsFunnel'));
const Fachwissen = lazy(() => import('./pages/Fachwissen'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const AHADSystem = lazy(() => import('./pages/AHADSystem'));
const Leistungen = lazy(() => import('./pages/Leistungen'));
const Branchen = lazy(() => import('./pages/Branchen'));
const Standorte = lazy(() => import('./pages/Standorte'));
const Impressum = lazy(() => import('./pages/rechtliches/Impressum'));
const Datenschutz = lazy(() => import('./pages/rechtliches/Datenschutz'));
const Unterhaltsreinigung = lazy(() => import('./pages/leistungen/Unterhaltsreinigung'));
const Industriereinigung = lazy(() => import('./pages/leistungen/Industrie'));
const GlasFassadenreinigung = lazy(() => import('./pages/leistungen/GlasFassadenreinigung'));
const Baureinigung = lazy(() => import('./pages/leistungen/Baureinigung'));
const MedizintechnikReinigung = lazy(() => import('./pages/leistungen/MedizintechnikReinigung'));
const Sonderreinigung = lazy(() => import('./pages/leistungen/Sonderreinigung'));
const Winterdienst = lazy(() => import('./pages/leistungen/Winterdienst'));
const Kuechenabluftreinigung = lazy(() => import('./pages/leistungen/Kuechenabluftreinigung'));
const IndustrieProduktion = lazy(() => import('./pages/branchen/IndustrieProduktion'));
const MedizintechnikBranche = lazy(() => import('./pages/branchen/Medizintechnik'));
const BueroVerwaltung = lazy(() => import('./pages/branchen/BueroVerwaltung'));
const Gewerbeobjekte = lazy(() => import('./pages/branchen/Gewerbeobjekte'));
const HotellerieObjektbetrieb = lazy(() => import('./pages/branchen/HotellerieObjektbetrieb'));
const VillingenSchwenningen = lazy(() => import('./pages/standorte/VillingenSchwenningen'));
const Stuttgart = lazy(() => import('./pages/standorte/Stuttgart'));
const Konstanz = lazy(() => import('./pages/standorte/Konstanz'));
const FachwissenIntervalle = lazy(() => import('./pages/fachwissen/Intervalle'));
const FachwissenISO = lazy(() => import('./pages/fachwissen/ISO'));
const FachwissenIndustrieProzess = lazy(() => import('./pages/fachwissen/IndustrieProzess'));
const FachwissenAnbieterwechsel = lazy(() => import('./pages/fachwissen/Anbieterwechsel'));
const FachwissenLeistungsverzeichnis = lazy(() => import('./pages/fachwissen/Leistungsverzeichnis'));
const FachwissenVDI2052 = lazy(() => import('./pages/fachwissen/VDI2052'));
const FachwissenKosten = lazy(() => import('./pages/fachwissen/Kosten'));
const FachwissenCheckliste = lazy(() => import('./pages/fachwissen/Checkliste'));
const Referenzen = lazy(() => import('./pages/Referenzen'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Das Manifest klassifiziert jede öffentliche Route für Router, Prerendering,
 * Canonical/Robots und Sitemap. Die Komponenten-Zuordnung bleibt bewusst hier,
 * damit Vite weiterhin saubere Lazy-Chunks erzeugt.
 */
const ROUTE_COMPONENTS = {
  home: Home,
  unternehmen: Unternehmen,
  karriere: Karriere,
  karriereBewerbung: KarriereFunnel,
  angebot: AngebotsFunnel,
  fachwissen: Fachwissen,
  kontakt: Kontakt,
  ahadSystem: AHADSystem,
  leistungen: Leistungen,
  branchen: Branchen,
  standorte: Standorte,
  impressum: Impressum,
  datenschutz: Datenschutz,
  unterhaltsreinigung: Unterhaltsreinigung,
  industriereinigung: Industriereinigung,
  glasFassadenreinigung: GlasFassadenreinigung,
  baureinigung: Baureinigung,
  medizintechnikReinigung: MedizintechnikReinigung,
  sonderreinigung: Sonderreinigung,
  winterdienst: Winterdienst,
  kuechenabluftreinigung: Kuechenabluftreinigung,
  industrieProduktion: IndustrieProduktion,
  medizintechnikBranche: MedizintechnikBranche,
  bueroVerwaltung: BueroVerwaltung,
  gewerbeobjekte: Gewerbeobjekte,
  hotellerieObjektbetrieb: HotellerieObjektbetrieb,
  villingenSchwenningen: VillingenSchwenningen,
  stuttgart: Stuttgart,
  konstanz: Konstanz,
  fachwissenIntervalle: FachwissenIntervalle,
  fachwissenIso: FachwissenISO,
  fachwissenIndustrieProzess: FachwissenIndustrieProzess,
  fachwissenAnbieterwechsel: FachwissenAnbieterwechsel,
  fachwissenLeistungsverzeichnis: FachwissenLeistungsverzeichnis,
  fachwissenVdi2052: FachwissenVDI2052,
  fachwissenKosten: FachwissenKosten,
  fachwissenCheckliste: FachwissenCheckliste,
  referenzen: Referenzen,
  admin: Admin,
} as const;

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Seite wird geladen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-brand rounded-full animate-spin" />
    </div>
  );
}

/** Reiner Routenbaum — Router wird vom Aufrufer gestellt (Browser bzw. SSG). */
export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routeManifest.pages.map((route) => {
            const Component = ROUTE_COMPONENTS[route.component as keyof typeof ROUTE_COMPONENTS];
            if (!Component) throw new Error(`Unbekannte Route-Komponente: ${route.component}`);
            return route.path === '/' ? (
              <Route key={route.path} index element={<Component />} />
            ) : (
              <Route key={route.path} path={route.path.slice(1)} element={<Component />} />
            );
          })}

          {routeManifest.redirects.map((redirect) => (
            <Route
              key={redirect.from}
              path={redirect.from.slice(1)}
              element={<Navigate to={redirect.to} replace />}
            />
          ))}

          {/* 404 — fängt alle unbekannten URLs ab */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
