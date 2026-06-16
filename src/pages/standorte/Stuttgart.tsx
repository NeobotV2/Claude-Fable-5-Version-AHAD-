import { MapPin, CheckCircle2, Phone, Mail, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

export default function StandortStuttgart() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AHAD Cleaning Company GmbH - Stuttgart",
    "image": `${SITE.url}/images/ahad/stuttgart.webp`,
    "@id": "https://ahad-cleaning.de/standorte/stuttgart",
    "url": "https://ahad-cleaning.de/standorte/stuttgart",
    "telephone": "+4977219447915",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Humboldtstraße 27",
      "addressLocality": "Echterdingen",
      "postalCode": "70771",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.7758,
      "longitude": 9.1829
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <div>
      <SEO 
        title="Gebäudereinigung Stuttgart" 
        description="Professionelle Gebäudereinigung in Stuttgart. Wir bieten maßgeschneiderte Reinigungskonzepte für Industrie, Gewerbe und Verwaltung in der Landeshauptstadt."
        keywords="Gebäudereinigung Stuttgart, Reinigungsservice Stuttgart, Büroreinigung Stuttgart"
        schema={localBusinessSchema}
      />
      <PageHero
        eyebrow="Landeshauptstadt & Umland"
        title="Gebäudereinigung in Stuttgart"
        lead="Von unserem Stuttgarter Standort aus bedienen wir Ludwigsburg, Esslingen, Böblingen, Sindelfingen, Waiblingen, Leonberg und den gesamten Großraum Stuttgart."
        image={IMG.stuttgart}
        imageAlt="Stuttgart — Schlossplatz mit Neuem Schloss"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Stuttgart' }]}
        cta={{ label: 'Angebot in 24h anfordern', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Expertise für den Standort Stuttgart</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Stuttgart ist ein Zentrum für Industrie und Verwaltung. 
                Wir bieten maßgeschneiderte Reinigungskonzepte, die den 
                hohen Anforderungen dieser Region gerecht werden.
              </p>
              <ul className="space-y-4">
                {[
                  'Spezialisierte Industriereinigung für Produktionsbetriebe',
                  'Professionelle Büroreinigung für Verwaltungsgebäude',
                  'Glas- & Fassadenreinigung für moderne Architektur',
                  'Termingerechte Baureinigung für Neubauprojekte',
                  'Regionale Präsenz & schnelle Reaktionszeiten',
                  'Qualitätsmanagement nach höchsten Standards'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontakt Region Stuttgart</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">Humboldtstraße 27<br />70771 Echterdingen</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                    <p className="text-gray-600">+49 (0) 7721 944 79 15</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">E-Mail</h4>
                    <p className="text-gray-600">info@ahad-cleaning.de</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warum AHAD in Stuttgart */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Stuttgart?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Die Region Stuttgart ist geprägt von Weltmarktführern und hochspezialisierten Mittelständlern. 
                  Unsere Nähe zum Flughafen und zur Autobahn ermöglicht uns extrem kurze Reaktionszeiten für Kunden in 
                  den Industriegebieten Filderstadt, Sindelfingen und Ludwigsburg.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Lokale Teams mit Ortskenntnis</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Erfahrung mit Industrie-Standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt im Großraum Stuttgart?"
        lead="Regionales Team, feste Objektleitung: Besichtigung in 48 Stunden, Angebot in 24 Stunden danach."
      />
    </div>
  );
}
