import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Algemene Voorwaarden | TechTrain',
  description: 'Algemene voorwaarden van TechTrain IT cursussen en trainingen',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Algemene Voorwaarden
          </h1>
          <p className="text-secondary-600">
            Laatst bijgewerkt: 16 oktober 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              1. Toepasselijkheid
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en leveringen van diensten door TechTrain. Door gebruik te maken van onze diensten gaat u akkoord met deze voorwaarden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              2. Inschrijving en Betaling
            </h2>
            <div className="text-secondary-700 leading-relaxed space-y-3">
              <p>
                <strong>2.1</strong> Inschrijving voor een cursus geschiedt via onze website of telefonisch. De inschrijving is definitief na ontvangst van een bevestigingsmail.
              </p>
              <p>
                <strong>2.2</strong> Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij anders overeengekomen.
              </p>
              <p>
                <strong>2.3</strong> Bij bedrijfsopleidingen kunnen afwijkende betalingstermijnen worden overeengekomen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              3. Annulering en Wijziging
            </h2>
            <div className="text-secondary-700 leading-relaxed space-y-3">
              <p>
                <strong>3.1</strong> Annulering tot 14 dagen voor aanvang van de cursus: geen kosten.
              </p>
              <p>
                <strong>3.2</strong> Annulering tussen 14 en 7 dagen voor aanvang: 50% van het cursusgeld wordt in rekening gebracht.
              </p>
              <p>
                <strong>3.3</strong> Annulering binnen 7 dagen voor aanvang of bij niet-verschijnen: 100% van het cursusgeld wordt in rekening gebracht.
              </p>
              <p>
                <strong>3.4</strong> TechTrain behoudt zich het recht voor cursussen te annuleren of wijzigen. In geval van annulering door TechTrain wordt het volledige cursusgeld terugbetaald.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              4. Intellectueel Eigendom
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Alle cursusmateriaal, inclusief maar niet beperkt tot presentaties, oefeningen en software, blijft eigendom van TechTrain. Reproductie of verspreiding zonder toestemming is niet toegestaan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              5. Privacy en Gegevensbescherming
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              TechTrain respecteert uw privacy en handelt in overeenstemming met de AVG. Meer informatie vindt u in ons{' '}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                privacybeleid
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              6. Aansprakelijkheid
            </h2>
            <div className="text-secondary-700 leading-relaxed space-y-3">
              <p>
                <strong>6.1</strong> TechTrain is niet aansprakelijk voor schade als gevolg van cursusdeelname, behalve in geval van opzet of grove nalatigheid.
              </p>
              <p>
                <strong>6.2</strong> Aansprakelijkheid is in alle gevallen beperkt tot het bedrag van de cursusprijs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              7. Toepasselijk Recht
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen worden bij voorkeur in onderling overleg opgelost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              8. Contact
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Voor vragen over deze voorwaarden kunt u contact opnemen via onze{' '}
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                contactpagina
              </Link>
              .
            </p>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">Terug naar home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
