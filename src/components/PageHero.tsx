import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import ButtonLink from '@/components/ui/Button';
import { SITE } from '@/lib/site';
import { unsplashSrcSet } from '@/lib/images';
import { jsonLd } from '@/lib/jsonld';
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
}

/**
 * Gemeinsamer dunkler Seiten-Hero: Bild mit Navy-Scrim, Brotkrumen,
 * Eyebrow, Editorial-Headline und Conversion-CTAs.
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
            { '@type': 'ListItem', position: 1, name: 'Start', item: SITE.url },
            ...crumbs.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: crumb.label,
              item: `${SITE.url}${crumb.href ?? pathname}`,
            })),
          ],
        }
      : null;

  return (
    <section
      className={`relative bg-navy text-white overflow-hidden grain ${
        compact ? 'pt-36 pb-16 lg:pt-44 lg:pb-24' : 'pt-36 pb-20 lg:pt-48 lg:pb-32'
      }`}
    >
      {/* Hintergrund: Foto mit Duotone-Scrim oder Blueprint-Raster */}
      <div className="absolute inset-0">
        {image ? (
          <>
            <img
              src={image}
              srcSet={unsplashSrcSet(image)}
              sizes="100vw"
              alt={imageAlt}
              className="w-full h-full object-cover opacity-40"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
          </>
        ) : (
          <div className="absolute inset-0 blueprint-grid opacity-60" />
        )}
      </div>

      {breadcrumbSchema && (
        <Helmet>
          <script type="application/ld+json">{jsonLd(breadcrumbSchema)}</script>
        </Helmet>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            aria-label="Brotkrumen"
            className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-blue-100/70 mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Start
            </Link>
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="opacity-50" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="eyebrow text-mint mb-6">
              <span className="h-px w-8 bg-mint/50" />
              {eyebrow}
            </span>
          )}
          <h1 className="display-xl text-white mb-7">{title}</h1>
          {lead && <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-medium max-w-2xl">{lead}</p>}

          {(cta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {cta && (
                <ButtonLink to={cta.to} size="lg" arrow>
                  {cta.label}
                </ButtonLink>
              )}
              {secondaryCta && (
                <ButtonLink
                  to={secondaryCta.to}
                  href={secondaryCta.href ?? (secondaryCta.to ? undefined : SITE.phoneHref)}
                  onClick={secondaryCta.onClick}
                  variant="outline-light"
                  size="lg"
                >
                  {secondaryCta.label}
                </ButtonLink>
              )}
            </div>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
