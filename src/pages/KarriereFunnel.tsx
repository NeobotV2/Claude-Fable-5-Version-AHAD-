import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check, Send, Smartphone, MapPin, Calendar, Briefcase, User, Info, Loader2, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '@/firebase';
import SEO from '@/components/SEO';
import { languages, translations, Language } from '@/constants/funnelTranslations';

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
  privacyAccepted: boolean;
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
  privacyAccepted: false,
};

export default function KarriereFunnel() {
  const [lang, setLang] = useState<Language | null>(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const t = lang ? translations[lang] : translations.de;
  const isRtl = lang ? languages.find(l => l.id === lang)?.rtl : false;

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const updateData = (fields: Partial<FunnelData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.privacyAccepted) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'job_applications'), {
        ...data,
        language: lang,
        createdAt: serverTimestamp(),
        status: 'new'
      });

      // Send email notification
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'job_application', data: { ...data, language: lang } })
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      handleFirestoreError(error, OperationType.WRITE, 'job_applications');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;

  if (!lang) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <SEO title="Language Selection | AHAD Cleaning" description="Choose your language for the application." />
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h1 className="text-2xl font-black text-[#0B2341] mb-4">{t.successTitle}</h1>
          <p className="text-[#424751] mb-8">{t.successText}</p>
          <Link to="/" className="block w-full bg-[#0D6B38] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-green-900 transition-all">
            {t.backHome}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] pt-24 pb-12 lg:pt-28 lg:pb-16 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <SEO 
        title={`${t.title} | AHAD Cleaning`} 
        description={t.subtitle}
      />

      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D6B38]">
              {step === 4 ? t.fastDone : `${t.step} ${step} ${t.of} 4`}
            </span>
            <span className="text-xs font-bold text-[#0D6B38]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#0D6B38]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
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
                    onClick={() => {
                      updateData({ jobType: item.title });
                      nextStep();
                    }}
                    className={`p-4 text-left rounded-xl border-2 transition-all ${
                      data.jobType === item.title 
                        ? 'border-[#0D6B38] bg-green-50' 
                        : 'border-white bg-white hover:border-gray-200'
                    } shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className="font-black text-lg text-[#0B2341]">{item.title}</div>
                    <div className="text-sm text-[#424751]">{item.desc}</div>
                  </button>
                ))}
              </div>
              
              <button onClick={() => setLang(null)} className="flex items-center gap-2 text-[#424751] font-bold py-3 mx-auto">
                <Globe size={18} /> {t.langSelect}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
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
                    onClick={() => {
                      updateData({ department: item.title });
                      nextStep();
                    }}
                    className={`p-4 text-left rounded-xl border-2 transition-all ${
                      data.department === item.title 
                        ? 'border-[#0D6B38] bg-green-50' 
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
              initial={{ opacity: 0, x: 20 }}
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
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-2">{t.experienceLabel}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => updateData({ experience: 'Ja' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        data.experience === 'Ja' ? 'border-[#0D6B38] bg-green-50 text-[#0D6B38]' : 'border-white bg-white'
                      }`}
                    >
                      {t.expYes}
                    </button>
                    <button
                      onClick={() => updateData({ experience: 'Quereinsteiger' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        data.experience === 'Quereinsteiger' ? 'border-[#0D6B38] bg-green-50 text-[#0D6B38]' : 'border-white bg-white'
                      }`}
                    >
                      {t.expNo}
                    </button>
                  </div>
                </div>

                {/* Starttermin */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-2">{t.startLabel}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => updateData({ startDate: 'Sofort' })}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        data.startDate === 'Sofort' ? 'border-[#0D6B38] bg-green-50 text-[#0D6B38]' : 'border-white bg-white'
                      }`}
                    >
                      {t.startNow}
                    </button>
                    <div className="relative">
                      <input
                        type="date"
                        onChange={(e) => updateData({ startDate: e.target.value })}
                        className={`w-full py-3 px-4 rounded-xl border-2 font-bold transition-all outline-none ${
                          data.startDate !== 'Sofort' && data.startDate !== '' ? 'border-[#0D6B38] bg-green-50' : 'border-white bg-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobilität */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-2">{t.mobilityLabel}</label>
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
                      <input
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
                </div>

                {/* Trust Box */}
                <div className="bg-green-50 p-4 rounded-xl flex gap-3 border border-green-100">
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
                  className="flex-[2] py-3 bg-[#0D6B38] text-white rounded-xl font-bold shadow-sm hover:shadow-md hover:-translate-y-[1px] disabled:opacity-50 hover:bg-green-900 transition-all"
                >
                  {t.next}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-[#0B2341] mb-2">{t.step4Title}</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-1">{t.nameLabel}</label>
                    <div className="relative">
                      <User className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        required
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        className={`w-full p-3 ${isRtl ? 'pr-11' : 'pl-11'} bg-white rounded-xl border-2 border-transparent focus:border-[#0D6B38] outline-none shadow-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0D6B38] mb-1">{t.phoneLabel}</label>
                    <div className="relative">
                      <Smartphone className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                      <input
                        required
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className={`w-full p-3 ${isRtl ? 'pr-11' : 'pl-11'} bg-white rounded-xl border-2 border-transparent focus:border-[#0D6B38] outline-none shadow-sm`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-transparent has-[:checked]:border-[#0D6B38]">
                  <label className="flex gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.whatsappOptIn}
                      onChange={(e) => updateData({ whatsappOptIn: e.target.checked })}
                      className="w-5 h-5 accent-[#0D6B38] shrink-0"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#0B2341] block mb-0.5">{t.whatsappLabel}</span>
                      <span className="text-gray-500">{t.whatsappDesc}</span>
                    </div>
                  </label>
                </div>

                <div className="bg-[#0D6B38]/10 p-4 rounded-xl border border-[#0D6B38]/20">
                  <p className="text-[#0D6B38] font-bold text-center italic text-sm">
                    "{t.trustQuote}"
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex gap-2 cursor-pointer items-start">
                    <input
                      required
                      type="checkbox"
                      checked={data.privacyAccepted}
                      onChange={(e) => updateData({ privacyAccepted: e.target.checked })}
                      className="w-4 h-4 accent-[#0D6B38] mt-0.5 shrink-0"
                    />
                    <span className="text-[11px] text-gray-500 leading-relaxed">
                      {t.privacyLabel} <Link to="/datenschutz" className="underline">{t.privacyLink}</Link>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button type="button" onClick={prevStep} className="flex-1 py-3 font-bold text-[#424751] bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                      {t.back}
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting || !data.privacyAccepted}
                      className="flex-[2] py-3 bg-[#0D6B38] text-white rounded-xl font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-[1px] disabled:opacity-50 hover:bg-green-900 transition-all flex items-center justify-center gap-2"
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
