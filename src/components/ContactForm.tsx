import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, CheckCircle2, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';

const SERVICES = [
  'Unterhaltsreinigung',
  'Industriereinigung',
  'Glas- & Fassadenreinigung',
  'Baureinigung',
  'Sonderreinigung',
  'Winterdienst',
  'Sonstiges',
];

const inputClasses =
  'w-full bg-white border border-line rounded-xl px-4 py-3.5 text-[15px] text-navy font-medium placeholder:text-slate/50 ' +
  'focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    contactPerson: '',
    company: '',
    email: '',
    phone: '',
    serviceType: SERVICES[0],
    message: '',
    privacyAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) return;
    // Honeypot: unsichtbares Feld — wenn ausgefüllt, war es ein Bot.
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Firebase erst beim Absenden laden — hält Initial-Bundle & SSG schlank.
      const { db, collection, addDoc, serverTimestamp } = await import('@/firebase');
      await addDoc(collection(db, 'leads'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(
        `Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: ${SITE.phone}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 lg:p-14 rounded-3xl shadow-lifted text-center border border-line"
      >
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full grid place-items-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="font-headline text-2xl font-bold text-navy mb-3">Nachricht gesendet!</h3>
        <p className="text-slate mb-2 max-w-md mx-auto">
          Vielen Dank für Ihre Anfrage. Wir melden uns <strong className="text-navy">innerhalb von 24 Stunden</strong> bei
          Ihnen.
        </p>
        <p className="text-sm text-slate/80 mb-8">Eilig? Rufen Sie uns direkt an: {SITE.phone}</p>
        <button onClick={() => setIsSuccess(false)} className="text-brand font-bold hover:text-brand-light transition-colors">
          Weitere Nachricht senden
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-7 sm:p-10 rounded-3xl shadow-soft border border-line space-y-5">
      {/* Honeypot — für Menschen unsichtbar */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Firma Webseite
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-[13px] font-bold text-navy mb-2">
            Ihr Name *
          </label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className={inputClasses}
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className="block text-[13px] font-bold text-navy mb-2">
            Unternehmen *
          </label>
          <input
            id="cf-company"
            type="text"
            required
            autoComplete="organization"
            placeholder="Muster GmbH"
            className={inputClasses}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-email" className="block text-[13px] font-bold text-navy mb-2">
            E-Mail *
          </label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            placeholder="max@muster.de"
            className={inputClasses}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-[13px] font-bold text-navy mb-2">
            Telefon
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+49 …"
            className={inputClasses}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-service" className="block text-[13px] font-bold text-navy mb-2">
          Gewünschte Leistung
        </label>
        <select
          id="cf-service"
          className={inputClasses}
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
        >
          {SERVICES.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-[13px] font-bold text-navy mb-2">
          Ihre Nachricht *
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          placeholder="Beschreiben Sie kurz Ihr Objekt und Ihr Anliegen …"
          className={`${inputClasses} resize-y min-h-32`}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={formData.privacyAccepted}
          onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
          className="mt-1 w-4.5 h-4.5 accent-[#0D6B38]"
        />
        <span className="text-[13px] text-slate leading-relaxed">
          Ich habe die{' '}
          <a href="/datenschutz" className="text-brand font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung
          </a>{' '}
          gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung der Anfrage zu. *
        </span>
      </label>

      {submitError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-xl p-4">
          <Phone size={16} className="flex-shrink-0 mt-0.5" />
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-accent-dark shadow-glow hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Wird gesendet …
          </>
        ) : (
          <>
            Nachricht senden
            <Send size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-slate/70 font-medium">
        Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
      </p>
    </form>
  );
}
