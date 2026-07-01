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
          className="prose prose-slate max-w-none"
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
            <h3 className="text-xl font-bold mb-2">Vercel Web Analytics</h3>
            <p className="text-gray-600">
              Zur statistischen Auswertung der Websitenutzung verwenden wir Vercel Web Analytics, einen Dienst der
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel Web Analytics arbeitet
              <strong> cookielos</strong> und ohne Wiedererkennung einzelner Besucher: Es werden weder Cookies gesetzt
              noch Daten im Browser gespeichert und kein geräteübergreifendes Tracking durchgeführt. Erfasst werden
              ausschließlich aggregierte, anonymisierte Nutzungsdaten (z. B. aufgerufene Seiten, Referrer, ungefähre
              Herkunftsregion, Gerätetyp und Browser). Eine Identifizierung Ihrer Person ist uns dadurch nicht möglich.
            </p>
            <p className="text-gray-600 mt-4">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der
              datensparsamen, anonymen Analyse des Nutzungsverhaltens zur Verbesserung unseres Webangebots. Da keine
              personenbezogenen Profile gebildet und keine Cookies verwendet werden, erfolgt die Reichweitenmessung
              ohne Einwilligung. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO). Weitere
              Informationen:{' '}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-semibold hover:underline"
              >
                vercel.com/docs/analytics/privacy-policy
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Hosting & Content-Delivery-Network</h2>
            <h3 className="text-xl font-bold mb-2">Vercel (Hosting)</h3>
            <p className="text-gray-600">
              Wir hosten unsere Website bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Beim
              Aufruf der Website verarbeitet Vercel technisch notwendige Daten in Server-Logfiles (u. a. IP-Adresse,
              Datum/Uhrzeit der Anfrage, abgerufene Datei, Browser-/Gerätedaten), um die Seite auszuliefern und deren
              Sicherheit und Stabilität zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einer sicheren und effizienten Bereitstellung). Mit Vercel besteht ein Vertrag zur
              Auftragsverarbeitung (Art. 28 DSGVO); die Übermittlung in die USA erfolgt auf Basis der
              EU-Standardvertragsklauseln. Details: https://vercel.com/legal/privacy-policy
            </p>
            <h3 className="text-xl font-bold mb-2 mt-4">Cloudflare (CDN, DNS &amp; Sicherheit)</h3>
            <p className="text-gray-600">
              Zur schnellen und sicheren Auslieferung sowie zum Schutz vor Angriffen nutzen wir das Content-Delivery-
              und DNS-Netzwerk der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA. Cloudflare
              verarbeitet dabei technisch notwendige Verbindungsdaten (u. a. IP-Adresse und Anfragedaten).
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Sicherheit und Performance).
              Es besteht ein Auftragsverarbeitungsvertrag; die Übermittlung in die USA erfolgt auf Basis der
              EU-Standardvertragsklauseln. Details: https://www.cloudflare.com/privacypolicy/
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Kontaktformular</h2>
            <p className="text-gray-600">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-gray-600 mt-4">
              Zur technischen Verarbeitung der Formulardaten setzen wir Google Firebase (Cloud Firestore) ein, einen
              Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Verarbeitung
              erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung Ihrer Anfrage) bzw. Ihrer
              Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Google: https://policies.google.com/privacy
            </p>
            <p className="text-gray-600 mt-4">
              Für die E-Mail-Benachrichtigung über eingegangene Anfragen nutzen wir zusätzlich den Versanddienst
              Resend (Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Dabei werden die im
              Formular angegebenen Daten zur Zustellung der Benachrichtigung an uns verarbeitet. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. b bzw. f DSGVO; die Übermittlung in die USA erfolgt auf Basis der
              EU-Standardvertragsklauseln. Details: https://resend.com/legal/privacy-policy
            </p>
            <p className="text-gray-600 mt-4">
              <strong>Speicherdauer:</strong> Die über Kontakt-, Angebots- und Bewerbungsformulare übermittelten Daten
              speichern wir nur so lange, wie es für die Bearbeitung Ihres Anliegens erforderlich ist. Anfragedaten
              löschen wir spätestens nach Abschluss der Bearbeitung und Ablauf etwaiger Anschlussfragen;
              Bewerbungsdaten löschen wir spätestens sechs Monate nach Abschluss des Bewerbungsverfahrens, sofern
              keine Einstellung erfolgt und Sie keiner längeren Speicherung zugestimmt haben. Gesetzliche
              Aufbewahrungspflichten bleiben unberührt. Sie können jederzeit die Löschung Ihrer Daten verlangen
              (Kontakt: {'info@ahad-cleaning.de'}).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Schriftarten (lokal gehostet)</h2>
            <p className="text-gray-600">
              Diese Website nutzt zur einheitlichen Darstellung Schriftarten, die lokal auf unserem Server
              installiert sind. Eine Verbindung zu Servern von Google oder anderen Drittanbietern findet beim
              Laden der Schriftarten nicht statt; Ihre IP-Adresse wird hierfür nicht an Dritte übertragen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">7. Externe Bildinhalte</h2>
            <p className="text-gray-600">
              Zur Illustration binden wir Bildmaterial von externen Content-Delivery-Netzwerken ein (insbesondere
              Unsplash, images.unsplash.com, sowie Logodienste für Referenzdarstellungen). Beim Laden dieser
              Bilder wird Ihre IP-Adresse technisch bedingt an den jeweiligen Anbieter übermittelt. Die Einbindung
              erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote (berechtigtes Interesse
              gemäß Art. 6 Abs. 1 lit. f DSGVO). Es werden dabei keine Cookies gesetzt.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
