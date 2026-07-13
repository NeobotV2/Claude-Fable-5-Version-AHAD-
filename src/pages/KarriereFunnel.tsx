import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Check, Send, Smartphone, User, Info, Loader2, Globe } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { languages, translations, Language } from '@/constants/funnelTranslations';
import { jobProfile } from '@/data/jobs';
import { readAttribution, rememberAttribution, trackEvent, useFunnelAbandonment } from '@/lib/analytics';
import { SITE } from '@/lib/site';

type FunnelData = {
  jobType: string;
  department: string;
  experience: string;
  startDate: string;
  mobility: string;
  location: string;
  name: string;
  phone: string;
  whatsappOptIn: boolean;
  privacyNoticeAccepted: boolean;
  jobId: string;
  sourcePath: string;
};

const INITIAL_DATA: FunnelData = {
  jobType: '',
  department: '',
  experience: '',
  startDate: '',
  mobility: '',
  location: '',
  name: '',
  phone: '',
  whatsappOptIn: false,
  privacyNoticeAccepted: true,
  jobId: '',
  sourcePath: '/karriere/bewerbung',
};

export default function KarriereFunnel() {
  const [lang, setLang] = useState<Language | null>(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [searchParams] = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const idempotencyRef = useRef('');
  const formStartedAtRef = useRef(Date.now());
  const isFirstRender = useRef(true);

  useFunnelAbandonment('Application Funnel', step, isSuccess, {
    language: lang || 'unselected',
    jobId: data.jobId || 'initiative',
  });

  const t = lang ? translations[lang] : translations.de;
  const isRtl = lang ? languages.find(l => l.id === lang)?.rtl : false;
  const selectedProfile = jobProfile(data.jobId);

  useEffect(() => {
    const jobId = searchParams.get('profile') || '';
    setData((current) => ({ ...current, jobId, sourcePath: `${window.location.pathname}${window.location.search}`.slice(0, 180) }));
    trackEvent('Application Funnel Start', { jobId: jobId || 'initiative' });
  }, [searchParams]);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Barrierefreiheit: Fokus bei Schrittwechsel auf den Funnel-Inhalt setzen,
  // damit Tastatur-/Screenreader-Nutzer die Position nicht verlieren.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => cardRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (isSuccess) window.setTimeout(() => successRef.current?.focus(), 0);
  }, [isSuccess]);

  useEffect(() => {
    if (lang) trackEvent('Application Funnel Step', { step, language: lang, jobId: data.jobId || 'initiative' });
  }, [data.jobId, lang, step]);

  // Frühestes wählbares Startdatum = heute (kein Datum in der Vergangenheit).
  const today = new Date().toISOString().slice(0, 10);

  const updateData = (fields: Partial<FunnelData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(false);
    idempotencyRef.current ||= typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `job-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyRef.current },
        body: JSON.stringify({
          type: 'job_application',
          data: {
            ...data,
            language: lang,
            attribution: readAttribution() || rememberAttribution(window.location.href),
          },
          website: honeypot,
          formStartedAt: formStartedAtRef.current,
          idempotencyKey: idempotencyRef.current,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true || result?.accepted !== true) {
        throw new Error(result?.error?.message ?? 'Übermittlung fehlgeschlagen');
      }
      setIsSuccess(true);
      trackEvent('Application Funnel Success', { language: lang || 'de', jobId: data.jobId || 'initiative' });
    } catch {
      setSubmitError(true);
      trackEvent('Application Funnel Error', { language: lang || 'de', jobId: data.jobId || 'initiative' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;

  if (!lang) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <SEO title="Language Selection | AHAD Cleaning" description="Choose your language for the application." noindex />
        <div className="max-w-xl w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#0D6B38] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Globe size={32} />
            </div>
            <h1 className="text-3xl font-black text-[#0B2341] mb-4">Wähle deine Sprache</h1>
            <p className="text-[#424751]">Choose your language / اختر لغتك</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className="p-4 bg-white rounded-2xl border-2 border-transparent hover:border-[#0D6B38] transition-all shadow-sm flex flex-col items-center gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{l.flag}</span>
                <span className="font-bold text-[#0B2341]">{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-4 pt-32 pb-20 lg:pt-40 lg:pb-32" dir={isRtl ? 'rtl' : 'ltr'}>
        <div
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
          role="status"
        >
          <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h1 ref={successRef} tabIndex={-1} className="text-2xl font-black text-[#0B2341] mb-4 outline-none">{t.successTitle}</h1>
          <p className="text-[#424751] mb-8">{t.successText}</p>
          <Link to="/" className="block w-full bg-[#0D6B38] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-accent-dark transition-all">
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] pt-24 pb-12 lg:pt-28 lg:pb-16 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <SEO
        title={`${t.title} | AHAD Cleaning`}
        description={t.subtitle}
        noindex
      />
      {/* Sprache & Leserichtung fürs Dokument — wichtig für Screenreader & Suche */}
      <Helmet htmlAttributes={{ lang, dir: isRtl ? 'rtl' : 'ltr' }} />

      <div
        ref={cardRef}
        tabIndex={-1}
        className="max-w-2xl mx-auto outline-none"
      >
        <p className="sr-only" role="status">{t.step} {step} {t.of} 4</p>
        {selectedProfile && (
          <div className="mb-5 rounded-xl border border-[#0D6B38]/25 bg-[#0D6B38]/8 p-4 text-sm text-[#0B2341]">
            <strong>Gewähltes Einsatzprofil:</strong> {selectedProfile.title} · {selectedProfile.region}. Die aktuelle Einsatzmöglichkeit bestätigen wir persönlich.
          </div>
        )}
        {/* Progress Bar + jederzeit sichtbarer Sprachwechsel */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D6B38]">
              {step === 4 ? t.fastDone : `${t.step} ${step} ${t.of} 4`}
            </span>
            <span className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLang(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#424751] hover:text-[#0D6B38] transition-colors"
                aria-label={t.langSelect}
              >
                <Globe size={13} />
                {languages.find((l) => l.id === lang)?.flag} {languages.find((l) => l.id === lang)?.label}
              </button>
              <span className="text-xs font-bold text-[#0D6B38]">{Math.round(progress)}%</span>
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step} aria-valuetext={`${t.step} ${step} ${t.of} 4`}>
            <div className="h-full bg-[#0D6B38] transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-[#0B2341] mb-2">{t.step1Title}</h1>
                <p className="text-[#424751]">{t.subtitle}</p>
              </div>

              <div className="grid gap-3">
                {[
                  { id: 'vollzeit', ...t.jobTypes.vollzeit },
                  { id: 'teilzeit', ...t.jobTypes.teilzeit },
                  { id: 'minijob', ...t.jobTypes.minijob },
                ].map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={data.jobType === item.title}
                    aria-label={`${item.title}: ${item.desc}`}
                    onClick={() => {
                      updateData({ jobType: item.title });
                      nextStep();
                    }}
                    className={`p-4 text-left rounded-xl border-2 transition-all ${
                      data.jobType === item.title
                        ? 'border-[#0D6B38] bg-accent/5'
                        : 'border-white bg-white hover:border-gray-200'
                    } shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className="font-black text-lg text-[#0B2341]">{item.title}</div>
                    <div className="text-sm text-[#424751]">{item.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-[#0B2341] mb-2">{t.step2Title}</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'unterhalt', ...t.departments.unterhalt },
                  { id: 'glas', ...t.departments.glas },
                  { id: 'bau', ...t.departments.bau },
                  { id: 'sonder', ...t.departments.sonder },
                  { id: 'leitung', ...t.departments.leitung },
                ].map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={data.department === item.title}
                    aria-label={`${item.title}: ${item.desc}`}
                    onClick={() => {
                      updateData({ department: item.title });
                      nextStep();
                    }}
                    className={`p-4 text-left rounded-xl border-2 transition-all ${
                      data.department === item.title 
                        ? 'border-[#0D6B38] bg-accent/5' 
                        : 'border-white bg-white hover:border-gray-200'
                    } shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className="font-black text-lg text-[#0B2341]">{item.title}</div>
                    <div className="text-sm text-[#424751]">{item.desc}</div>
                  </button>
                ))}
              </div>

              <button onClick={prevStep} className="flex items-center gap-2 text-[#424751] font-bold py-3">
                {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />} {t.back}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-[#0B2341] mb-2">{t.step3Title}</h1>
                <p className="text-[#424751]">{t.step3Subtitle}</p>
              </div>

              <div className="space-y-4">
                {/* Erfahrung */}
                <fieldset>
                  <legend className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-2">{t.experienceLabel}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      aria-pressed={data.experience === 'Ja'}
                      onClick={() => updateData({ experience: 'Ja' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        data.experience === 'Ja' ? 'border-[#0D6B38] bg-accent/5 text-[#0D6B38]' : 'border-white bg-white'
                      }`}
                    >
                      {t.expYes}
                    </button>
                    <button
                      aria-pressed={data.experience === 'Quereinsteiger'}
                      onClick={() => updateData({ experience: 'Quereinsteiger' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        data.experience === 'Quereinsteiger' ? 'border-[#0D6B38] bg-accent/5 text-[#0D6B38]' : 'border-white bg-white'
                      }`}
                    >
                      {t.expNo}
                    </button>
                  </div>
                </fieldset>

                {/* Starttermin */}
                <fieldset>
                  <legend className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-2">{t.startLabel}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      aria-pressed={data.startDate === 'Sofort'}
                      onClick={() => updateData({ startDate: 'Sofort' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        data.startDate === 'Sofort' ? 'border-[#0D6B38] bg-accent/5 text-[#0D6B38]' : 'border-white bg-white'
                      }`}
                    >
                      {t.startNow}
                    </button>
                    <div className="relative">
                      {(() => {
                        const hasDate = data.startDate !== 'Sofort' && data.startDate !== '';
                        return (
                          <>
                            <input
                              type="date"
                              min={today}
                              value={hasDate ? data.startDate : ''}
                              onChange={(e) => updateData({ startDate: e.target.value })}
                              aria-label={t.startFrom}
                              className={`w-full py-3 px-4 rounded-xl border-2 font-bold transition-all outline-none ${
                                hasDate ? 'border-[#0D6B38] bg-accent/5 text-[#0D6B38]' : 'border-white bg-white text-transparent'
                              }`}
                            />
                            {/* Native Date-Inputs zeigen keinen Placeholder — dieses Label
                                überlagert das leere Feld und verschwindet, sobald ein Datum gewählt ist. */}
                            {!hasDate && (
                              <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center font-bold text-slate/60">
                                {t.startFrom}
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </fieldset>

                {/* Mobilität */}
                <fieldset>
                  <legend className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-2">{t.mobilityLabel}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'auto', label: t.mobAuto },
                      { id: 'oepnv', label: t.mobPublic },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer shadow-sm border-2 border-transparent has-[:checked]:border-[#0D6B38]">
                        <input
                          type="radio"
                          name="mobility"
                          value={item.label}
                          checked={data.mobility === item.label}
                          onChange={(e) => updateData({ mobility: e.target.value })}
                          className="w-5 h-5 accent-[#0D6B38]"
                        />
                        <span className="font-bold text-[#0B2341]">{item.label}</span>
                      </label>
                    ))}
                    <div className="p-3 bg-white rounded-xl shadow-sm border-2 border-transparent has-[:focus-within]:border-[#0D6B38] sm:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="mobility"
                          value="Nur in"
                          checked={data.mobility === 'Nur in'}
                          onChange={(e) => updateData({ mobility: e.target.value })}
                          className="w-5 h-5 accent-[#0D6B38]"
                        />
                        <span className="font-bold text-[#0B2341]">{t.mobOnlyIn}</span>
                      </div>
                      <label htmlFor="career-location" className="sr-only">{t.locationPlaceholder}</label>
                      <input
                        id="career-location"
                        type="text"
                        placeholder={t.locationPlaceholder}
                        value={data.location}
                        onChange={(e) => {
                          updateData({ location: e.target.value, mobility: 'Nur in' });
                        }}
                        className="w-full p-2.5 bg-gray-50 rounded-lg outline-none border border-gray-200 focus:border-[#0D6B38]"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Trust Box */}
                <div className="bg-accent/5 p-4 rounded-xl flex gap-3 border border-accent/20">
                  <Info className="text-[#0D6B38] shrink-0" size={20} />
                  <p className="text-xs text-[#0D6B38] leading-relaxed">
                    <strong>{t.trustTitle}</strong> {t.trustText}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={prevStep} className="flex-1 py-3 font-bold text-[#424751] bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                  {t.back}
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={!data.experience || !data.startDate || !data.mobility}
                  className="flex-[2] py-3 bg-[#0D6B38] text-white rounded-xl font-bold shadow-sm hover:shadow-md hover:-translate-y-[1px] disabled:opacity-50 hover:bg-accent-dark transition-all"
                >
                  {t.next}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-[#0B2341] mb-2">{t.step4Title}</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                <div className="absolute -left-[10000px]" aria-hidden>
                  <label htmlFor="career-website">Website</label>
                  <input id="career-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="career-name" className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-1">{t.nameLabel}</label>
                    <div className="relative">
                      <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        id="career-name"
                        required
                        type="text"
                        autoComplete="name"
                        placeholder={t.namePlaceholder}
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        className={`w-full p-3 ${isRtl ? 'pr-11' : 'pl-11'} bg-white rounded-xl border-2 border-[#8A96A3] focus:border-[#0D6B38] outline-none shadow-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="career-phone" className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-1">{t.phoneLabel}</label>
                    <div className="relative">
                      <Smartphone className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        id="career-phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder={t.phonePlaceholder}
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className={`w-full p-3 ${isRtl ? 'pr-11' : 'pl-11'} bg-white rounded-xl border-2 border-[#8A96A3] focus:border-[#0D6B38] outline-none shadow-sm`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-[#8A96A3] has-[:checked]:border-[#0D6B38]">
                  <label htmlFor="career-whatsapp" className="flex gap-3 cursor-pointer">
                    <input
                      id="career-whatsapp"
                      type="checkbox"
                      checked={data.whatsappOptIn}
                      onChange={(e) => updateData({ whatsappOptIn: e.target.checked })}
                      aria-describedby="career-whatsapp-help"
                      className="w-5 h-5 accent-[#0D6B38] shrink-0"
                    />
                    <span className="font-bold text-[#0B2341] text-xs">{t.whatsappLabel}</span>
                  </label>
                  <p id="career-whatsapp-help" className="text-xs text-[#424751] mt-2 ml-8">
                    {t.whatsappDesc}{' '}
                    <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-semibold underline">{t.privacyLink} (↗)</Link>
                  </p>
                </div>

                <div className="bg-[#0D6B38]/10 p-4 rounded-xl border border-[#0D6B38]/20">
                  <p className="text-[#0D6B38] font-bold text-center italic text-sm">
                    "{t.trustQuote}"
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Wir verwenden die Angaben zur Bearbeitung deiner Bewerbung. <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" className="underline font-semibold">{t.privacyLink} (öffnet neuen Tab)</Link>
                  </p>

                  {submitError && (
                    <div role="alert" className="bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded-xl p-4">
                      {t.submitErrorText} <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={prevStep} className="flex-1 py-3 font-bold text-[#424751] bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                      {t.back}
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-3 bg-[#0D6B38] text-white rounded-xl font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-[1px] disabled:opacity-50 hover:bg-accent-dark transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                      {t.submit}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
