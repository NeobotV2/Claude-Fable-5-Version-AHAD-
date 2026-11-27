import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import ButtonLink from '@/components/ui/Button';
import { HQ_LOCAL_BUSINESS_SCHEMA, SITE, WHATSAPP_HREF } from '@/lib/site';

const channelLink = 'inline-block py-2.5 -my-2.5 font-semibold text-accent hover:text-accent-dark hover:underline underline-offset-4';

const contactChannels = [
  {
    title: 'Telefon',
    content: (
      <a href={SITE.phoneHref} className={`${channelLink} font-accent text-xl`}>
        {SITE.phone}
      </a>
    ),
    hint: SITE.hours,
  },
  {
    title: 'WhatsApp',
    content: (
      <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={channelLink}>
        Direkt schreiben
      </a>
    ),
    hint: 'Schnelle Rückfrage ohne Formular',
  },
  {
    title: 'E-Mail',
    content: (
      <a href={SITE.emailHref} className={`${channelLink} break-all`}>
        {SITE.email}
      </a>
    ),
    hint: 'Wir antworten persönlich, ohne Ticketsystem',
  },
  {
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
        schema={HQ_LOCAL_BUSINESS_SCHEMA ?? undefined}
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
            { value: '2', label: 'Besichtigung in der Regel binnen 48 h' },
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

      <section className="section-y bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12">
          {/* Formular */}
          <div className="lg:col-span-7">
            <h2 className="display-md text-navy mb-3">Nachricht schreiben</h2>
            <p className="text-slate text-lg mb-8">Füllen Sie das Formular aus. Wir melden uns persönlich bei Ihnen.</p>
            <ContactForm />
          </div>

          {/* Direkte Wege */}
          <div className="lg:col-span-5">
            <h2 className="pb-4 border-b border-navy font-semibold text-navy">Direkt erreichen</h2>
            <dl>
              {contactChannels.map((channel) => (
                <div key={channel.title} className="grid grid-cols-[6.5rem_1fr] gap-x-4 py-4 border-b border-line">
                  <dt className="text-body-sm text-slate pt-0.5">{channel.title}</dt>
                  <dd className="min-w-0">
                    {channel.content}
                    <p className="text-caption text-slate mt-1">{channel.hint}</p>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 bg-navy text-white p-6 sm:p-8">
              <p className="eyebrow text-mint mb-2">Online-Anfrage</p>
              <h3 className="text-xl font-bold mb-2.5">Digitale Objektaufnahme</h3>
              <p className="text-ondark mb-6 leading-relaxed">
                In vier Schritten erfassen Sie die wichtigsten Daten zu Ihrem Objekt. Damit bereiten wir die
                Besichtigung und das Angebot vor.
              </p>
              <ButtonLink to="/angebot" variant="white" arrow>
                Kostenlose Besichtigung anfragen
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
