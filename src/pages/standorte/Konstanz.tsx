import { MapPin, CheckCircle2, Phone, Mail, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import { SITE } from '@/lib/site';

export default function StandortKonstanz() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AHAD Cleaning Company GmbH - Konstanz",
    "image": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1600",
    "@id": "https://ahad-cleaning.de/standorte/konstanz",
    "url": "https://ahad-cleaning.de/standorte/konstanz",
    "telephone": "+4977219441444",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Brückengasse 1b",
      "addressLocality": "Konstanz",
      "postalCode": "78462",
      "addressCountry": "DE"
    },
    "priceRange": "€€",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.6603,
      "longitude": 9.1758
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
        title="Gebäudereinigung Konstanz" 
        description="Professionelle Gebäudereinigung in Konstanz und am Bodensee. Wir sind Ihr Partner für Unterhaltsreinigung, Glasreinigung und mehr."
        keywords="Gebäudereinigung Konstanz, Reinigungsservice Bodensee, Büroreinigung Konstanz"
        schema={localBusinessSchema}
      />
      <PageHero
        eyebrow="Bodenseeregion"
        title="Gebäudereinigung in Konstanz"
        lead="Wir sind Ihr Partner für professionelle Gebäudedienstleistungen in der Bodenseeregion – wir betreuen Radolfzell, Singen, Kreuzlingen, Meersburg, Überlingen, Stockach und Umgebung."
        image="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1600"
        imageAlt="Konstanz"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Konstanz' }]}
        cta={{ label: 'Kostenloses Angebot anfordern', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Sauberkeit am See</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Die Bodenseeregion ist geprägt von Tourismus, Bildung und 
                innovativem Gewerbe. Wir bieten die passende Reinigungslogik 
                für jede dieser Anforderungen.
              </p>
              <ul className="space-y-4">
                {[
                  'Reinigung für Hotellerie & Gastronomie',
                  'Professionelle Büroreinigung für Dienstleister',
                  'Glas- & Fassadenreinigung mit Seeblick',
                  'Unterhaltsreinigung für öffentliche Einrichtungen',
                  'Regionale Präsenz & Zuverlässigkeit',
                  'Umweltschonende Reinigungsmittel'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontakt Region Konstanz</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">Brückengasse 1b<br />78462 Konstanz</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                    <p className="text-gray-600">+49 (0) 7721 944 14 44</p>
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

          {/* Warum AHAD in Konstanz */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Konstanz?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Konstanz und die Bodenseeregion erfordern einen sensiblen Umgang mit der Umwelt und höchste Standards im 
                  Tourismus-Sektor. Wir betreuen Kunden von Radolfzell bis Überlingen mit spezialisierten Teams, die 
                  die logistischen Besonderheiten der Region (z.B. Altstadt-Logistik) genau kennen.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Umweltschonende Verfahren</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Spezialisierung auf Tourismus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt am Bodensee?"
        lead="Vor Ort verwurzelt: Besichtigung in 48 Stunden, belastbares Angebot in 24 Stunden danach."
      />
    </div>
  );
}
