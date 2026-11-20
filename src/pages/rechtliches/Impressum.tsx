import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { SITE } from '@/lib/site';

export default function Impressum() {
  return (
    <div>
      <SEO
        title="Impressum | AHAD Cleaning"
        description="Rechtliche Informationen und Impressum der AHAD Cleaning Company GmbH, Villingen-Schwenningen."
        keywords="Impressum AHAD Cleaning, Rechtliches, Kontaktinformationen"
      />
      <PageHero compact eyebrow="Rechtliches" title="Impressum" crumbs={[{ label: 'Impressum' }]} />
      <div className="max-w-4xl mx-auto px-4 section-y">
        <div
          className="prose prose-slate max-w-none"
        >

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 DDG</h2>
            <p className="text-slate">
              AHAD Cleaning Company GmbH<br />
              Max-Planck-Straße 11<br />
              78052 Villingen-Schwenningen
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Vertreten durch:</h2>
            <p className="text-slate">Geschäftsführerin: Nurhan Yerlikaya</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="text-slate">
              Telefon: <a href={SITE.phoneHref} className="underline">{SITE.phone}</a><br />
              E-Mail: <a href={SITE.emailHref} className="underline">{SITE.email}</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Registereintrag</h2>
            <p className="text-slate">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Freiburg im Breisgau<br />
              Registernummer: HRB 712961
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
            <p className="text-slate">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE301347274
            </p>
          </section>

          {/* § 55 Abs. 2 RStV ist seit 2020 durch den Medienstaatsvertrag abgelöst. */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p className="text-slate">
              Nurhan Yerlikaya<br />
              Max-Planck-Straße 11<br />
              78052 Villingen-Schwenningen
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
