import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Building,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Factory,
  HardHat,
  Hotel,
  Loader2,
  MessageCircle,
  Phone,
  Snowflake,
  Sparkles,
  Stethoscope,
  Truck,
  Wind,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { cn } from '@/lib/utils';
import { SITE, WHATSAPP_HREF } from '@/lib/site';
import {
  readAttribution,
  rememberAttribution,
  trackEvent,
  useFunnelAbandonment,
  type AttributionContext,
} from '@/lib/analytics';

type Step = 1 | 2 | 3 | 4;

interface ServiceDetails {
  glassAccess: string;
  productionMode: string;
  constructionPhase: string;
  winterAreaType: string;
  specialRequirements: string;
  desiredStart: string;
}

interface FormData {
  objectType: string;
  services: string[];
  areaSize: string;
  frequency: string;
  anforderungen: string[];
  serviceDetails: ServiceDetails;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  preferredTime: string;
  privacyNoticeAccepted: boolean;
  attribution: AttributionContext;
}

const EMPTY_ATTRIBUTION: AttributionContext = {
  landingPath: '',
  entryPath: '',
  entryService: '',
  entryIndustry: '',
  entryRegion: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  referrerHost: '',
};

const EMPTY_DETAILS: ServiceDetails = {
  glassAccess: '',
  productionMode: '',
  constructionPhase: '',
  winterAreaType: '',
  specialRequirements: '',
  desiredStart: '',
};

const EMPTY_FORM: FormData = {
  objectType: '',
  services: [],
  areaSize: '',
  frequency: '',
  anforderungen: [],
  serviceDetails: EMPTY_DETAILS,
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  location: '',
  preferredTime: '',
  privacyNoticeAccepted: true,
  attribution: EMPTY_ATTRIBUTION,
};

const OBJECT_TYPES = [
  { id: 'buero', title: 'Büro & Verwaltung', icon: Building, desc: 'Büroflächen und Verwaltungsgebäude.' },
  { id: 'industrie', title: 'Industrie & Produktion', icon: Factory, desc: 'Produktionshallen und technische Anlagen.' },
  { id: 'medizin', title: 'Medizintechnik & sensible Bereiche', icon: Stethoscope, desc: 'Labore, Reinräume und medizinische Bereiche.' },
  { id: 'logistik', title: 'Gewerbe & Logistik', icon: Truck, desc: 'Lager, Handel und großflächige Objekte.' },
  { id: 'hotel', title: 'Hotellerie & Objektbetrieb', icon: Hotel, desc: 'Beherbergung, Gastronomie und Gästebereiche.' },
  { id: 'oeffentlich', title: 'Öffentliche Einrichtung', icon: Building, desc: 'Kommunale und öffentlich genutzte Gebäude.' },
  { id: 'sonstiges', title: 'Anderes Objekt', icon: Sparkles, desc: 'Wir klären die Anforderungen persönlich.' },
];

const SERVICES = [
  { id: 'unterhaltsreinigung', title: 'Unterhaltsreinigung', subtitle: 'Planbare laufende Reinigung', icon: Building },
  { id: 'industrie-produktionsreinigung', title: 'Industrie- & Produktionsreinigung', subtitle: 'Maschinen, Anlagen und Hallen', icon: Factory },
  { id: 'glas-fassadenreinigung', title: 'Glas- & Fassadenreinigung', subtitle: 'Fenster und Gebäudehüllen', icon: Sparkles },
  { id: 'baureinigung', title: 'Baureinigung', subtitle: 'Grob-, Fein- und Endreinigung', icon: HardHat },
  { id: 'medizintechnik-reinigung', title: 'Medizintechnik- & Reinraumreinigung', subtitle: 'Sensible und dokumentierte Bereiche', icon: Stethoscope },
  { id: 'sonderreinigung-stillstandsservice', title: 'Sonderreinigung & Stillstandsservice', subtitle: 'Einmalig oder intensiv', icon: Sparkles },
  { id: 'winterdienst-hausmeisterservice', title: 'Winterdienst & Hausmeisterservice', subtitle: 'Verkehrssicherung und Objektbetreuung', icon: Snowflake },
  { id: 'kuechenabluftreinigung-vdi-2052', title: 'Küchenabluftreinigung', subtitle: 'Hauben, Kanäle und Ventilatoren', icon: Wind },
  { id: 'sonstiges', title: 'Sonstige Leistung', subtitle: 'Anforderung gemeinsam klären', icon: MessageCircle },
];

const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((service) => [service.id, service.title]));
const AREA_SIZES = ['Unter 500 m²', '500–2.000 m²', 'Über 2.000 m²', 'Noch unbekannt'];
const FREQUENCIES = ['Täglich', 'Mehrmals wöchentlich', 'Wöchentlich', 'Einmalig / nach Bedarf', 'Noch offen'];
const REQUIREMENTS = [
  'Feste Objektleitung',
  'Dokumentierte Qualitätskontrollen',
  'Auditfähige Nachweise',
  'Reinigung im laufenden Betrieb',
  'Hygieneplan / Desinfektion',
  'Umweltschonende Verfahren',
  'Bestehendes Leistungsverzeichnis (LV)',
];
const STEP_LABELS = ['Objekt', 'Leistungen', 'Umfang', 'Kontakt'];
const DRAFT_KEY = 'ahad-angebot-entwurf-v2';
const DRAFT_TTL_MS = 2 * 60 * 60 * 1000;

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl border-2 border-[#9aa8b8] bg-white text-[15px] font-medium text-navy ' +
  'placeholder:text-[#596779] focus:border-accent focus:ring-4 focus:ring-accent/15 transition-all outline-none';

const selectableCard = (active: boolean) =>
  cn(
    'rounded-2xl border-2 text-left transition-colors duration-150',
    active
      ? 'border-accent bg-accent/5 shadow-[0_0_0_4px_rgb(13_107_56/0.12)]'
      : 'border-line bg-white hover:border-brand/50 hover:bg-paper',
  );

function readSafeDraft(): { form: Partial<FormData>; step: Step } | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > DRAFT_TTL_MS) {
      sessionStorage.removeItem(DRAFT_KEY);
      return null;
    }
    if (!parsed.form || typeof parsed.form !== 'object') return null;
    const text = (value: unknown) => typeof value === 'string' ? value.slice(0, 500) : '';
    const list = (value: unknown, max: number) => Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string').slice(0, max)
      : [];
    const rawDetails = parsed.form.serviceDetails && typeof parsed.form.serviceDetails === 'object'
      ? parsed.form.serviceDetails as Record<string, unknown>
      : {};
    const form: Partial<FormData> = {
      objectType: text(parsed.form.objectType),
      services: list(parsed.form.services, 9),
      areaSize: text(parsed.form.areaSize),
      frequency: text(parsed.form.frequency),
      anforderungen: list(parsed.form.anforderungen, 8),
      serviceDetails: {
        glassAccess: text(rawDetails.glassAccess),
        productionMode: text(rawDetails.productionMode),
        constructionPhase: text(rawDetails.constructionPhase),
        winterAreaType: text(rawDetails.winterAreaType),
        specialRequirements: '',
        desiredStart: text(rawDetails.desiredStart),
      },
    };
    return { form, step: Math.min(3, Math.max(1, Number(parsed.step) || 1)) as Step };
  } catch {
    return null;
  }
}

function safeDraft(form: FormData) {
  return {
    objectType: form.objectType,
    services: form.services,
    areaSize: form.areaSize,
    frequency: form.frequency,
    anforderungen: form.anforderungen,
    serviceDetails: { ...form.serviceDetails, specialRequirements: '' },
  };
}

export default function AngebotsFunnel() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contactError, setContactError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const idempotencyRef = useRef('');
  const formStartedAtRef = useRef(Date.now());

  useFunnelAbandonment('Offer Funnel', step, isSuccess, {
    entryService: formData.attribution.entryService,
    entryIndustry: formData.attribution.entryIndustry,
    entryRegion: formData.attribution.entryRegion,
  });

  useEffect(() => {
    const draft = readSafeDraft();
    const attribution = readAttribution() || rememberAttribution(window.location.href);
    const directService = new URLSearchParams(window.location.search).get('service') || attribution.entryService;
    const selectedService = SERVICE_BY_SLUG[directService] || '';
    setFormData({
      ...EMPTY_FORM,
      ...(draft?.form || {}),
      serviceDetails: { ...EMPTY_DETAILS, ...(draft?.form.serviceDetails || {}) },
      services: draft?.form.services?.length ? draft.form.services : selectedService ? [selectedService] : [],
      attribution,
    });
    if (draft?.step) setStep(draft.step);
    setIsReady(true);
    trackEvent('Offer Funnel Start', {
      entryPath: attribution.entryPath,
      entryService: attribution.entryService,
      entryIndustry: attribution.entryIndustry,
      entryRegion: attribution.entryRegion,
    });
  }, []);

  useEffect(() => {
    if (!isReady || isSuccess) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ form: safeDraft(formData), step: Math.min(step, 3), savedAt: Date.now() }));
    } catch {
      // Drafting is optional.
    }
  }, [formData, isReady, isSuccess, step]);

  useEffect(() => {
    if (!isReady) return;
    trackEvent('Offer Funnel Step', { step, label: STEP_LABELS[step - 1] });
    if (step > 1) window.setTimeout(() => cardRef.current?.focus(), 0);
  }, [step, isReady]);

  useEffect(() => {
    if (isSuccess) window.setTimeout(() => successRef.current?.focus(), 0);
  }, [isSuccess]);

  const updateDetails = (key: keyof ServiceDetails, value: string) =>
    setFormData((current) => ({ ...current, serviceDetails: { ...current.serviceDetails, [key]: value } }));

  const toggleService = (title: string) =>
    setFormData((current) => ({
      ...current,
      services: current.services.includes(title)
        ? current.services.filter((service) => service !== title)
        : [...current.services, title],
    }));

  const toggleRequirement = (label: string) =>
    setFormData((current) => ({
      ...current,
      anforderungen: current.anforderungen.includes(label)
        ? current.anforderungen.filter((item) => item !== label)
        : [...current.anforderungen, label],
    }));

  const has = (needle: string) => formData.services.some((service) => service.includes(needle));
  const next = () => setStep((current) => Math.min(4, current + 1) as Step);
  const back = () => setStep((current) => Math.max(1, current - 1) as Step);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!formData.email.trim() && !formData.phone.trim()) {
      setContactError('Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.');
      trackEvent('Offer Funnel Validation Error', { field: 'contact-channel' });
      return;
    }

    setContactError('');
    setSubmitError(null);
    setIsSubmitting(true);
    idempotencyRef.current ||= typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `offer-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyRef.current,
        },
        body: JSON.stringify({
          type: 'offer_lead',
          data: formData,
          website: honeypot,
          formStartedAt: formStartedAtRef.current,
          idempotencyKey: idempotencyRef.current,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true || result?.accepted !== true) {
        throw new Error(result?.error?.message ?? 'Übermittlung fehlgeschlagen');
      }

      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        // noop
      }
      setIsSuccess(true);
      trackEvent('Offer Funnel Success', {
        entryService: formData.attribution.entryService,
        services: formData.services.length,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError('Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
      trackEvent('Offer Funnel Error', { step: 4 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const shell = (content: ReactNode) => (
    <div className="relative min-h-screen bg-navy overflow-hidden grain">
      <SEO
        title="Kostenlose Objektbesichtigung anfragen | AHAD Cleaning"
        description="In vier übersichtlichen Schritten zur kostenlosen Vor-Ort-Besichtigung. Das transparente Angebot folgt nach der gemeinsamen Objektaufnahme."
        noindex
      />
      <div className="absolute inset-0 blueprint-grid" aria-hidden />
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-16 lg:pt-36 lg:pb-24">{content}</div>
    </div>
  );

  if (isSuccess) {
    return shell(
      <div className="bg-white rounded-[2rem] shadow-lifted p-8 md:p-14 text-center" role="status">
        <div className="w-20 h-20 bg-accent/10 rounded-full grid place-items-center mx-auto mb-6" aria-hidden>
          <Check className="w-10 h-10 text-accent" />
        </div>
        <h1 ref={successRef} tabIndex={-1} className="font-headline text-3xl font-bold text-navy mb-4 outline-none">
          Anfrage erfolgreich übermittelt
        </h1>
        <p className="text-lg text-slate mb-7 max-w-lg mx-auto">
          Vielen Dank. Wir prüfen Ihre Angaben und melden uns persönlich zur Terminabstimmung für die Objektbesichtigung.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-bold">
            <Phone size={17} /> Direkt anrufen
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold">
            <MessageCircle size={17} /> Per WhatsApp schreiben
          </a>
        </div>
        <Link to="/" className="text-brand font-bold hover:underline">Zurück zur Startseite</Link>
      </div>,
    );
  }

  return shell(
    <>
      <header className="text-center mb-8">
        <span className="eyebrow text-mint justify-center mb-4"><Clock size={13} /> Vier übersichtliche Schritte</span>
        <h1 className="display-md text-white">Kostenlose Vor-Ort-Besichtigung</h1>
        <p className="mt-3 text-blue-100/85">Das belastbare Angebot folgt nach der gemeinsamen Objektaufnahme.</p>
      </header>

      <div className="mb-8" role="progressbar" aria-label="Fortschritt der Angebotsanfrage" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step} aria-valuetext={`Schritt ${step} von 4: ${STEP_LABELS[step - 1]}`}>
        <ol className="flex justify-between items-end mb-3">
          {STEP_LABELS.map((label, index) => (
            <li key={label} aria-current={index + 1 === step ? 'step' : undefined} className={cn('text-[11px] font-black uppercase tracking-[0.12em]', index + 1 <= step ? 'text-mint' : 'text-white/70')}>
              {index + 1}. {label}
            </li>
          ))}
        </ol>
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden" aria-hidden>
          <div className="h-full bg-mint transition-[width] duration-200" style={{ width: `${step * 25}%` }} />
        </div>
      </div>

      <p className="sr-only" role="status">Schritt {step} von 4: {STEP_LABELS[step - 1]}</p>
      <div ref={cardRef} tabIndex={-1} className="bg-white rounded-[2rem] shadow-lifted p-6 sm:p-10 outline-none focus-visible:ring-4 focus-visible:ring-mint/60">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.section key="step-1" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-labelledby="offer-step-1">
              <h2 id="offer-step-1" className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">Für welches Objekt suchen Sie eine Lösung?</h2>
              <p className="text-slate mb-6">Wählen Sie den passendsten Objekttyp. Details klären wir gemeinsam.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OBJECT_TYPES.map((type) => (
                  <button key={type.id} type="button" aria-pressed={formData.objectType === type.title} onClick={() => { setFormData((current) => ({ ...current, objectType: type.title })); next(); }} className={cn('p-5 group', selectableCard(formData.objectType === type.title))}>
                    <type.icon size={20} className="text-accent mb-3" aria-hidden />
                    <span className="block text-[15px] font-bold text-navy mb-1">{type.title}</span>
                    <span className="block text-xs text-slate">{type.desc}</span>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section key="step-2" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-labelledby="offer-step-2">
              <h2 id="offer-step-2" className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">Welche Leistungen benötigen Sie?</h2>
              <p className="text-slate mb-6">Mehrfachauswahl ist möglich.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const active = formData.services.includes(service.title);
                  return (
                    <button key={service.id} type="button" aria-pressed={active} onClick={() => toggleService(service.title)} className={cn('flex items-start gap-3 p-4', selectableCard(active))}>
                      <service.icon size={19} className="mt-0.5 text-accent shrink-0" aria-hidden />
                      <span><span className="block text-[14px] font-bold text-navy">{service.title}</span><span className="block text-xs text-slate mt-0.5">{service.subtitle}</span></span>
                    </button>
                  );
                })}
              </div>
              <Navigation back={back} next={next} nextDisabled={formData.services.length === 0} />
            </motion.section>
          )}

          {step === 3 && (
            <motion.section key="step-3" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-labelledby="offer-step-3" className="space-y-7">
              <div><h2 id="offer-step-3" className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">Umfang und besondere Anforderungen</h2><p className="text-slate">Eine grobe Einschätzung genügt für die Terminvorbereitung.</p></div>
              <ChoiceGroup legend="Ungefähre Fläche" options={AREA_SIZES} value={formData.areaSize} onChange={(areaSize) => setFormData((current) => ({ ...current, areaSize }))} />
              <ChoiceGroup legend="Gewünschter Turnus" options={FREQUENCIES} value={formData.frequency} onChange={(frequency) => setFormData((current) => ({ ...current, frequency }))} />

              {has('Glas-') && <TextField id="offer-glass" label="Zugänglichkeit der Glasflächen" value={formData.serviceDetails.glassAccess} onChange={(value) => updateDetails('glassAccess', value)} placeholder="z. B. ebenerdig, Hubsteiger, Innenhof" />}
              {has('Industrie') && <TextField id="offer-production" label="Produktions- und Schichtbetrieb" value={formData.serviceDetails.productionMode} onChange={(value) => updateDetails('productionMode', value)} placeholder="z. B. 2-Schicht-Betrieb, Anlagenreinigung im Stillstand" />}
              {has('Baureinigung') && <TextField id="offer-construction" label="Bauphase und geplanter Übergabetermin" value={formData.serviceDetails.constructionPhase} onChange={(value) => updateDetails('constructionPhase', value)} placeholder="z. B. Baufeinreinigung vor Abnahme" />}
              {has('Winterdienst') && <TextField id="offer-winter" label="Flächentyp und Bereitschaftszeitraum" value={formData.serviceDetails.winterAreaType} onChange={(value) => updateDetails('winterAreaType', value)} placeholder="z. B. Parkplatz und Gehwege, November bis März" />}
              {(has('Medizintechnik') || has('Küchenabluft')) && <TextField id="offer-special" label="Hygiene-, Dokumentations- oder Anlagenanforderungen" value={formData.serviceDetails.specialRequirements} onChange={(value) => updateDetails('specialRequirements', value)} placeholder="z. B. Hygieneplan, SOP, Kanalumfang" />}
              <TextField id="offer-start" label="Gewünschter Start" value={formData.serviceDetails.desiredStart} onChange={(value) => updateDetails('desiredStart', value)} placeholder="z. B. ab Oktober oder kurzfristig" />

              <fieldset>
                <legend className="text-[15px] font-bold text-navy mb-3">Was ist Ihnen besonders wichtig? <span className="text-slate font-normal">(optional)</span></legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {REQUIREMENTS.map((requirement) => {
                    const active = formData.anforderungen.includes(requirement);
                    return <button key={requirement} type="button" aria-pressed={active} onClick={() => toggleRequirement(requirement)} className={cn('flex items-center gap-2 p-3 text-sm font-semibold', selectableCard(active))}><span className={cn('w-4 h-4 border rounded grid place-items-center', active ? 'bg-accent border-accent' : 'border-[#738196]')}>{active && <Check size={12} className="text-white" />}</span>{requirement}</button>;
                  })}
                </div>
              </fieldset>
              <Navigation back={back} next={next} nextDisabled={!formData.areaSize || !formData.frequency} />
            </motion.section>
          )}

          {step === 4 && (
            <motion.section key="step-4" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-labelledby="offer-step-4">
              <h2 id="offer-step-4" className="font-headline text-2xl md:text-3xl font-bold text-navy mb-2">Wie dürfen wir Sie erreichen?</h2>
              <p className="text-slate mb-6">Ansprechperson und ein Kontaktweg genügen. Unternehmen und Einsatzort können Sie optional ergänzen.</p>
              <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                <div className="absolute -left-[10000px]" aria-hidden><label htmlFor="offer-website">Website</label><input id="offer-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput id="offer-company" label="Unternehmen (optional)" autoComplete="organization" value={formData.companyName} onChange={(companyName) => setFormData((current) => ({ ...current, companyName }))} />
                  <TextInput id="offer-person" label="Ansprechperson" required autoComplete="name" value={formData.contactPerson} onChange={(contactPerson) => setFormData((current) => ({ ...current, contactPerson }))} />
                  <TextInput id="offer-email" label="E-Mail" type="email" autoComplete="email" value={formData.email} onChange={(email) => setFormData((current) => ({ ...current, email }))} describedBy="offer-contact-help" invalid={Boolean(contactError)} />
                  <TextInput id="offer-phone" label="Telefon" type="tel" autoComplete="tel" value={formData.phone} onChange={(phone) => setFormData((current) => ({ ...current, phone }))} describedBy="offer-contact-help" invalid={Boolean(contactError)} />
                </div>
                <p id="offer-contact-help" role={contactError ? 'alert' : undefined} className={cn('text-sm', contactError ? 'text-red-700 font-semibold' : 'text-slate')}>{contactError || 'Bitte mindestens einen Kontaktweg angeben.'}</p>
                <TextInput id="offer-location" label="PLZ / Ort des Einsatzes (optional)" autoComplete="postal-code" value={formData.location} onChange={(location) => setFormData((current) => ({ ...current, location }))} />
                <TextInput id="offer-preferred" label="Bevorzugtes Zeitfenster für die Besichtigung (optional)" value={formData.preferredTime} onChange={(preferredTime) => setFormData((current) => ({ ...current, preferredTime }))} />
                <p className="text-sm text-slate leading-relaxed">Hinweise zur Verarbeitung Ihrer Angaben finden Sie in der <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline">Datenschutzerklärung (öffnet neuen Tab)</Link>.</p>
                {submitError && <div role="alert" className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4">{submitError} <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a></div>}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="button" onClick={back} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate border-2 border-[#9aa8b8]"><ChevronLeft size={18} className="inline mr-2" />Zurück</button>
                  <button type="submit" disabled={isSubmitting} className="flex-[2] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-accent hover:bg-accent-dark disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-accent/40">
                    {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Wird übermittelt</> : <>Besichtigung anfragen <ArrowRight size={18} /></>}
                  </button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </>,
  );
}

function Navigation({ back, next, nextDisabled }: { back: () => void; next: () => void; nextDisabled: boolean }) {
  return <div className="flex flex-col sm:flex-row gap-3 pt-7"><button type="button" onClick={back} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate border-2 border-[#9aa8b8]"><ChevronLeft size={18} className="inline mr-2" />Zurück</button><button type="button" onClick={next} disabled={nextDisabled} className="flex-[2] px-6 py-3.5 rounded-xl font-bold text-white bg-accent disabled:opacity-50">Weiter <ChevronRight size={18} className="inline ml-2" /></button></div>;
}

function ChoiceGroup({ legend, options, value, onChange }: { legend: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return <fieldset><legend className="text-[15px] font-bold text-navy mb-3">{legend}</legend><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{options.map((option) => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)} className={cn('p-4 text-sm font-bold text-navy text-center', selectableCard(value === option))}>{option}</button>)}</div></fieldset>;
}

function TextField({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <div><label htmlFor={id} className="block text-[14px] font-bold text-navy mb-2">{label}</label><input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={inputClasses} /></div>;
}

function TextInput({ id, label, value, onChange, type = 'text', required = false, autoComplete, describedBy, invalid = false }: { id: string; label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; autoComplete?: string; describedBy?: string; invalid?: boolean }) {
  return <div><label htmlFor={id} className="block text-[13px] font-bold text-navy mb-2">{label}{required && ' *'}</label><input id={id} type={type} required={required} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} aria-describedby={describedBy} aria-errormessage={invalid ? describedBy : undefined} aria-invalid={invalid || undefined} className={inputClasses} /></div>;
}
