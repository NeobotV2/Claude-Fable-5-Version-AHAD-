import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Check, Send, Smartphone, User, Info, Loader2, Globe } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { languages, translations, Language } from '@/constants/funnelTranslations';
import { jobProfile } from '@/data/jobs';
import { trackEvent, useFunnelAbandonment } from '@/lib/analytics';
import { currentAttribution, describeFieldErrors, submitLead } from '@/lib/submit-lead';
import { SITE } from '@/lib/site';
import { useHistoryStep } from '@/lib/funnel-step';

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
  const [data, setData] = useState<FunnelData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorDetail, setSubmitErrorDetail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [searchParams] = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const idempotencyRef = useRef('');
  const formStartedAtRef = useRef(Date.now());
  const isFirstRender = useRef(true);
  // Schritt im Browser-Verlauf: Die Zurück-Taste führt einen Schritt zurück.
  const reachable = !data.jobType ? 1 : !data.department ? 2 : !data.experience || !data.startDate || !data.mobility ? 3 : 4;
  const { step, next: nextStep, back: prevStep } = useHistoryStep(4, reachable);

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

  // Frühestes wählbares Startdatum = heute nach Ortszeit (toISOString wäre UTC und
  // böte zwischen Mitternacht und 1/2 Uhr noch den Vortag an).
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const updateData = (fields: Partial<FunnelData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitErrorDetail('');

    const result = await submitLead({
      type: 'job_application',
      data: { ...data, language: lang, attribution: currentAttribution() },
      website: honeypot,
      formStartedAt: formStartedAtRef.current,
      idempotency: idempotencyRef,
      keyPrefix: 'job',
    });
    setIsSubmitting(false);

    if (result.ok) {
      setIsSuccess(true);
      trackEvent('Application Funnel Success', { language: lang || 'de', jobId: data.jobId || 'initiative' });
      return;
    }
    setSubmitError(true);
    // Feldfehler des Servers (z. B. Telefonformat) zusätzlich zum übersetzten Hinweis zeigen.
    if (result.kind === 'validation') setSubmitErrorDetail(describeFieldErrors(result.fields));
    else setSubmitErrorDetail(`Fehlercode: ${result.code}`);
    trackEvent('Application Funnel Error', { language: lang || 'de', jobId: data.jobId || 'initiative', kind: result.kind });
  };

  const progress = (step / 4) * 100;

  if (!lang) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <SEO title="Bewerbung: Sprache wählen | AHAD Cleaning" description="Wähle die Sprache für deine Bewerbung bei AHAD Cleaning. Choose your language for the application." noindex />
        <div className="max-w-xl w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe size={32} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-navy mb-4">Wähle deine Sprache</h1>
            <p className="text-slate">Choose your language / اختر لغتك</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className="p-4 bg-white rounded-2xl border-2 border-transparent hover:border-accent transition-colors flex flex-col items-center gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{l.flag}</span>
                <span className="font-bold text-navy">{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4 pt-32 pb-20 lg:pt-40 lg:pb-32" dir={isRtl ? 'rtl' : 'ltr'}>
        <div
          className="bg-white p-8 rounded-3xl max-w-md w-full text-center"
          role="status"
        >
          <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} aria-hidden="true" />
          </div>
          <h1 ref={successRef} tabIndex={-1} className="text-2xl font-bold text-navy mb-4 outline-none">{t.successTitle}</h1>
          <p className="text-slate mb-8">{t.successText}</p>
          <Link to="/" className="block w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent-dark transition-colors">
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-24 pb-12 lg:pt-28 lg:pb-16 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
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
          <div className="mb-5 rounded-xl border border-accent/25 bg-accent/8 p-4 text-sm text-navy">
            <strong>Gewähltes Einsatzprofil:</strong> {selectedProfile.title} · {selectedProfile.region}. Ob die Stelle aktuell frei ist, bestätigen wir dir persönlich.
          </div>
        )}
        {/* Progress Bar + jederzeit sichtbarer Sprachwechsel */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-accent">
              {step === 4 ? t.fastDone : `${t.step} ${step} ${t.of} 4`}
            </span>
            <span className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLang(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate hover:text-accent transition-colors"
                aria-label={t.langSelect}
              >
                <Globe size={13} aria-hidden="true" />
                {languages.find((l) => l.id === lang)?.flag} {languages.find((l) => l.id === lang)?.label}
              </button>
              <span className="text-xs font-bold text-accent">{Math.round(progress)}%</span>
            </span>
          </div>
          <div className="h-2 bg-line rounded-full overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step} aria-valuetext={`${t.step} ${step} ${t.of} 4`}>
            <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <>
          {step === 1 && (
            <div
              key="step1"
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">{t.step1Title}</h1>
                <p className="text-slate">{t.subtitle}</p>
              </div>

              <div className="grid gap-3">
                {[
                  { id: 'vollzeit', ...t.jobTypes.vollzeit, value: translations.de.jobTypes.vollzeit.title },
                  { id: 'teilzeit', ...t.jobTypes.teilzeit, value: translations.de.jobTypes.teilzeit.title },
                  { id: 'minijob', ...t.jobTypes.minijob, value: translations.de.jobTypes.minijob.title },
                ].map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={data.jobType === item.value}
                    aria-label={`${item.title}: ${item.desc}`}
                    onClick={() => {
                      // Gespeichert wird immer die deutsche Bezeichnung – die
                      // Sprache steht separat im Datensatz, das Team liest Deutsch.
                      updateData({ jobType: item.value });
                      nextStep();
                    }}
                    className={`p-4 text-left rounded-xl border-2 transition-colors ${
                      data.jobType === item.value
                        ? 'border-accent bg-accent/5'
                        : 'border-white bg-white hover:border-line'
                    } ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className="font-bold text-lg text-navy">{item.title}</div>
                    <div className="text-sm text-slate">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              key="step2"
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">{t.step2Title}</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'unterhalt', ...t.departments.unterhalt, value: translations.de.departments.unterhalt.title },
                  { id: 'glas', ...t.departments.glas, value: translations.de.departments.glas.title },
                  { id: 'bau', ...t.departments.bau, value: translations.de.departments.bau.title },
                  { id: 'sonder', ...t.departments.sonder, value: translations.de.departments.sonder.title },
                  { id: 'hausmeister', ...t.departments.hausmeister, value: translations.de.departments.hausmeister.title },
                  { id: 'gruenpflege', ...t.departments.gruenpflege, value: translations.de.departments.gruenpflege.title },
                  { id: 'leitung', ...t.departments.leitung, value: translations.de.departments.leitung.title },
                ].map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={data.department === item.value}
                    aria-label={`${item.title}: ${item.desc}`}
                    onClick={() => {
                      updateData({ department: item.value });
                      nextStep();
                    }}
                    className={`p-4 text-left rounded-xl border-2 transition-colors ${
                      data.department === item.value
                        ? 'border-accent bg-accent/5' 
                        : 'border-white bg-white hover:border-line'
                    } ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className="font-bold text-lg text-navy">{item.title}</div>
                    <div className="text-sm text-slate">{item.desc}</div>
                  </button>
                ))}
              </div>

              <button type="button" onClick={prevStep} className="flex items-center gap-2 text-slate font-bold py-3 hover:text-navy transition-colors">
                {isRtl ? <ChevronRight size={20} aria-hidden="true" /> : <ChevronLeft size={20} aria-hidden="true" />} {t.back}
              </button>
            </div>
          )}

          {step === 3 && (
            <div
              key="step3"
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">{t.step3Title}</h1>
                <p className="text-slate">{t.step3Subtitle}</p>
              </div>

              <div className="space-y-4">
                {/* Erfahrung */}
                <fieldset>
                  <legend className="block text-xs font-bold text-accent mb-2">{t.experienceLabel}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      aria-pressed={data.experience === 'Ja'}
                      onClick={() => updateData({ experience: 'Ja' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-colors ${
                        data.experience === 'Ja' ? 'border-accent bg-accent/5 text-accent' : 'border-white bg-white'
                      }`}
                    >
                      {t.expYes}
                    </button>
                    <button
                      aria-pressed={data.experience === 'Quereinsteiger'}
                      onClick={() => updateData({ experience: 'Quereinsteiger' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-colors ${
                        data.experience === 'Quereinsteiger' ? 'border-accent bg-accent/5 text-accent' : 'border-white bg-white'
                      }`}
                    >
                      {t.expNo}
                    </button>
                  </div>
                </fieldset>

                {/* Starttermin */}
                <fieldset>
                  <legend className="block text-xs font-bold text-accent mb-2">{t.startLabel}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      aria-pressed={data.startDate === 'Sofort'}
                      onClick={() => updateData({ startDate: 'Sofort' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-colors ${
                        data.startDate === 'Sofort' ? 'border-accent bg-accent/5 text-accent' : 'border-white bg-white'
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
                              className={`peer w-full py-3 px-4 rounded-xl border-2 font-bold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-accent/25 ${
                                hasDate
                                  ? 'border-accent bg-accent/5 text-accent'
                                  : 'border-white bg-white text-transparent focus:text-navy focus:border-accent'
                              }`}
                            />
                            {/* Native Date-Inputs zeigen keinen Placeholder — dieses Label
                                überlagert das leere Feld und verschwindet bei Fokus (Chromium
                                rendert getippte Segmente sonst unsichtbar) oder gewähltem Datum. */}
                            {!hasDate && (
                              <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center font-bold text-slate/60 peer-focus:hidden">
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
                  <legend className="block text-xs font-bold text-accent mb-2">{t.mobilityLabel}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'auto', label: t.mobAuto, value: translations.de.mobAuto },
                      { id: 'oepnv', label: t.mobPublic, value: translations.de.mobPublic },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer border-2 border-transparent has-[:checked]:border-accent">
                        <input
                          type="radio"
                          name="mobility"
                          value={item.value}
                          checked={data.mobility === item.value}
                          onChange={(e) => updateData({ mobility: e.target.value })}
                          className="w-5 h-5 accent-accent"
                        />
                        <span className="font-bold text-navy">{item.label}</span>
                      </label>
                    ))}
                    <div className="p-3 bg-white rounded-xl border-2 border-transparent has-[:focus-within]:border-accent sm:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="mobility"
                          value="Nur in"
                          checked={data.mobility === 'Nur in'}
                          onChange={(e) => updateData({ mobility: e.target.value })}
                          className="w-5 h-5 accent-accent"
                        />
                        <span className="font-bold text-navy">{t.mobOnlyIn}</span>
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
                        autoComplete="address-level2"
                        name="location"
                        className="w-full p-2.5 bg-paper rounded-lg outline-none border border-line focus:border-accent focus:ring-4 focus:ring-accent/15 transition-[border-color,box-shadow]"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Trust Box */}
                <div className="bg-accent/5 p-4 rounded-xl flex gap-3 border border-accent/20">
                  <Info className="text-accent shrink-0" size={20} aria-hidden="true" />
                  <p className="text-xs text-accent leading-relaxed">
                    <strong>{t.trustTitle}</strong> {t.trustText}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={prevStep} className="flex-1 py-3 font-bold text-slate bg-white rounded-xl hover:bg-paper transition-colors">
                  {t.back}
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={!data.experience || !data.startDate || !data.mobility}
                  className="flex-[2] py-3 bg-accent text-white rounded-xl font-bold disabled:opacity-50 hover:bg-accent-dark transition-colors"
                >
                  {t.next}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div
              key="step4"
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">{t.step4Title}</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                <div className="absolute -left-[10000px]" aria-hidden>
                  <label htmlFor="career-website">Website</label>
                  <input id="career-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="career-name" className="block text-xs font-bold text-accent mb-1">{t.nameLabel}</label>
                    <div className="relative">
                      <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate`} size={18} aria-hidden="true" />
                      <input
                        id="career-name"
                        name="name"
                        required
                        type="text"
                        autoComplete="name"
                        placeholder={t.namePlaceholder}
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        className={`w-full p-3 ${isRtl ? 'pr-11' : 'pl-11'} bg-white rounded-xl border-2 border-field focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-[border-color,box-shadow]`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="career-phone" className="block text-xs font-bold text-accent mb-1">{t.phoneLabel}</label>
                    <div className="relative">
                      <Smartphone className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate`} size={18} aria-hidden="true" />
                      <input
                        id="career-phone"
                        name="phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder={t.phonePlaceholder}
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className={`w-full p-3 ${isRtl ? 'pr-11' : 'pl-11'} bg-white rounded-xl border-2 border-field focus:border-accent focus:ring-4 focus:ring-accent/15 outline-none transition-[border-color,box-shadow]`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-field has-[:checked]:border-accent">
                  <label htmlFor="career-whatsapp" className="flex gap-3 cursor-pointer">
                    <input
                      id="career-whatsapp"
                      type="checkbox"
                      checked={data.whatsappOptIn}
                      onChange={(e) => updateData({ whatsappOptIn: e.target.checked })}
                      aria-describedby="career-whatsapp-help"
                      className="w-5 h-5 accent-accent shrink-0"
                    />
                    <span className="font-bold text-navy text-xs">{t.whatsappLabel}</span>
                  </label>
                  <p id="career-whatsapp-help" className="text-xs text-slate mt-2 ml-8">
                    {t.whatsappDesc}{' '}
                    <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-semibold underline">{t.privacyLink} (↗)</Link>
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                  <p className="text-accent font-bold text-center italic text-sm">
                    "{t.trustQuote}"
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-slate leading-relaxed">
                    Wir nutzen deine Angaben, um deine Bewerbung zu bearbeiten. <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" className="underline font-semibold">{t.privacyLink} (öffnet neuen Tab)</Link>
                  </p>

                  {submitError && (
                    <div role="alert" className="bg-danger-surface border border-danger-line text-danger text-sm font-medium rounded-xl p-4">
                      {t.submitErrorText} <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>
                      {submitErrorDetail && <span className="block mt-2" lang="de">{submitErrorDetail}</span>}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={prevStep} className="flex-1 py-3 font-bold text-slate bg-white rounded-xl hover:bg-paper transition-colors">
                      {t.back}
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-3 bg-accent text-white rounded-xl font-bold disabled:opacity-50 hover:bg-accent-dark transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
                      {t.submit}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
