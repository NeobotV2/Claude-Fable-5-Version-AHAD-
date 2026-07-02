import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { jsonLd } from '@/lib/jsonld';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export default function SEO({ title, description, keywords, schema, noindex }: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://ahad-cleaning.de';
  const canonicalUrl = `${baseUrl}${location.pathname}`;
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
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AHAD Cleaning" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="AHAD Cleaning Company — Gebäudereinigung für Süddeutschland" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />

      {schema && (
        <script type="application/ld+json">
          {jsonLd(schema)}
        </script>
      )}
    </Helmet>
  );
}
