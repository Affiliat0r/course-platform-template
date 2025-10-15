'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const contactSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  subject: z.string().min(5, 'Onderwerp is verplicht'),
  message: z.string().min(20, 'Bericht moet minimaal 20 karakters zijn'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form:', data);
    alert('Bedankt voor je bericht! We nemen binnenkort contact met je op.');
    reset();
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-secondary-100 max-w-3xl">
            Heb je vragen? We staan klaar om te helpen. Neem contact op met ons team.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <Mail className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold mb-2">E-mail</h3>
              <p className="text-secondary-700">info@techtrain.com</p>
              <p className="text-secondary-700">support@techtrain.com</p>
            </Card>

            <Card className="p-6">
              <Phone className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold mb-2">Telefoon</h3>
              <p className="text-secondary-700">+31 20 123 4567</p>
              <p className="text-secondary-700">+31 20 123 4568</p>
            </Card>

            <Card className="p-6">
              <MapPin className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold mb-2">Adres</h3>
              <p className="text-secondary-700">
                123 Tech Street<br />
                1012 AB Amsterdam<br />
                Nederland
              </p>
            </Card>

            <Card className="p-6">
              <Clock className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold mb-2">Openingstijden</h3>
              <p className="text-secondary-700">
                Maandag - Vrijdag: 9:00 - 18:00<br />
                Zaterdag: 10:00 - 16:00<br />
                Zondag: Gesloten
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Stuur ons een Bericht</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Naam"
                  {...register('name')}
                  error={errors.name?.message}
                  placeholder="Jouw naam"
                />

                <Input
                  label="E-mail"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="jij@voorbeeld.nl"
                />

                <Input
                  label="Onderwerp"
                  {...register('subject')}
                  error={errors.subject?.message}
                  placeholder="Hoe kunnen we helpen?"
                />

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Bericht
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Vertel ons meer over je vraag..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Bericht Versturen
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
