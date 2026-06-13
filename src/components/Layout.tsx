import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StickyCTA from './StickyCTA';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>
      <Header />
      {/* Kein globales Padding: jede Seite beginnt mit einem dunklen Hero,
          der den Header-Versatz selbst mitbringt. */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
    </div>
  );
}
