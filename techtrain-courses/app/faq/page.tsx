'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Hoe kan ik mij inschrijven voor een cursus?',
    answer: 'U kunt zich inschrijven via onze website door naar de cursuspagina te gaan en op "Inschrijven" te klikken. U ontvangt een bevestiging per e-mail met alle details.',
  },
  {
    question: 'Wat zijn de betalingsmogelijkheden?',
    answer: 'We accepteren verschillende betaalmethoden: creditcard, iDEAL, en voor bedrijven is betaling op factuur mogelijk. Betaling dient binnen 14 dagen na factuurdatum te geschieden.',
  },
  {
    question: 'Kan ik mijn inschrijving annuleren?',
    answer: 'Ja, annulering is mogelijk. Tot 14 dagen voor aanvang van de cursus zijn er geen kosten. Tussen 14 en 7 dagen betaalt u 50%, en binnen 7 dagen voor aanvang betaalt u het volledige cursusgeld.',
  },
  {
    question: 'Krijg ik een certificaat na afloop van de cursus?',
    answer: 'Ja, na succesvolle afronding van de cursus ontvangt u een officieel TechTrain certificaat. Voor sommige cursussen is een examen vereist om het certificaat te behalen.',
  },
  {
    question: 'Zijn de cursussen ook online beschikbaar?',
    answer: 'Ja, we bieden veel van onze cursussen zowel fysiek als virtueel (online) aan. Op de cursuspagina kunt u zien welke opties beschikbaar zijn en de data selecteren die voor u het beste passen.',
  },
  {
    question: 'Wat heb ik nodig voor een online cursus?',
    answer: 'Voor online cursussen heeft u een computer met stabiele internetverbinding nodig, een webcam en een microfoon. Specifieke software-vereisten staan vermeld op de cursuspagina.',
  },
  {
    question: 'Bieden jullie ook bedrijfstrainingen aan?',
    answer: 'Ja, we bieden maatwerktrainingen voor bedrijven. Deze kunnen on-site bij uw bedrijf plaatsvinden of virtueel. Neem contact met ons op voor een offerte op maat.',
  },
  {
    question: 'Wat is het niveau van de cursussen?',
    answer: 'Onze cursussen variëren van beginner tot gevorderd niveau. Op elke cursuspagina staat duidelijk aangegeven wat het vereiste kennisniveau is en welke voorkennis gewenst is.',
  },
  {
    question: 'Kunnen cursussen worden uitgesteld naar een andere datum?',
    answer: 'Ja, tot 7 dagen voor aanvang kunt u kosteloos overstappen naar een andere datum. Neem hiervoor contact met ons op via de contactpagina of per e-mail.',
  },
  {
    question: 'Krijg ik toegang tot cursusmateriaal na afloop?',
    answer: 'Ja, alle cursusdeelnemers krijgen levenslang toegang tot de digitale cursusmaterialen en oefenbestanden via ons online leerplatform.',
  },
  {
    question: 'Zijn de trainers gecertificeerd?',
    answer: 'Ja, al onze trainers zijn gecertificeerde professionals met jarenlange praktijkervaring in hun vakgebied. Ze worden regelmatig bijgeschoold om up-to-date te blijven met de nieuwste ontwikkelingen.',
  },
  {
    question: 'Hoe zit het met parkeren bij een fysieke training?',
    answer: 'Bij onze trainingslocaties is gratis parkeren mogelijk. U ontvangt de exacte locatiegegevens en parkeermogelijkheden in de bevestigingsmail.',
  },
  {
    question: 'Is er catering tijdens de cursus?',
    answer: 'Bij fysieke cursussen zijn koffie, thee en lunch inbegrepen in de cursusprijs. Speciale dieetwensen kunt u bij inschrijving aangeven.',
  },
  {
    question: 'Kan ik een proefles volgen?',
    answer: 'Voor sommige cursussen bieden we gratis introductiesessies aan. Bekijk onze website voor het actuele aanbod of neem contact met ons op voor meer informatie.',
  },
  {
    question: 'Hoe kan ik contact opnemen met TechTrain?',
    answer: 'U kunt ons bereiken via het contactformulier op onze website, per e-mail of telefonisch. We streven ernaar binnen 24 uur te reageren op alle vragen.',
  },
];

function FAQAccordion({ faq, isOpen, onClick }: { faq: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-secondary-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex items-start justify-between gap-4 text-left hover:bg-secondary-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-secondary-900 flex-1">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-secondary-600 transition-transform flex-shrink-0 mt-0.5 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-secondary-700 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Veelgestelde Vragen
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Vind snel antwoorden op de meest gestelde vragen over onze IT cursussen en trainingen.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          {faqs.map((faq, index) => (
            <FAQAccordion
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Staat uw vraag er niet bij?
          </h2>
          <p className="text-secondary-700 mb-6">
            Neem gerust contact met ons op. Ons team helpt u graag verder!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button>Contact Opnemen</Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline">Bekijk Cursussen</Button>
            </Link>
          </div>
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
