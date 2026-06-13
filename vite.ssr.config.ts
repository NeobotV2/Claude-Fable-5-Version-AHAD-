import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

/**
 * Separater SSR-Build für das Prerendering (npm run build:ssg).
 * Erzeugt dist-server/entry-server.js, das scripts/prerender.mjs nutzt,
 * um jede Route zu statischem HTML zu rendern. Der normale `npm run build`
 * (Client-SPA) bleibt davon unberührt.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  ssr: {
    // Diese Pakete in den SSR-Bundle ziehen, um ESM/Interop-Probleme im
    // Node-Render zu vermeiden.
    noExternal: ['motion', 'react-helmet-async', 'lucide-react', 'clsx', 'tailwind-merge'],
  },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-server',
    emptyOutDir: true,
    rollupOptions: { output: { format: 'es' } },
  },
});
