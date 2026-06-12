import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';

export default function Datenschutz() {
  return (
    <div>
      <SEO
        title="Datenschutzerklärung - AHAD Cleaning"
        description="Informationen zum Datenschutz und zum Umgang mit Ihren Daten bei AHAD Cleaning."
        keywords="Datenschutz AHAD Cleaning, DSGVO, Datensicherheit"
      />
      <PageHero compact eyebrow="Rechtliches" title="Datenschutzerklärung" crumbs={[{ label: 'Datenschutz' }]} />
      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-blue max-w-none"
        >

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-bold mb-2">Allgemeine Hinweise</h3>
            <p className="text-gray-600">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Datenerfassung auf dieser Website</h2>
            <h3 className="text-xl font-bold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
            <p className="text-gray-600">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <h3 className="text-xl font-bold mb-2">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-gray-600">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Analyse-Tools und Tools von Drittanbietern</h2>
            <p className="text-gray-600">
              Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Hosting</h2>
            <p className="text-gray-600">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Google Cloud Platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Kontaktformular</h2>
            <p className="text-gray-600">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
