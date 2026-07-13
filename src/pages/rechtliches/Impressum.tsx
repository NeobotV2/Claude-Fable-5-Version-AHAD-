import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';

export default function Impressum() {
  return (
    <div>
      <SEO
        title="Impressum - AHAD Cleaning"
        description="Rechtliche Informationen und Impressum der AHAD Cleaning Gebäudedienstleistungen GmbH."
        keywords="Impressum AHAD Cleaning, Rechtliches, Kontaktinformationen"
      />
      <PageHero compact eyebrow="Rechtliches" title="Impressum" crumbs={[{ label: 'Impressum' }]} />
      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate max-w-none"
        >

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 DDG</h2>
            <p className="text-gray-600">
              AHAD Cleaning Company GmbH<br />
              Max-Planck-Straße 11<br />
              78052 Villingen-Schwenningen
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Vertreten durch:</h2>
            <p className="text-gray-600">Geschäftsführerin: Nurhan Yerlikaya</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="text-gray-600">
              Telefon: +49 7721 944 79 15<br />
              E-Mail: info@ahad-cleaning.de
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Registereintrag</h2>
            <p className="text-gray-600">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Freiburg im Breisgau<br />
              Registernummer: HRB 712961
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
            <p className="text-gray-600">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE301347274
            </p>
          </section>

          {/* § 55 Abs. 2 RStV ist seit 2020 durch den Medienstaatsvertrag abgelöst. */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p className="text-gray-600">
              Nurhan Yerlikaya<br />
              Max-Planck-Straße 11<br />
              78052 Villingen-Schwenningen
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
