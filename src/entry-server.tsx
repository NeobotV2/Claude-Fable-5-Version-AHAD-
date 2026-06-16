import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './AppRoutes';

/** Helmet befüllt diesen Context während des Renders. */
interface HelmetCtx {
  helmet?: {
    title: { toString(): string };
    meta: { toString(): string };
    link: { toString(): string };
    script: { toString(): string };
  };
}

export interface RenderResult {
  html: string;
  head: string;
}

// Folgt Vites base-Pfad (z. B. /repo-name auf GitHub Pages; root = '').
// Muss zum Client-basename in App.tsx passen, damit die vorgerenderten
// Links denselben Pfad-Präfix tragen wie nach der Hydration.
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Rendert eine Route zu statischem HTML (für SSG/Prerendering).
 * renderToPipeableStream + onAllReady löst React.lazy/Suspense vollständig
 * auf, sodass der komplette Seiteninhalt im HTML landet. Helmet-Tags werden
 * nach dem Render aus dem Context gelesen.
 */
export function render(url: string): Promise<RenderResult> {
  // StaticRouter erwartet die volle Location inkl. basename und strippt ihn
  // intern wieder ab. Ohne diesen Präfix würden alle <Link>s im statischen
  // HTML ohne base-Pfad gerendert → 404 auf GitHub Pages vor der Hydration.
  const location = `${BASENAME}${url}`;
  return new Promise((resolve, reject) => {
    const helmetContext: HelmetCtx = {};
    let html = '';
    const writable = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        cb();
      },
    });

    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      <ErrorBoundary>
        <HelmetProvider context={helmetContext as never}>
          <StaticRouter basename={BASENAME || undefined} location={location}>
            <AppRoutes />
          </StaticRouter>
        </HelmetProvider>
      </ErrorBoundary>,
      {
        onAllReady() {
          pipe(writable);
          writable.on('finish', () => {
            if (didError) return;
            const { helmet } = helmetContext;
            const head = helmet
              ? [
                  helmet.title.toString(),
                  helmet.meta.toString(),
                  helmet.link.toString(),
                  helmet.script.toString(),
                ].join('')
              : '';
            resolve({ html, head });
          });
        },
        onShellError(err) {
          didError = true;
          reject(err);
        },
        onError(err) {
          didError = true;
          reject(err);
        },
      }
    );

    // Sicherheitsnetz gegen hängende Renders.
    setTimeout(() => abort(), 12000);
  });
}
