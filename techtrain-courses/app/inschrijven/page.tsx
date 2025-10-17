'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone } from 'lucide-react';
import { getCourseBySlug } from '@/lib/data';
import Card from '@/components/ui/Card';

function EnrollmentFormContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get('course');
  const course = courseSlug ? getCourseBySlug(courseSlug) : null;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    recaptcha: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Bedankt voor uw inschrijving! We nemen zo snel mogelijk contact met u op.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Cursus niet gevonden</h1>
          <p className="text-gray-700">De gevraagde cursus kon niet worden gevonden.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-2">
            Ik wil me graag inschrijven voor de
          </h1>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Training {course.title}
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-1">Vragen? Wij helpen je graag!</h3>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <a href="tel:0555768044" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                055 576 8044
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              (maandag t/m vrijdag tussen 9:00 en 17:30 uur)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Naam*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Uw volledige naam"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrijfsnaam
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Naam van uw bedrijf (optioneel)"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefoonnummer*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Uw telefoonnummer"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="uw.email@voorbeeld.nl"
              />
            </div>

            <div className="flex items-start gap-3 py-4">
              <input
                type="checkbox"
                id="recaptcha"
                name="recaptcha"
                checked={formData.recaptcha}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
              />
              <label htmlFor="recaptcha" className="text-sm text-gray-700">
                Ik ben geen robot
              </label>
            </div>

            <p className="text-sm text-gray-600">
              * verplicht invulveld
            </p>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Schrijf mij in
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Wij hebben deze gegevens nodig om je inschrijving te kunnen verwerken en zullen ze alleen voor dit doel gebruiken. In onze{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                  privacyverklaring
                </a>{' '}
                kun je lezen hoe Eduvision omgaat met je persoonsgegevens.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <EnrollmentFormContent />
    </Suspense>
  );
}
