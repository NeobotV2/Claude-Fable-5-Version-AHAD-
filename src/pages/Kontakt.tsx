import { Phone, Mail, MapPin, Clock, FileText, ChevronRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { SITE, WHATSAPP_HREF } from '@/lib/site';

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
    hint: 'Wir antworten persönlich, ohne Ticketsystem',
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
        description="Kontaktieren Sie AHAD Cleaning für eine unverbindliche Anfrage oder Objektbesichtigung. Wir klären Bedarf, Termin und Angebot persönlich."
        keywords="Kontakt Gebäudereinigung, Angebot anfordern Reinigung, AHAD Cleaning Kontakt"
      />

      <PageHero
        compact
        eyebrow="Kontakt"
        title="Sprechen wir über Ihr Objekt."
        lead="Ob unverbindliche Anfrage, Objektbesichtigung oder eine kurze Fachfrage: Wir klären den Bedarf persönlich und vereinbaren die nächsten Schritte."
        crumbs={[{ label: 'Kontakt' }]}
      >
        <ol className="mt-10 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3 max-w-3xl">
          {[
            { value: '1', label: 'Anfrage per Formular, Telefon oder E-Mail' },
            { value: '2', label: 'Besichtigung in der Regel binnen 48 h' },
            { value: '3', label: 'Angebot im Anschluss' },
          ].map((promise) => (
            <li key={promise.label} className="flex items-baseline gap-3">
              <span className="font-accent text-xl font-semibold text-accent" aria-hidden="true">
                {promise.value}
              </span>
              <span className="text-body-sm text-slate leading-snug">{promise.label}</span>
            </li>
          ))}
        </ol>
      </PageHero>

      <section className="section-y bg-paper">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formular */}
          <div className="lg:col-span-7">
            <div>
              <h2 className="display-md text-navy mb-3">Nachricht schreiben</h2>
              <p className="text-slate text-lg mb-8">
                Füllen Sie das Formular aus. Wir melden uns persönlich bei Ihnen.
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>

          {/* Direktkanäle */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="relative bg-navy text-white p-8 lg:p-10 rounded-3xl shadow-lifted overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <FileText size={110} />
                </div>
                <div className="relative z-10">
                  <span className="eyebrow text-mint mb-4">Online-Anfrage</span>
                  <h3 className="font-headline text-2xl font-bold mb-3">Digitale Objektaufnahme</h3>
                  <p className="text-ondark/85 mb-7 leading-relaxed">
                    In vier Schritten erfassen Sie die wichtigsten Daten zu Ihrem Objekt. Damit bereiten wir die
                    Besichtigung und das Angebot vor.
                  </p>
                  <Link
                    to="/angebot"
                    className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-bold hover:bg-accent-dark transition-all"
                  >
                    Besichtigung anfragen <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {contactChannels.map((channel, i) => (
                <div key={channel.title}>
                  <div className="bg-white p-6 rounded-2xl flex items-start gap-4 border border-line">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
