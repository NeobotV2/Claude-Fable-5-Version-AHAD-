import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ButtonLink from '@/components/ui/Button';
import HeadlineText from '@/components/ui/HeadlineText';
import { SITE } from '@/lib/site';
import { srcSetFor } from '@/lib/images';
import { jsonLd } from '@/lib/jsonld';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  cta?: { label: string; to: string };
  secondaryCta?: { label: string; to?: string; href?: string; onClick?: (e: React.MouseEvent) => void };
  children?: ReactNode;
  compact?: boolean;
  titleSize?: 'xl' | 'lg';
}

/**
 * Gemeinsamer Seitenkopf aller Unterseiten: Brotkrumen, Rubrikzeile,
 * Überschrift, Einleitung und die Wege zur Anfrage — auf Weiß.
 *
 * Mit Bild ist der Kopf zweispaltig: Text links, das Foto rechts in voller
 * Farbe bis an den Seitenrand (auf kleinen Bildschirmen darunter). Auf dem
 * Foto steht kein Text und keine Überlagerung. pt-16 = Höhe der Kopfzeile.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = '',
  crumbs,
  cta,
  secondaryCta,
  children,
  compact = false,
  titleSize = 'xl',
}: PageHeroProps) {
  const { pathname } = useLocation();

  // BreadcrumbList-Schema aus den sichtbaren Brotkrumen — stärkt
  // Suchergebnis-Darstellung (Sitelinks) und Kontext für LLM-Crawler.
  const breadcrumbSchema =
    crumbs && crumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE.url}/` },
            ...crumbs.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: crumb.label,
              item: `${SITE.url}${crumb.href ?? pathname}`,
            })),
          ],
        }
      : null;

  const text = (
    <div
      className={cn(
        'w-full px-4 sm:px-8',
        image ? 'lg:max-w-[calc(40rem+8.333vw)] lg:pr-14' : 'max-w-7xl mx-auto',
        compact ? 'py-9 sm:section-y-sm' : 'py-10 sm:section-y-sm'
      )}
    >
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Brotkrumen" className="flex flex-wrap items-center gap-x-2 text-caption text-slate mb-3">
          {/* py-3: Trefferfläche 44 px hoch, ohne die Zeile optisch zu vergrößern */}
          <Link to="/" className="py-3 hover:text-accent transition-colors">
            Start
          </Link>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-navy/30">
                /
              </span>
              {crumb.href ? (
                <Link to={crumb.href} className="py-3 hover:text-accent transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-navy">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className={image ? undefined : 'max-w-[52rem]'}>
        {eyebrow && <p className="eyebrow text-accent mb-3">{eyebrow}</p>}
        <h1 className={cn(titleSize === 'lg' ? 'display-lg' : 'display-xl page-title', 'text-navy')}>
          {typeof title === 'string' ? <HeadlineText text={title} /> : title}
        </h1>
        {lead && <p className="mt-5 sm:mt-6 text-lead sm:text-xl text-slate leading-relaxed max-w-2xl">{lead}</p>}

        {(cta || secondaryCta) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-8">
            {cta && (
              <ButtonLink to={cta.to} size="lg" arrow className="w-full sm:w-auto">
                {cta.label}
              </ButtonLink>
            )}
            {secondaryCta && (
              <ButtonLink
                to={secondaryCta.to}
                href={secondaryCta.href ?? (secondaryCta.to ? undefined : SITE.phoneHref)}
                onClick={secondaryCta.onClick}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );

  return (
    <section className="bg-white border-b border-line pt-16">
      {breadcrumbSchema && (
        <Helmet>
          <script type="application/ld+json">{jsonLd(breadcrumbSchema)}</script>
        </Helmet>
      )}

      {image ? (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="flex lg:justify-end">{text}</div>
          <div className="relative aspect-[3/2] lg:aspect-auto bg-navy/5">
            <img
              src={image}
              srcSet={srcSetFor(image)}
              sizes="(min-width: 1024px) 42vw, 100vw"
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              // LCP-Kandidat jeder Unterseite – React 18 reicht nur lowercase `fetchpriority` durch
              {...{ fetchpriority: 'high' }}
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      ) : (
        text
      )}
    </section>
  );
}
