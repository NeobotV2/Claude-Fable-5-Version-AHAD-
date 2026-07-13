import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Clock,
  ShieldCheck,
  LayoutDashboard,
  Factory,
  Building2,
  HardHat,
  Microscope,
  Sparkles,
  Snowflake,
  ArrowRight,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { SITE } from '@/lib/site';

interface SubLink {
  name: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  mega?: boolean;
  sublinks?: SubLink[];
}

const navLinks: NavItem[] = [
  {
    name: 'Leistungen',
    href: '/leistungen',
    mega: true,
    sublinks: [
      { name: 'Unterhaltsreinigung', href: '/leistungen/unterhaltsreinigung', description: 'Planbar saubere Büros & Objekte', icon: <LayoutDashboard size={18} /> },
      { name: 'Industriereinigung', href: '/leistungen/industrie-produktionsreinigung', description: 'Reinigung im laufenden Betrieb', icon: <Factory size={18} /> },
      { name: 'Glas- & Fassadenreinigung', href: '/leistungen/glas-fassadenreinigung', description: 'Werterhalt der Gebäudehülle', icon: <Building2 size={18} /> },
      { name: 'Baureinigung', href: '/leistungen/baureinigung', description: 'Termingerechte Übergaben', icon: <HardHat size={18} /> },
      { name: 'Medizintechnik & Reinraum', href: '/leistungen/medizintechnik-reinigung', description: 'Dokumentiert & auditfähig', icon: <Microscope size={18} /> },
      { name: 'Sonderreinigung', href: '/leistungen/sonderreinigung-stillstandsservice', description: 'Grundreinigung & Stillstand', icon: <Sparkles size={18} /> },
      { name: 'Winterdienst & Hausmeister', href: '/leistungen/winterdienst-hausmeisterservice', description: 'Verkehrssicher durchs Jahr', icon: <Snowflake size={18} /> },
    ],
  },
  {
    name: 'Branchen',
    href: '/branchen',
    sublinks: [
      { name: 'Industrie & Produktion', href: '/branchen/industrie-produktion' },
      { name: 'Medizintechnik', href: '/branchen/medizintechnik' },
      { name: 'Büro & Verwaltung', href: '/branchen/buero-verwaltung' },
      { name: 'Gewerbeobjekte', href: '/branchen/gewerbeobjekte' },
      { name: 'Hotellerie & Objektbetrieb', href: '/branchen/hotellerie-objektbetrieb' },
    ],
  },
  { name: 'AHAD System', href: '/ahad-system' },
  { name: 'Referenzen', href: '/referenzen' },
  {
    name: 'Unternehmen',
    href: '/unternehmen',
    sublinks: [
      { name: 'Über uns', href: '/unternehmen' },
      { name: 'Standorte', href: '/standorte' },
      { name: 'Karriere', href: '/karriere' },
      { name: 'Fachwissen', href: '/fachwissen' },
      { name: 'Kontakt', href: '/kontakt' },
    ],
  },
];

/**
 * Header — bewusst immer hell, damit das farbige Markenlogo
 * (Verlaufs-Version) auf jeder Seite korrekt steht. Die Utility-Bar
 * mit Erreichbarkeit kollabiert beim Scrollen.
 */
export default function Header() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerChromeRef = useRef<HTMLDivElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const restoreFocusOnCloseRef = useRef(true);
  const desktopToggleRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMobileMenu = () => {
    restoreFocusOnCloseRef.current = true;
    setIsMobileMenuOpen(true);
  };
  // useCallback: stabile Referenz, damit die Effekte unten sie sauber als
  // Dependency führen können, ohne bei jedem Render neu zu laufen.
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileActiveDropdown(null);
  }, []);

  const closeMobileMenuForNavigation = useCallback(() => {
    restoreFocusOnCloseRef.current = false;
    closeMobileMenu();
  }, [closeMobileMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const bodyOverflow = document.body.style.overflow;
    const menuTrigger = mobileMenuTriggerRef.current;
    const backgroundElements = [
      headerChromeRef.current,
      document.querySelector<HTMLElement>('#main-content'),
      document.querySelector<HTMLElement>('footer'),
      ...document.querySelectorAll<HTMLElement>('.skip-link, [data-page-action]'),
    ].filter((element): element is HTMLElement => Boolean(element));
    const previousStates = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute('aria-hidden'),
    }));

    document.body.style.overflow = 'hidden';
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });

    const getFocusableElements = () =>
      Array.from(
        mobileDialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => !element.hasAttribute('hidden'));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        mobileDialogRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const focusFrame = window.requestAnimationFrame(() => mobileCloseRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = bodyOverflow;
      previousStates.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', ariaHidden);
      });
      if (restoreFocusOnCloseRef.current) {
        window.requestAnimationFrame(() => menuTrigger?.focus());
      }
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) closeMobileMenu();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Bei Routenwechsel Menü schließen
  useEffect(() => {
    restoreFocusOnCloseRef.current = false;
    closeMobileMenu();
    setActiveDropdown(null);
  }, [location.pathname, closeMobileMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div ref={headerChromeRef}>
        {/* Utility-Bar: Erreichbarkeit & Versprechen */}
        <div
        className={cn(
          'hidden lg:block overflow-hidden transition-all duration-500',
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        )}
      >
        <div className="bg-navy text-blue-100/90 text-[12.5px] font-semibold border-b border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-2 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-black uppercase tracking-[0.16em] text-mint text-[11px]">
                Sauberkeit mit System.
              </span>
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-mint" />
                {SITE.hours}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-mint" />
                Persönliche Rückmeldung
              </span>
            </div>
            {/* Telefon steht prominent in der Hauptleiste — hier nur E-Mail, keine Dopplung */}
            <a href={SITE.emailHref} className="hover:text-white transition-colors">
              {SITE.email}
            </a>
          </div>
        </div>
        </div>

      {/* Hauptleiste — immer weiß, Logo in Markenfarben */}
        <div className={cn('bg-white/95 backdrop-blur-md border-b transition-shadow duration-300', scrolled ? 'shadow-soft border-line' : 'border-line/70')}>
        <nav className="flex justify-between items-center px-4 md:px-8 py-3 w-full max-w-7xl mx-auto">
          <Logo size={38} />

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.sublinks && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveDropdown(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && activeDropdown === link.name) {
                    event.preventDefault();
                    setActiveDropdown(null);
                    desktopToggleRefs.current[link.name]?.focus();
                  }
                }}
              >
                <div
                  className={cn(
                    'flex items-stretch text-[13.5px] font-semibold tracking-tight transition-colors rounded-lg',
                    location.pathname.startsWith(link.href) && link.href !== '/'
                      ? 'text-brand bg-brand/5'
                      : 'text-slate hover:text-brand hover:bg-brand/5'
                  )}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'flex items-center py-2.5 whitespace-nowrap',
                      link.sublinks ? 'pl-3.5 pr-1' : 'px-3.5',
                    )}
                  >
                    {link.name}
                  </Link>
                  {link.sublinks && (
                    <button
                      ref={(element) => {
                        desktopToggleRefs.current[link.name] = element;
                      }}
                      type="button"
                      className="flex items-center pl-1 pr-3.5 rounded-r-lg"
                      aria-label={`${link.name}: Untermenü ${activeDropdown === link.name ? 'schließen' : 'öffnen'}`}
                      aria-expanded={activeDropdown === link.name}
                      aria-controls={`desktop-submenu-${index}`}
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          setActiveDropdown(link.name);
                          window.requestAnimationFrame(() => {
                            document.querySelector<HTMLElement>(`#desktop-submenu-${index} a`)?.focus();
                          });
                        }
                      }}
                    >
                      <ChevronDown
                        className={cn('w-3.5 h-3.5 transition-transform duration-300', activeDropdown === link.name && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {link.sublinks && activeDropdown === link.name && (
                    <motion.div
                      id={`desktop-submenu-${index}`}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.2, 0.65, 0.3, 1] }}
                      className={cn(
                        'absolute top-full bg-white shadow-lifted rounded-2xl border border-line overflow-hidden z-50',
                        link.mega ? 'left-0 w-[560px]' : 'left-1/2 -translate-x-1/2 w-72'
                      )}
                    >
                      {link.mega ? (
                        <div className="grid grid-cols-2">
                          <div className="p-4 grid gap-0.5 content-start">
                            {link.sublinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group/item flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-paper transition-colors"
                              >
                                <span className="mt-0.5 w-8 h-8 rounded-lg bg-brand/8 text-brand grid place-items-center group-hover/item:bg-accent group-hover/item:text-white transition-colors flex-shrink-0">
                                  {sub.icon}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[13.5px] font-bold text-navy leading-snug">{sub.name}</span>
                                  <span className="block text-xs text-slate mt-0.5">{sub.description}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="relative bg-navy text-white p-6 flex flex-col justify-end overflow-hidden">
                            <div className="absolute inset-0 blueprint-grid opacity-60" />
                            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/30 blur-3xl" />
                            <div className="relative z-10">
                              <span className="eyebrow text-mint mb-3">In vier Schritten</span>
                              <p className="font-logo font-extrabold text-lg leading-snug mb-4">
                                Anforderungen klären · Besichtigung · Angebot.
                              </p>
                              <Link
                                to="/angebot"
                                onClick={() => setActiveDropdown(null)}
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                              >
                                Jetzt anfragen <ArrowRight size={15} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-3">
                          {link.sublinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-6 py-2.5 text-sm font-semibold text-slate hover:bg-paper hover:text-brand transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="hidden xl:flex items-center gap-2 font-bold text-sm text-brand hover:text-brand-light transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-brand/8 grid place-items-center">
                <Phone size={15} />
              </span>
              {SITE.phone}
            </a>
            <a
              href={SITE.phoneHref}
              className="lg:hidden p-2.5 rounded-xl text-brand hover:bg-brand/5 transition-colors"
              aria-label="Anrufen"
            >
              <Phone size={20} />
            </a>

            <Link
              to="/angebot"
              className="hidden sm:inline-flex items-center gap-2 bg-accent text-white pl-5 pr-4 py-2.5 font-bold text-[13px] uppercase tracking-wider hover:bg-accent-dark active:scale-95 transition-all rounded-xl shadow-glow focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
            >
              Besichtigung anfragen
              <ArrowRight size={15} />
            </Link>

            <button
              ref={mobileMenuTriggerRef}
              type="button"
              className="lg:hidden p-2.5 rounded-xl text-slate hover:bg-gray-100 transition-all"
              onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-haspopup="dialog"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-dialog"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        </div>
      </div>

      {/* Mobile-Menü */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              ref={mobileDialogRef}
              id="mobile-navigation-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Hauptnavigation"
              tabIndex={-1}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 right-0 h-dvh w-[88%] max-w-sm bg-white z-[70] lg:hidden shadow-lifted flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-line flex-shrink-0">
                <Logo size={34} onClick={closeMobileMenuForNavigation} />
                <button
                  ref={mobileCloseRef}
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 text-slate hover:text-navy hover:bg-gray-100 rounded-lg transition-all"
                  aria-label="Menü schließen"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto px-6 py-4">
                <div className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                      className="flex flex-col border-b border-line/70 last:border-0"
                    >
                      {link.sublinks ? (
                        <button
                          type="button"
                          onClick={() => setMobileActiveDropdown(mobileActiveDropdown === link.name ? null : link.name)}
                          className={cn(
                            'text-lg font-semibold tracking-tight py-4 text-left flex justify-between items-center',
                            location.pathname.startsWith(link.href) ? 'text-brand-light' : 'text-navy'
                          )}
                          aria-expanded={mobileActiveDropdown === link.name}
                          aria-controls={`mobile-submenu-${i}`}
                        >
                          {link.name}
                          <ChevronDown
                            className={cn(
                              'w-5 h-5 transition-transform duration-300 text-gray-400',
                              mobileActiveDropdown === link.name && 'rotate-180'
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className={cn(
                            'text-lg font-semibold tracking-tight py-4',
                            location.pathname.startsWith(link.href) ? 'text-brand-light' : 'text-navy'
                          )}
                          onClick={closeMobileMenuForNavigation}
                        >
                          {link.name}
                        </Link>
                      )}

                      <AnimatePresence>
                        {link.sublinks && mobileActiveDropdown === link.name && (
                          <motion.div
                            id={`mobile-submenu-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pb-3">
                              <Link
                                to={link.href}
                                className="px-4 py-3 text-sm font-bold text-brand-light bg-paper rounded-xl mb-1"
                                onClick={closeMobileMenuForNavigation}
                              >
                                {link.name} — Übersicht
                              </Link>
                              {link.sublinks.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  className="px-4 py-3 text-[15px] font-medium text-slate hover:text-brand-light transition-colors"
                                  onClick={closeMobileMenuForNavigation}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-line bg-paper/60 flex-shrink-0 space-y-3">
                <Link
                  to="/angebot"
                  className="flex items-center justify-center gap-2 w-full bg-accent text-white px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-accent-dark shadow-glow transition-all rounded-xl"
                  onClick={closeMobileMenuForNavigation}
                >
                  Besichtigung anfragen <ArrowRight size={16} />
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-center gap-2 w-full border-2 border-line bg-white text-navy px-6 py-3.5 font-bold text-sm rounded-xl"
                >
                  <Phone size={16} className="text-accent" />
                  {SITE.phone}
                </a>
                <p className="text-center text-xs text-slate font-medium">{SITE.hours}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
