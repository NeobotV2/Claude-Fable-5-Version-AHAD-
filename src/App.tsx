import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

// Alle Unterseiten werden lazy geladen (Code-Splitting):
// Besucher laden nur die Startseite sofort, jede weitere Seite erst bei Bedarf.
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
const Referenzen = lazy(() => import('./pages/Referenzen'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Seite wird geladen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-brand rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* Leistungen */}
              <Route path="leistungen" element={<Leistungen />} />
              <Route path="leistungen/unterhaltsreinigung" element={<Unterhaltsreinigung />} />
              <Route path="leistungen/industrie-produktionsreinigung" element={<Industriereinigung />} />
              <Route path="leistungen/glas-fassadenreinigung" element={<GlasFassadenreinigung />} />
              <Route path="leistungen/baureinigung" element={<Baureinigung />} />
              <Route path="leistungen/medizintechnik-reinigung" element={<MedizintechnikReinigung />} />
              <Route path="leistungen/sonderreinigung-stillstandsservice" element={<Sonderreinigung />} />
              <Route path="leistungen/winterdienst-hausmeisterservice" element={<Winterdienst />} />

              {/* Branchen */}
              <Route path="branchen" element={<Branchen />} />
              <Route path="branchen/industrie-produktion" element={<IndustrieProduktion />} />
              <Route path="branchen/medizintechnik" element={<MedizintechnikBranche />} />
              <Route path="branchen/buero-verwaltung" element={<BueroVerwaltung />} />
              <Route path="branchen/gewerbeobjekte" element={<Gewerbeobjekte />} />
              <Route path="branchen/hotellerie-objektbetrieb" element={<HotellerieObjektbetrieb />} />

              <Route path="ahad-system" element={<AHADSystem />} />

              {/* Unternehmen */}
              <Route path="unternehmen" element={<Unternehmen />} />
              <Route path="standorte" element={<Standorte />} />
              <Route path="standorte/villingen-schwenningen" element={<VillingenSchwenningen />} />
              <Route path="standorte/stuttgart" element={<Stuttgart />} />
              <Route path="standorte/konstanz" element={<Konstanz />} />
              <Route path="referenzen" element={<Referenzen />} />

              {/* Karriere & Funnels */}
              <Route path="karriere" element={<Karriere />} />
              <Route path="karriere/bewerbung" element={<KarriereFunnel />} />
              <Route path="angebot" element={<AngebotsFunnel />} />

              {/* Fachwissen */}
              <Route path="fachwissen" element={<Fachwissen />} />
              <Route path="fachwissen/unterhaltsreinigung-unternehmen-reinigungsintervalle" element={<FachwissenIntervalle />} />
              <Route path="fachwissen/iso-9001-iso-14001-gebaeudereinigung-unternehmen" element={<FachwissenISO />} />
              <Route path="fachwissen/industrie-produktionsreinigung-ohne-prozessstoerung" element={<FachwissenIndustrieProzess />} />
              <Route path="fachwissen/reinigungsfirma-wechseln-checkliste-tipps" element={<FachwissenAnbieterwechsel />} />

              <Route path="kontakt" element={<Kontakt />} />
              <Route path="impressum" element={<Impressum />} />
              <Route path="datenschutz" element={<Datenschutz />} />
              <Route path="admin" element={<Admin />} />

              {/* 404 — fängt alle unbekannten URLs ab */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
