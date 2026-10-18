import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Die Seiten sind vorgerendert und sofort lesbar. Das Hydrations-JS soll Hero-Bild
 * und Webfonts deshalb nicht die Bandbreite streitig machen: Entry-Script und
 * Modulepreloads laden mit niedriger Priorität (gemessen: mobil FCP ~2,7 s → ~1,1 s).
 */
function lowPriorityHydration(): Plugin {
  return {
    name: 'ahad-low-priority-hydration',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) =>
        html
          .replace(/<script type="module" crossorigin src=/g, '<script type="module" crossorigin fetchpriority="low" src=')
          .replace(/<link rel="modulepreload" crossorigin href=/g, '<link rel="modulepreload" crossorigin fetchpriority="low" href='),
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), lowPriorityHydration()],
  // Für Deployments in Unterverzeichnissen (z.B. GitHub Pages) per ENV setzbar.
  base: process.env.BASE_PATH || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
});
