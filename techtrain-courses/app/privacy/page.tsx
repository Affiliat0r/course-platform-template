import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Privacybeleid | TechTrain',
  description: 'Privacybeleid van TechTrain IT cursussen en trainingen',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Privacybeleid
          </h1>
          <p className="text-secondary-600">
            Laatst bijgewerkt: 16 oktober 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              1. Inleiding
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              TechTrain respecteert de privacy van alle bezoekers van onze website en cursusdeelnemers. In dit privacybeleid leggen we uit welke persoonsgegevens we verzamelen, waarom we deze verzamelen en hoe we deze gebruiken. Dit beleid is opgesteld in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              2. Welke Gegevens Verzamelen We?
            </h2>
            <div className="text-secondary-700 leading-relaxed space-y-3">
              <p>
                <strong>2.1 Persoonsgegevens bij inschrijving:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Naam en voorletters</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Bedrijfsnaam (indien van toepassing)</li>
                <li>Facturatiegegevens</li>
              </ul>
              <p className="mt-4">
                <strong>2.2 Technische gegevens:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IP-adres</li>
                <li>Browsertype en -versie</li>
                <li>Gebruikte apparaat</li>
                <li>Cookies (zie Cookiebeleid)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              3. Waarvoor Gebruiken We Uw Gegevens?
            </h2>
            <div className="text-secondary-700 leading-relaxed">
              <p className="mb-3">We gebruiken uw persoonsgegevens voor:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Het verwerken van uw cursusboeking</li>
                <li>Communicatie over cursussen en trainingen</li>
                <li>Het versturen van bevestigingsmails en facturen</li>
                <li>Het verzenden van nieuwsbrieven (met uw toestemming)</li>
                <li>Het verbeteren van onze diensten</li>
                <li>Het voldoen aan wettelijke verplichtingen</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              4. Hoe Lang Bewaren We Uw Gegevens?
            </h2>
            <div className="text-secondary-700 leading-relaxed space-y-3">
              <p>
                We bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Cursusgegevens: tot 2 jaar na afloop van de cursus</li>
                <li>Facturatiegegevens: 7 jaar (wettelijke verplichting)</li>
                <li>Nieuwsbriefabonnement: tot u zich uitschrijft</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              5. Delen We Uw Gegevens?
            </h2>
            <div className="text-secondary-700 leading-relaxed space-y-3">
              <p>
                TechTrain verkoopt uw persoonsgegevens nooit aan derden. We delen uw gegevens alleen:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Met dienstverleners die ons helpen bij het leveren van onze diensten (bijvoorbeeld betalingsverwerkers)</li>
                <li>Wanneer we wettelijk verplicht zijn dit te doen</li>
                <li>Met uw uitdrukkelijke toestemming</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              6. Beveiliging van Gegevens
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              We nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of wijziging. Dit omvat onder andere SSL-versleuteling, beveiligde servers en toegangsbeperking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              7. Uw Rechten
            </h2>
            <div className="text-secondary-700 leading-relaxed">
              <p className="mb-3">U heeft de volgende rechten met betrekking tot uw persoonsgegevens:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Recht op inzage:</strong> U kunt opvragen welke gegevens we van u hebben</li>
                <li><strong>Recht op rectificatie:</strong> U kunt onjuiste gegevens laten corrigeren</li>
                <li><strong>Recht op verwijdering:</strong> U kunt verzoeken uw gegevens te verwijderen</li>
                <li><strong>Recht op dataportabiliteit:</strong> U kunt uw gegevens in een gestructureerd formaat opvragen</li>
                <li><strong>Recht op bezwaar:</strong> U kunt bezwaar maken tegen bepaalde verwerkingen</li>
              </ul>
              <p className="mt-4">
                Om uw rechten uit te oefenen, kunt u contact met ons opnemen via onze{' '}
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                  contactpagina
                </Link>
                .
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              8. Cookies
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Onze website maakt gebruik van cookies om de gebruikerservaring te verbeteren. Functionele cookies zijn noodzakelijk voor het functioneren van de website. Voor analytische en marketing cookies vragen we uw toestemming.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              9. Wijzigingen in dit Beleid
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie vind u altijd op deze pagina. Belangrijke wijzigingen communiceren we via e-mail aan onze cursusdeelnemers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              10. Contact
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Voor vragen over dit privacybeleid of het uitoefenen van uw rechten kunt u contact met ons opnemen:
            </p>
            <div className="mt-4 bg-secondary-50 p-4 rounded-lg">
              <p className="text-secondary-700 font-medium">TechTrain</p>
              <p className="text-secondary-600 mt-2">
                E-mail: privacy@techtrain.nl<br />
                Website:{' '}
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                  Contactformulier
                </Link>
              </p>
            </div>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-8 flex gap-4">
          <Link href="/">
            <Button variant="outline">Terug naar home</Button>
          </Link>
          <Link href="/terms">
            <Button variant="outline">Algemene Voorwaarden</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
