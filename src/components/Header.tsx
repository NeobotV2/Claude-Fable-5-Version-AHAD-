import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronDown, Menu, X, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import ButtonLink, { buttonClasses } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

interface SubLink {
  name: string;
  href: string;
  description?: string;
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
      { name: 'Unterhaltsreinigung', href: '/leistungen/unterhaltsreinigung', description: 'Büros und Objekte nach festem Plan' },
      { name: 'Industriereinigung', href: '/leistungen/industrie-produktionsreinigung', description: 'Reinigung im laufenden Betrieb' },
      { name: 'Glas- & Fassadenreinigung', href: '/leistungen/glas-fassadenreinigung', description: 'Werterhalt der Gebäudehülle' },
      { name: 'Baureinigung', href: '/leistungen/baureinigung', description: 'Termingerechte Übergaben' },
      { name: 'Medizintechnik & Reinraum', href: '/leistungen/medizintechnik-reinigung', description: 'Mit Nachweisen für Audits' },
      { name: 'Sonderreinigung', href: '/leistungen/sonderreinigung-stillstandsservice', description: 'Grundreinigung & Stillstand' },
      { name: 'Winterdienst & Hausmeister', href: '/leistungen/winterdienst-hausmeisterservice', description: 'Verkehrssicher durchs Jahr' },
      { name: 'Küchenabluftreinigung', href: '/leistungen/kuechenabluftreinigung-vdi-2052', description: 'Nach VDI 2052, mit Nachweis' },
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
      { name: 'Aktuelles', href: '/aktuelles' },
      { name: 'Kontakt', href: '/kontakt' },
    ],
  },
];

/**
 * Header — eine ruhige weiße Leiste: Logo, Navigation, Telefon, Anfrage.
 * Bewusst immer hell, damit das farbige Markenlogo auf jeder Seite korrekt
 * steht. Feste Höhe 64px (h-16); die Seiten-Heros rechnen mit pt-16.
 */
export default function Header() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const headerChromeRef = useRef<HTMLDivElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const restoreFocusOnCloseRef = useRef(true);
  const desktopToggleRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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
      {/* Hauptleiste — immer weiß, Logo in Markenfarben */}
        <div className="bg-white border-b border-line">
        <nav className="flex justify-between items-center px-4 sm:px-8 h-16 w-full max-w-7xl mx-auto">
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
                    'flex items-stretch text-nav font-medium transition-colors',
                    (link.href !== '/' && location.pathname.startsWith(link.href)) ||
                      link.sublinks?.some((sub) => location.pathname.startsWith(sub.href))
                      ? 'text-accent'
                      : 'text-ink hover:text-accent'
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
                        className={cn('w-3.5 h-3.5 transition-transform duration-150', activeDropdown === link.name && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>

                <>
                  {link.sublinks && activeDropdown === link.name && (
                    <div
                      id={`desktop-submenu-${index}`}
                      className={cn(
                        'absolute top-full bg-white shadow-lifted border border-line overflow-hidden z-50 animate-fade-in',
                        link.mega ? 'left-0 w-[720px]' : 'left-0 w-64'
                      )}
                    >
                      {link.mega ? (
                        <div className="grid grid-cols-[1fr_16rem]">
                          {/* Zwei gleich breite Spalten: Name oben, Erläuterung darunter. */}
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-x-2">
                              {link.sublinks.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group/item block px-3 py-3 hover:bg-paper transition-colors"
                                >
                                  <span className="block text-nav font-semibold text-navy whitespace-nowrap group-hover/item:text-accent transition-colors">
                                    {sub.name}
                                  </span>
                                  <span className="block mt-0.5 text-caption text-slate">{sub.description}</span>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-2 mx-3 pt-3 border-t border-line">
                              <Link to={link.href} onClick={() => setActiveDropdown(null)} className="text-link text-nav">
                                Alle Leistungen im Überblick
                                <ArrowRight size={15} aria-hidden="true" />
                              </Link>
                            </div>
                          </div>
                          <div className="bg-navy text-white p-6 flex flex-col">
                            <span className="eyebrow text-mint mb-2">In drei Schritten</span>
                            <p className="font-semibold text-lead leading-snug">
                              Anforderungen klären, Besichtigung, Angebot.
                            </p>
                            <ButtonLink
                              to="/angebot"
                              variant="mint"
                              arrow
                              onClick={() => setActiveDropdown(null)}
                              className="mt-auto w-full whitespace-nowrap px-3 py-2.5 text-sm"
                            >
                              Besichtigung anfragen
                            </ButtonLink>
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">
                          {link.sublinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-5 py-2.5 text-nav font-medium text-ink hover:bg-paper hover:text-accent transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="hidden xl:flex items-center gap-2 flex-shrink-0 whitespace-nowrap font-semibold text-nav text-navy hover:text-accent transition-colors mr-2"
            >
              <Phone size={16} aria-hidden="true" />
              {SITE.phone}
            </a>
            {/* Bis xl gibt es keine ausgeschriebene Nummer – das Icon bleibt deshalb
                auch auf lg-Breiten sichtbar (die Sticky-Leiste endet dort). */}
            <a
              href={SITE.phoneHref}
              className="xl:hidden p-2.5 text-navy hover:text-accent transition-colors"
              aria-label="Anrufen"
            >
              <Phone size={20} aria-hidden="true" />
            </a>

            <ButtonLink to="/angebot" arrow className="hidden sm:inline-flex flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-nav">
              Besichtigung anfragen
            </ButtonLink>

            <button
              ref={mobileMenuTriggerRef}
              type="button"
              className="lg:hidden p-2.5 text-navy hover:text-accent transition-colors"
              onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-haspopup="dialog"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-dialog"
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </nav>
        </div>
      </div>

      {/* Mobile-Menü */}
      <>
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-navy/60 z-[60] lg:hidden animate-fade-in"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <div
              ref={mobileDialogRef}
              id="mobile-navigation-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Hauptnavigation"
              tabIndex={-1}
              className="fixed inset-y-0 right-0 h-dvh w-[88%] max-w-sm bg-white z-[70] lg:hidden shadow-lifted flex flex-col animate-slide-in-right"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-line flex-shrink-0">
                <Logo size={34} onClick={closeMobileMenuForNavigation} />
                <button
                  ref={mobileCloseRef}
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 text-slate hover:text-navy hover:bg-paper rounded-lg transition-colors"
                  aria-label="Menü schließen"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto overscroll-contain px-6 py-4">
                <div className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <div key={link.name} className="flex flex-col border-b border-line last:border-0">
                      {link.sublinks ? (
                        <button
                          type="button"
                          onClick={() => setMobileActiveDropdown(mobileActiveDropdown === link.name ? null : link.name)}
                          className={cn(
                            'text-lg font-semibold tracking-tight py-4 text-left flex justify-between items-center',
                            location.pathname.startsWith(link.href) ? 'text-accent' : 'text-navy'
                          )}
                          aria-expanded={mobileActiveDropdown === link.name}
                          aria-controls={`mobile-submenu-${i}`}
                        >
                          {link.name}
                          <ChevronDown
                            className={cn(
                              'w-5 h-5 transition-transform duration-300 text-slate',
                              mobileActiveDropdown === link.name && 'rotate-180'
                            )} aria-hidden="true" />
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          className={cn(
                            'text-lg font-semibold tracking-tight py-4',
                            location.pathname.startsWith(link.href) ? 'text-accent' : 'text-navy'
                          )}
                          onClick={closeMobileMenuForNavigation}
                        >
                          {link.name}
                        </Link>
                      )}

                      <>
                        {link.sublinks && mobileActiveDropdown === link.name && (
                          <div
                            id={`mobile-submenu-${i}`}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pb-3">
                              <Link
                                to={link.href}
                                className="px-4 py-3 text-sm font-semibold text-accent bg-paper mb-1"
                                onClick={closeMobileMenuForNavigation}
                              >
                                {link.name}: Übersicht
                              </Link>
                              {link.sublinks.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  className="px-4 py-3 text-body-sm font-medium text-ink hover:text-accent transition-colors"
                                  onClick={closeMobileMenuForNavigation}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-line flex-shrink-0 space-y-3">
                <ButtonLink to="/angebot" size="lg" arrow className="w-full" onClick={closeMobileMenuForNavigation}>
                  Besichtigung anfragen
                </ButtonLink>
                <a href={SITE.phoneHref} className={buttonClasses('outline', 'lg', 'w-full')}>
                  <Phone size={16} aria-hidden="true" />
                  {SITE.phone}
                </a>
                <p className="text-center text-caption text-slate">{SITE.hours}</p>
              </div>
            </div>
          </>
        )}
      </>
    </header>
  );
}
