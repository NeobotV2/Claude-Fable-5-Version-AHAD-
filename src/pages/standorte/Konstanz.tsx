import { motion } from 'motion/react';
import { MapPin, CheckCircle2, ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600" 
            alt="Bodensee" 
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
              BODENSEEREGION ABDECKEN
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Gebäudereinigung in Konstanz
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              Wir sind Ihr Partner für professionelle Gebäudedienstleistungen 
              in der Bodenseeregion – wir betreuen Radolfzell, Singen, Kreuzlingen, 
              Meersburg, Überlingen, Stockach und Umgebung.
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
                    <CheckCircle2 className="text-[#0B2341] w-5 h-5 flex-shrink-0" />
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

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-16 h-16 text-[#0B2341] mx-auto mb-8" />
          <h2 className="text-3xl font-bold mb-6">Sie suchen einen Partner in Konstanz?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Gerne erstellen wir Ihnen ein individuelles Angebot für Ihr Objekt am See.
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
