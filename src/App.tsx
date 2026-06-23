import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './AppRoutes';

export default function App() {
  // Single-File-Vorschau (npm run build:file) nutzt HashRouter,
  // damit Navigation auch beim Öffnen direkt von der Festplatte funktioniert.
  const useHash = import.meta.env.VITE_HASH_ROUTER === '1';
  const Router = useHash ? HashRouter : BrowserRouter;
  // Folgt Vites base-Pfad (z.B. /repo-name/ auf GitHub Pages); lokal = ''.
  const basename = useHash ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <ErrorBoundary>
      <Router basename={basename}>
        <ScrollToTop />
        <AppRoutes />
        <Analytics />
      </Router>
    </ErrorBoundary>
  );
}
