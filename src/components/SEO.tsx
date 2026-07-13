import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { jsonLd } from '@/lib/jsonld';
import { SITE } from '@/lib/site';
import routeManifest from '@/route-manifest.json';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export default function SEO({ title, description, keywords, schema, noindex }: SEOProps) {
  const location = useLocation();
  const canonicalPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const canonicalUrl = `${SITE.url}${canonicalPath}`;
  const routePolicy = routeManifest.pages.find((page) => page.path === canonicalPath);
  const shouldNoindex = Boolean(noindex || routePolicy?.index === false);
  // Brand-Suffix nur anhängen, wenn der Titel nicht schon mit "| AHAD" bzw.
  // "| AHAD Cleaning" endet — sonst entsteht "… | AHAD | AHAD Cleaning".
  const fullTitle = /\|\s*AHAD(\s+Cleaning)?\s*$/.test(title) || title.includes('AHAD Cleaning')
    ? title
    : `${title} | AHAD Cleaning`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={shouldNoindex ? 'noindex, follow' : 'index, follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AHAD Cleaning" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE.url}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="AHAD Cleaning Company — Gebäudereinigung für Süddeutschland" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE.url}/og-image.jpg`} />

      {schema && (
        <script type="application/ld+json">
          {jsonLd(schema)}
        </script>
      )}
    </Helmet>
  );
}
