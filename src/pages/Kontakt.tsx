import { Phone, Mail, MapPin, Clock, FileText, ChevronRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/ContactForm';
import { SITE, PROMISES, WHATSAPP_HREF } from '@/lib/site';

const contactChannels = [
  {
    icon: <Phone size={22} />,
    title: 'Telefon',
    content: (
      <a href={SITE.phoneHref} className="text-brand hover:text-brand-light font-bold text-lg transition-colors">
        {SITE.phone}
      </a>
    ),
    hint: SITE.hours,
  },
  {
    icon: <MessageCircle size={22} />,
    title: 'WhatsApp',
    content: (
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-brand-light font-bold transition-colors"
      >
        Direkt schreiben
      </a>
    ),
    hint: 'Schnelle Rückfrage ohne Formular',
  },
  {
    icon: <Mail size={22} />,
    title: 'E-Mail',
    content: (
      <a href={SITE.emailHref} className="text-brand hover:text-brand-light font-bold break-all transition-colors">
        {SITE.email}
      </a>
    ),
    hint: 'Persönliche Antwort — kein Ticketsystem',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Zentrale',
    content: (
      <span className="text-navy font-semibold">
        {SITE.address.street}
        <br />
        {SITE.address.zip} {SITE.address.city}
      </span>
    ),
    hint: 'Termine nach Vereinbarung',
  },
];

export default function Kontakt() {
  return (
    <div>
      <SEO
        title="Kontakt: Angebot & Beratung | AHAD Cleaning"
        description="Kontaktieren Sie AHAD Cleaning für ein unverbindliches Angebot oder eine Objektbesichtigung. Antwort innerhalb von 24 Stunden garantiert."
        keywords="Kontakt Gebäudereinigung, Angebot anfordern Reinigung, AHAD Cleaning Kontakt"
      />

      <PageHero
        compact
        eyebrow="Kontakt"
        title="Sprechen wir über Ihr Objekt."
        lead="Ob unverbindliches Angebot, Objektbesichtigung oder eine kurze Fachfrage: Wir antworten persönlich — und garantiert innerhalb von 24 Stunden."
        crumbs={[{ label: 'Kontakt' }]}
      >
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
          {PROMISES.map((promise) => (
            <div key={promise.label} className="flex items-center gap-3">
              <span className="font-accent text-3xl font-bold text-mint">{promise.value}</span>
              <span className="text-[13px] font-semibold text-blue-100/80 leading-snug">{promise.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formular */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display-md text-navy mb-3">Nachricht schreiben</h2>
              <p className="text-slate text-lg mb-8">
                Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>

          {/* Direktkanäle */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.15}>
              <div className="relative bg-navy text-white p-8 lg:p-10 rounded-3xl shadow-lifted overflow-hidden grain">
                <div className="absolute inset-0 blueprint-grid" />
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <FileText size={110} />
                </div>
                <div className="relative z-10">
                  <span className="eyebrow text-mint mb-4">Schneller geht's nicht</span>
                  <h3 className="font-headline text-2xl font-bold mb-3">Express-Angebot</h3>
                  <p className="text-blue-100/85 mb-7 leading-relaxed">
                    Vier Fragen, 60 Sekunden: Unser digitaler Assistent erfasst Ihr Objekt strukturiert — für ein
                    besonders schnelles, präzises Angebot.
                  </p>
                  <Link
                    to="/angebot"
                    className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-bold hover:bg-accent-dark transition-all shadow-glow hover:-translate-y-0.5"
                  >
                    Zum Express-Funnel <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="space-y-4">
              {contactChannels.map((channel, i) => (
                <Reveal key={channel.title} delay={0.2 + i * 0.07}>
                  <div className="bg-white p-6 rounded-2xl flex items-start gap-4 border border-line shadow-soft">
                    <div className="w-12 h-12 bg-brand/8 text-brand rounded-xl grid place-items-center shrink-0">
                      {channel.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-navy text-sm mb-1">{channel.title}</h4>
                      {channel.content}
                      <p className="text-xs text-slate/80 mt-1 flex items-center gap-1.5">
                        <Clock size={11} />
                        {channel.hint}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
