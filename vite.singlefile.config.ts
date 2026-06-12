import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';

/**
 * Baut die komplette Seite als EINE doppelklickbare HTML-Datei
 * (Vorschau ohne Server). Aufruf: npm run build:file
 * Bilder & Fonts laden aus dem Internet; Navigation läuft über den HashRouter.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-file',
    chunkSizeWarningLimit: 6000,
  },
});
