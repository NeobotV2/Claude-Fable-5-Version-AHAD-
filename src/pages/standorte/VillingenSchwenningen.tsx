import { MapPin, CheckCircle2, Phone, Mail, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

export default function StandortVS() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AHAD Cleaning Company GmbH - Villingen-Schwenningen",
    "image": `${SITE.url}/images/ahad/hero-hq.webp`,
    "@id": "https://ahad-cleaning.de/standorte/villingen-schwenningen",
    "url": "https://ahad-cleaning.de/standorte/villingen-schwenningen",
    "telephone": "+4977219447915",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Max-Planck-Straße 11",
      "addressLocality": "Villingen-Schwenningen",
      "postalCode": "78052",
      "addressCountry": "DE"
    },
    "priceRange": "€€",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.0603,
      "longitude": 8.4586
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
        title="Gebäudereinigung Villingen-Schwenningen" 
        description="Professionelle Gebäudereinigung in Villingen-Schwenningen. AHAD Cleaning ist Ihr zuverlässiger Partner für Unterhaltsreinigung und Industriereinigung in der Region."
        keywords="Gebäudereinigung Villingen-Schwenningen, Reinigungsservice VS, Unterhaltsreinigung VS"
        schema={localBusinessSchema}
      />
      <PageHero
        eyebrow="Zentrale · Schwarzwald-Baar-Kreis"
        title="Gebäudereinigung in Villingen-Schwenningen"
        lead="Von unserem Hauptstandort in Villingen-Schwenningen aus betreuen wir Unternehmen in der gesamten Region Schwarzwald-Baar, Donaueschingen, Rottweil, Tuttlingen, Bad Dürrheim, St. Georgen und Trossingen."
        image={IMG.heroArchitecture}
        imageAlt="AHAD Cleaning Zentrale in Villingen-Schwenningen"
        crumbs={[{ label: 'Standorte', href: '/standorte' }, { label: 'Villingen-Schwenningen' }]}
        cta={{ label: 'Angebot in 24h anfordern', to: '/angebot' }}
        secondaryCta={{ label: SITE.phone, href: SITE.phoneHref }}
      />

      {/* Content Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Ihre Experten vor Ort</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Als regional verwurzeltes Unternehmen kennen wir die Anforderungen 
                der hiesigen Wirtschaft. Wir bieten kurze Wege, schnelle 
                Reaktionszeiten und eine persönliche Betreuung durch unsere 
                Objektleiter vor Ort.
              </p>
              <ul className="space-y-4">
                {[
                  'Zentrale Steuerung aller regionalen Teams',
                  'Kurze Anfahrtswege für maximale Flexibilität',
                  'Persönliche Ansprechpartner in der Region',
                  'Umfassendes Leistungsangebot vor Ort',
                  'Notfall-Service für Bestandskunden',
                  'Regionale Marktkenntnis & Vernetzung'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#0B2341]">Kontaktdaten Zentrale</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-gray-600">Max-Planck-Straße 11<br />78052 Villingen-Schwenningen</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                    <p className="text-gray-600">+49 7721 944 79 15</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">E-Mail</h4>
                    <p className="text-gray-600">vs@ahad-cleaning.de</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B2341] flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Bürozeiten</h4>
                    <p className="text-gray-600">Mo - Fr: 08:00 - 17:00 Uhr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warum AHAD in VS */}
          <div className="bg-[#0B2341] rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Warum AHAD Cleaning in Villingen-Schwenningen?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  In Villingen-Schwenningen schlägt das Herz unseres Unternehmens. Von hier aus steuern wir unsere 
                  Qualitätssicherung für den gesamten süddeutschen Raum. Unsere tiefe Verwurzelung in der Region 
                  Schwarzwald-Baar garantiert Ihnen nicht nur höchste Zuverlässigkeit, sondern auch eine Partnerschaft 
                  auf Augenhöhe mit Handschlagqualität.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Unternehmenszentrale vor Ort</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#0D6B38] w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="font-medium">Maximale Flexibilität & Tempo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ihr Objekt in Villingen-Schwenningen?"
        lead="Kurze Wege ab Zentrale: Besichtigung in 48 Stunden, belastbares Angebot in 24 Stunden danach."
      />
    </div>
  );
}
