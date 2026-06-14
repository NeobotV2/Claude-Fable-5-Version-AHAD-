import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  recovering: boolean;
}

const RELOAD_GUARD_KEY = 'ahad:chunk-reload';

/**
 * Erkennt fehlgeschlagene dynamische Imports. Typischer Fall: Ein neuer Deploy
 * vergibt neue gehashte Chunk-Dateinamen; ein bereits geöffneter Tab fragt dann
 * eine alte, nicht mehr existierende Datei an → der lazy-Import schlägt fehl.
 */
function isChunkLoadError(error?: Error | null): boolean {
  if (!error) return false;
  const text = `${error.name}: ${error.message}`;
  return /ChunkLoadError|Loading chunk|dynamically imported module|Importing a module script failed|Failed to fetch/i.test(
    text,
  );
}

/** Einmaliges automatisches Neuladen erlauben (Schutz gegen Endlosschleife). */
function canReloadOnce(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_GUARD_KEY) || '0');
    return Date.now() - last > 10000;
  } catch {
    return false;
  }
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      recovering: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Chunk-Ladefehler heilen wir still durch einmaliges Neuladen, statt dem
    // Nutzer die rote Fehlerseite zu zeigen.
    return { hasError: true, error, recovering: isChunkLoadError(error) && canReloadOnce() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.state.recovering && typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
      } catch {
        /* sessionStorage nicht verfügbar — dann zeigt render() die Fehlerseite */
      }
      window.location.reload();
      return;
    }
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Neutraler Übergang, während mit frischen Dateien neu geladen wird.
      if (this.state.recovering) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-[#0B2341] animate-spin" />
              Aktualisierung läuft …
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100">
            <h1 className="text-2xl font-black text-red-600 mb-4">Etwas ist schief gelaufen</h1>
            <p className="text-gray-600 mb-6 font-medium">
              Die Anwendung konnte nicht geladen werden. Bitte laden Sie die Seite neu oder kontaktieren Sie den Support.
            </p>
            <div className="bg-red-50 p-4 rounded-lg mb-6 overflow-auto max-h-40">
              <code className="text-xs text-red-800">{this.state.error?.message}</code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#0B2341] text-white py-3 rounded-xl font-bold hover:bg-[#1C4576] transition-all"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
