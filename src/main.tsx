import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// Bei vorgerendertem HTML (SSG) hydrieren, sonst frisch mounten.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
