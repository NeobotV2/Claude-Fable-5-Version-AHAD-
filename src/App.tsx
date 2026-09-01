import type { ReactNode } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from './components/ErrorBoundary';
import RouterContent from './RouterContent';
import { stripAnalyticsQuery } from './lib/analytics';

/** Gemeinsamer äußerer App-Baum für Browser-Hydration und statisches Rendering. */
export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      {/* „Bewegung reduzieren“ gilt damit auch für JS-Animationen (Menü, Akkordeon,
          Sticky-Leiste) – die CSS-Regel in index.css deckt nur CSS-Transitions ab. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      {/* Cookielose Reichweitenmessung; serverseitig rendert die Komponente kein DOM. */}
      <Analytics beforeSend={(event) => ({ ...event, url: stripAnalyticsQuery(event.url) })} />
    </ErrorBoundary>
  );
}

export default function App() {
  // Single-File-Vorschau (npm run build:file) nutzt HashRouter,
  // damit Navigation auch beim Öffnen direkt von der Festplatte funktioniert.
  const useHash = import.meta.env.VITE_HASH_ROUTER === '1';
  const Router = useHash ? HashRouter : BrowserRouter;
  // Folgt Vites base-Pfad (z.B. /repo-name/ auf GitHub Pages); lokal = ''.
  const basename = useHash ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <AppFrame>
      <Router basename={basename}>
        <RouterContent />
      </Router>
    </AppFrame>
  );
}
