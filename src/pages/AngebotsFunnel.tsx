import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building,
  Factory,
  Stethoscope,
  Truck,
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  ShieldCheck,
  Loader2,
  ArrowRight,
  Phone,
  BadgeCheck,
  MapPin,
} from 'lucide-react';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '@/firebase';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { SITE } from '@/lib/site';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  objectType: string;
  services: string[];
  areaSize: string;
  frequency: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
}

const OBJECT_TYPES = [
  { id: 'buero', title: 'Büro & Verwaltung', icon: Building, desc: 'Klassische Büroflächen und Verwaltungsgebäude.' },
  { id: 'industrie', title: 'Industrie & Produktion', icon: Factory, desc: 'Produktionshallen und technische Anlagen.' },
  { id: 'medizin', title: 'Medizintechnik & Sensible Bereiche', icon: Stethoscope, desc: 'Reinräume und medizinische Einrichtungen.' },
  { id: 'logistik', title: 'Gewerbe & Logistik', icon: Truck, desc: 'Lagerhallen und großflächige Verkaufsräume.' },
];

const SERVICES = [
  { id: 'unterhalt', title: 'Unterhaltsreinigung', subtitle: 'Laufender Betrieb' },
  { id: 'glas', title: 'Glas- & Fassadenreinigung', subtitle: 'Fenster & Außenhüllen' },
  { id: 'industrie_service', title: 'Industriereinigung / Anlagenpflege', subtitle: 'Maschinen & Hallen' },
  { id: 'sonder', title: 'Sonder- / Grundreinigung', subtitle: 'Einmalig oder intensiv' },
];

const AREA_SIZES = [
  { id: 'small', title: 'Unter 500 m²' },
  { id: 'medium', title: '500 - 2.000 m²' },
  { id: 'large', title: 'Über 2.000 m²' },
];

const FREQUENCIES = [
  { id: 'daily', title: 'Täglich' },
  { id: 'weekly', title: 'Mehrmals wöchentlich' },
  { id: 'need', title: 'Nach Bedarf' },
];

const STEP_LABELS = ['Objekt', 'Leistungen', 'Umfang', 'Kontakt'];

const selectableCard = (active: boolean) =>
  cn(
    'rounded-2xl border-2 text-left transition-all duration-200',
    active
      ? 'border-accent bg-accent/5 shadow-[0_0_0_4px_rgb(13_107_56/0.12)]'
      : 'border-line bg-white hover:border-brand/40 hover:shadow-soft'
  );

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl border-2 border-line bg-white text-[15px] font-medium text-navy placeholder:text-slate/45 ' +
  'focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none';

export default function AngebotsFunnel() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    objectType: '',
    services: [],
    areaSize: '',
    frequency: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
  });

  const progress = (step / 4) * 100;

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const toggleService = (serviceTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceTitle)
        ? prev.services.filter((title) => title !== serviceTitle)
        : [...prev.services, serviceTitle],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'offer_leads'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp(),
      });

      // E-Mail-Benachrichtigung (optionaler Backend-Endpunkt)
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'offer_lead', data: formData }),
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting lead:', error);
      handleFirestoreError(error, OperationType.WRITE, 'offer_leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shell = (content: React.ReactNode) => (
    <div className="relative min-h-screen bg-navy overflow-hidden grain">
      <SEO
        title="Express-Angebot in 60 Sekunden | AHAD Cleaning"
        description="In 60 Sekunden zum Reinigungsangebot: Objekt beschreiben, Leistungen wählen — Antwort garantiert innerhalb von 24 Stunden."
        keywords="Angebot Gebäudereinigung, Reinigungsangebot anfordern, Express Angebot Reinigung"
      />
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute -top-48 -right-48 w-[36rem] h-[36rem] rounded-full bg-brand/35 blur-[150px]" />
      <div className="absolute -bottom-48 -left-48 w-[30rem] h-[30rem] rounded-full bg-accent/20 blur-[150px]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-32 pb-16 lg:pt-40 lg:pb-24">{content}</div>
    </div>
  );

  if (isSuccess) {
    return shell(
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] shadow-lifted p-8 md:p-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.15, damping: 14 }}
          className="w-20 h-20 bg-accent/10 rounded-full grid place-items-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-accent" />
        </motion.div>
        <h1 className="font-headline text-3xl font-bold text-navy mb-4">Anfrage erfolgreich!</h1>
        <p className="text-lg text-slate mb-4 leading-relaxed max-w-lg mx-auto">
          Vielen Dank für Ihr Vertrauen. Ein AHAD-Experte meldet sich{' '}
          <strong className="text-navy">innerhalb der nächsten 24 Stunden</strong> bei Ihnen, um die unverbindliche
          Objektbesichtigung zu vereinbaren.
        </p>
        <p className="text-sm text-slate/80 mb-10">
          Noch schneller? Rufen Sie direkt an:{' '}
          <a href={SITE.phoneHref} className="font-bold text-brand hover:underline">
            {SITE.phone}
          </a>
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-soft hover:-translate-y-0.5"
        >
          Zurück zur Startseite
        </Link>
      </motion.div>
    );
  }

  return shell(
    <>
      {/* Kopf */}
      <div className="text-center mb-10">
        <span className="eyebrow text-mint justify-center mb-4">
          <Clock size={13} />
          60 Sekunden · Antwort in 24h
        </span>
        <h1 className="display-md text-white">Ihr Express-Angebot</h1>
      </div>

      {/* Fortschritt */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className={cn(
                'text-[11px] font-black uppercase tracking-[0.14em] transition-colors',
                i + 1 <= step ? 'text-mint' : 'text-white/35'
              )}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-mint"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Karte */}
      <div className="bg-white rounded-[2rem] shadow-lifted p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">
                  Für welches Objekt suchen Sie eine Lösung?
                </h2>
                <p className="text-slate">Wir bieten spezialisierte Reinigungskonzepte für jede Branche in Süddeutschland.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OBJECT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setFormData({ ...formData, objectType: type.title });
                      handleNext();
                    }}
                    className={cn('flex flex-col items-start p-5 group', selectableCard(formData.objectType === type.title))}
                  >
                    <span
                      className={cn(
                        'w-11 h-11 rounded-xl grid place-items-center mb-3 transition-colors',
                        formData.objectType === type.title
                          ? 'bg-accent text-white'
                          : 'bg-paper text-brand group-hover:bg-brand/10'
                      )}
                    >
                      <type.icon size={20} />
                    </span>
                    <span className="text-[15px] font-bold text-navy mb-1">{type.title}</span>
                    <span className="text-xs text-slate leading-snug">{type.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">
                  Welche Leistungen benötigen Sie?
                </h2>
                <p className="text-slate">Mehrfachauswahl möglich.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const active = formData.services.includes(service.title);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.title)}
                      className={cn('flex items-center gap-3 p-5', selectableCard(active))}
                    >
                      <span
                        className={cn(
                          'w-5 h-5 rounded-md border-2 grid place-items-center flex-shrink-0 transition-colors',
                          active ? 'bg-accent border-accent' : 'border-gray-300'
                        )}
                      >
                        {active && <Check size={14} className="text-white" />}
                      </span>
                      <span>
                        <span className="block text-[15px] font-bold text-navy">{service.title}</span>
                        <span className="text-xs text-slate">{service.subtitle}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleBack}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate border-2 border-line hover:bg-paper transition-all"
                >
                  <ChevronLeft size={18} /> Zurück
                </button>
                <button
                  onClick={handleNext}
                  disabled={formData.services.length === 0}
                  className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow hover:-translate-y-0.5"
                >
                  Weiter <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="space-y-7"
            >
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">
                  Wie groß ist die zu reinigende Fläche?
                </h2>
                <p className="text-slate">Eine grobe Schätzung reicht für den ersten Eindruck.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {AREA_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setFormData({ ...formData, areaSize: size.title })}
                    className={cn('p-4 font-bold text-sm text-center text-navy', selectableCard(formData.areaSize === size.title))}
                  >
                    {size.title}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-[15px] font-bold text-navy flex items-center gap-2">
                  <Clock className="text-accent" size={18} />
                  Gewünschter Turnus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FREQUENCIES.map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setFormData({ ...formData, frequency: freq.title })}
                      className={cn('p-4 font-bold text-sm text-center text-navy', selectableCard(formData.frequency === freq.title))}
                    >
                      {freq.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleBack}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate border-2 border-line hover:bg-paper transition-all"
                >
                  <ChevronLeft size={18} /> Zurück
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.areaSize || !formData.frequency}
                  className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow hover:-translate-y-0.5"
                >
                  Weiter <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">
                  Lassen Sie uns Ihr Objekt ansehen.
                </h2>
                <p className="text-slate">
                  Für ein belastbares Angebot besichtigen wir Ihr Objekt kurz vor Ort — völlig unverbindlich.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="af-company" className="text-[13px] font-bold text-navy ml-0.5">
                      Firmenname
                    </label>
                    <input
                      id="af-company"
                      required
                      type="text"
                      autoComplete="organization"
                      placeholder="Muster GmbH"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="af-person" className="text-[13px] font-bold text-navy ml-0.5">
                      Ansprechpartner
                    </label>
                    <input
                      id="af-person"
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Vorname Nachname"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="af-email" className="text-[13px] font-bold text-navy ml-0.5">
                      E-Mail-Adresse
                    </label>
                    <input
                      id="af-email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="name@firma.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="af-phone" className="text-[13px] font-bold text-navy ml-0.5">
                      Telefonnummer
                    </label>
                    <input
                      id="af-phone"
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder="+49 123 456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="af-location" className="text-[13px] font-bold text-navy ml-0.5">
                    PLZ / Ort <span className="font-medium text-slate/70">(für regionale Zuordnung)</span>
                  </label>
                  <input
                    id="af-location"
                    required
                    type="text"
                    placeholder="78052 Villingen-Schwenningen"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={inputClasses}
                  />
                </div>

                <div className="bg-brand/5 border border-brand/15 rounded-xl p-4 flex items-center gap-3">
                  <span className="w-9 h-9 bg-white rounded-full grid place-items-center flex-shrink-0 shadow-soft">
                    <Clock className="text-brand" size={16} />
                  </span>
                  <p className="text-[13px] text-slate font-medium">
                    Wir melden uns <strong className="text-navy">innerhalb von 24 Stunden</strong> mit Terminvorschlag und
                    Ersteinschätzung.
                  </p>
                </div>

                <p className="text-[11px] text-slate/70 text-center px-2">
                  Ihre Daten werden DSGVO-konform verarbeitet. Mit dem Absenden erklären Sie sich mit unserer{' '}
                  <Link to="/datenschutz" className="underline hover:text-brand">
                    Datenschutzerklärung
                  </Link>{' '}
                  einverstanden.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate border-2 border-line hover:bg-paper transition-all text-sm"
                  >
                    <ChevronLeft size={18} /> Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-dark disabled:opacity-50 transition-all shadow-glow hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Wird gesendet …
                      </>
                    ) : (
                      <>
                        Kostenlose Besichtigung anfragen <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vertrauensleiste */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { icon: <ShieldCheck size={18} />, label: '24h Reaktionszeit' },
          { icon: <BadgeCheck size={18} />, label: 'Voll versichert' },
          { icon: <MapPin size={18} />, label: 'Regional in BW' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1.5 text-blue-100/70">
            <span className="text-mint">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-center">{item.label}</span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-blue-100/60 font-medium">
        Lieber persönlich?{' '}
        <a href={SITE.phoneHref} className="inline-flex items-center gap-1.5 text-white font-bold hover:text-mint transition-colors">
          <Phone size={14} />
          {SITE.phone}
        </a>
      </p>
    </>
  );
}
