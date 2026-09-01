import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';
import { currentAttribution, describeFieldErrors, submitLead } from '@/lib/submit-lead';

const SERVICES = [
  'Unterhaltsreinigung',
  'Industrie- & Produktionsreinigung',
  'Glas- & Fassadenreinigung',
  'Baureinigung',
  'Medizintechnik- & Reinraumreinigung',
  'Sonderreinigung & Stillstandsservice',
  'Winterdienst & Hausmeisterservice',
  'Küchenabluftreinigung',
  'Sonstiges',
];

const inputClasses =
  'w-full bg-white border-2 border-[#738196] rounded-xl px-4 py-3.5 text-[15px] text-navy font-medium ' +
  'placeholder:text-[#596779] focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/15 transition-colors';

const INITIAL_FORM = {
  contactPerson: '',
  company: '',
  email: '',
  phone: '',
  serviceType: SERVICES[0],
  message: '',
  privacyNoticeAccepted: true,
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contactError, setContactError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const idempotencyRef = useRef('');
  const formStartedAtRef = useRef(Date.now());

  // Die Seite ist vorgerendert: Wer tippt, bevor der Routen-Chunk hydriert hat,
  // hätte seine Eingabe beim ersten State-Update verloren. Deshalb werden die
  // bereits im DOM stehenden Werte einmalig in den React-State übernommen.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const read = (id: string) => {
      const element = form.elements.namedItem(id);
      return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement
        ? element.value
        : '';
    };
    const typed = {
      contactPerson: read('cf-name'),
      company: read('cf-company'),
      email: read('cf-email'),
      phone: read('cf-phone'),
      message: read('cf-message'),
    };
    const service = read('cf-service');
    const adopted = Object.fromEntries(Object.entries(typed).filter(([, value]) => value.trim() !== ''));
    if (service && SERVICES.includes(service) && service !== INITIAL_FORM.serviceType) adopted.serviceType = service;
    if (Object.keys(adopted).length > 0) setFormData((current) => ({ ...current, ...adopted }));
  }, []);

  useEffect(() => {
    if (isSuccess) window.setTimeout(() => successRef.current?.focus(), 0);
  }, [isSuccess]);

  const resetForm = () => {
    setIsSuccess(false);
    setSubmitError(null);
    setContactError('');
    setFormData({ ...INITIAL_FORM });
    setHoneypot('');
    idempotencyRef.current = '';
    formStartedAtRef.current = Date.now();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!formData.email.trim() && !formData.phone.trim()) {
      setContactError('Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.');
      trackEvent('Contact Form Validation Error', { field: 'contact-channel' });
      return;
    }
    setContactError('');
    setSubmitError(null);
    setIsSubmitting(true);

    const result = await submitLead({
      type: 'contact',
      data: { ...formData, attribution: currentAttribution() },
      website: honeypot,
      formStartedAt: formStartedAtRef.current,
      idempotency: idempotencyRef,
      keyPrefix: 'contact',
    });
    setIsSubmitting(false);

    if (result.ok) {
      setIsSuccess(true);
      trackEvent('Contact Form Success', { service: formData.serviceType });
      return;
    }
    if (result.kind === 'validation') {
      // Serverseitige Feldfehler benennen, statt sie als Übertragungsfehler zu tarnen.
      const channelError = result.fields.email || result.fields.phone;
      if (channelError) setContactError(channelError);
      const detail = describeFieldErrors(result.fields);
      setSubmitError(detail ? `${result.message} ${detail}` : result.message);
      trackEvent('Contact Form Validation Error', { field: Object.keys(result.fields)[0] ?? 'unknown' });
      return;
    }
    setSubmitError(result.message);
    trackEvent('Contact Form Error', { service: formData.serviceType, kind: result.kind });
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-lifted text-center border border-line" role="status">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full grid place-items-center mx-auto mb-6" aria-hidden>
          <CheckCircle2 size={40} />
        </div>
        <h3 ref={successRef} tabIndex={-1} className="font-headline text-2xl font-bold text-navy mb-3 outline-none">
          Nachricht übermittelt
        </h3>
        <p className="text-slate mb-4 max-w-md mx-auto">Vielen Dank. Wir prüfen Ihre Anfrage und melden uns persönlich bei Ihnen.</p>
        <p className="text-sm text-slate mb-8">Eilig? <a href={SITE.phoneHref} className="font-bold text-brand underline">{SITE.phone}</a></p>
        <button onClick={resetForm} className="text-brand font-bold hover:underline">Weitere Nachricht senden</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-busy={isSubmitting} className="relative bg-white p-7 sm:p-10 rounded-3xl shadow-soft border border-line space-y-5">
      <div className="absolute -left-[10000px]" aria-hidden>
        <label htmlFor="cf-website">Firma Webseite</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="cf-name" label="Ihr Name" required autoComplete="name" value={formData.contactPerson} onChange={(contactPerson) => setFormData((current) => ({ ...current, contactPerson }))} />
        <Field id="cf-company" label="Unternehmen" required autoComplete="organization" value={formData.company} onChange={(company) => setFormData((current) => ({ ...current, company }))} />
        <Field id="cf-email" label="E-Mail" type="email" autoComplete="email" value={formData.email} onChange={(email) => setFormData((current) => ({ ...current, email }))} describedBy="cf-contact-help" invalid={Boolean(contactError)} />
        <Field id="cf-phone" label="Telefon" type="tel" autoComplete="tel" value={formData.phone} onChange={(phone) => setFormData((current) => ({ ...current, phone }))} describedBy="cf-contact-help" invalid={Boolean(contactError)} />
      </div>
      <p id="cf-contact-help" role={contactError ? 'alert' : undefined} className={contactError ? 'text-sm text-red-700 font-semibold' : 'text-sm text-slate'}>
        {contactError || 'Bitte mindestens einen Kontaktweg angeben.'}
      </p>

      <div>
        <label htmlFor="cf-service" className="block text-[13px] font-bold text-navy mb-2">Gewünschte Leistung</label>
        <select id="cf-service" className={inputClasses} value={formData.serviceType} onChange={(event) => setFormData((current) => ({ ...current, serviceType: event.target.value }))}>
          {SERVICES.map((service) => <option key={service}>{service}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-[13px] font-bold text-navy mb-2">Ihre Nachricht *</label>
        <textarea id="cf-message" required rows={5} className={`${inputClasses} resize-y min-h-32`} value={formData.message} onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))} />
      </div>

      <p className="text-[13px] text-slate leading-relaxed">
        Wir verwenden Ihre Angaben ausschließlich zur Bearbeitung der Anfrage. Details finden Sie in der{' '}
        <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold underline">
          Datenschutzerklärung (öffnet neuen Tab)
        </Link>.
      </p>

      {submitError && <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded-xl p-4"><Phone size={16} className="shrink-0 mt-0.5" /><span>{submitError} <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a></span></div>}

      <button type="submit" disabled={isSubmitting} className="group w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-accent-dark focus-visible:ring-4 focus-visible:ring-accent/40 disabled:opacity-60">
        {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Wird übermittelt</> : <>Nachricht senden <Send size={17} /></>}
      </button>
    </form>
  );
}

function Field({ id, label, value, onChange, type = 'text', required = false, autoComplete, describedBy, invalid = false }: { id: string; label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; autoComplete?: string; describedBy?: string; invalid?: boolean }) {
  return <div><label htmlFor={id} className="block text-[13px] font-bold text-navy mb-2">{label}{required && ' *'}</label><input id={id} type={type} required={required} autoComplete={autoComplete} className={inputClasses} value={value} onChange={(event) => onChange(event.target.value)} aria-describedby={describedBy} aria-errormessage={invalid ? describedBy : undefined} aria-invalid={invalid || undefined} /></div>;
}
