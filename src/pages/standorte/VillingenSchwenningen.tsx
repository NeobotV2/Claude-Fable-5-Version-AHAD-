import { motion } from 'motion/react';
import { MapPin, CheckCircle2, ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export default function StandortVS() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AHAD Cleaning Company GmbH - Villingen-Schwenningen",
    "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600",
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600" 
            alt="Schwarzwald" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#0B2341] px-4 py-1 rounded-full text-sm font-bold mb-6">
              ZENTRALE & REGION
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Gebäudereinigung in Villingen-Schwenningen
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              Von unserem Hauptstandort in Villingen-Schwenningen aus betreuen wir 
              Unternehmen in der gesamten Region Schwarzwald-Baar, Donaueschingen, Rottweil, 
              Tuttlingen, Bad Dürrheim, St. Georgen und Trossingen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/kontakt" className="px-8 py-4 bg-[#0B2341] text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
                Anfrage für Ihren Standort
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

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
                    <CheckCircle2 className="text-[#0B2341] w-5 h-5 flex-shrink-0" />
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
                    <p className="text-gray-600">+49 (0) 7721 9447915</p>
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

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-16 h-16 text-[#0B2341] mx-auto mb-8" />
          <h2 className="text-3xl font-bold mb-6">Sie suchen einen Partner in VS?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Lassen Sie uns gemeinsam über Ihr Objekt in Villingen-Schwenningen sprechen.
          </p>
          <Link to="/kontakt" className="inline-flex items-center px-10 py-5 bg-[#0B2341] text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px]">
            Anfrage für Ihren Standort
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
