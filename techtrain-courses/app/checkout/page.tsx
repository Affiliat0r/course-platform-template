'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, CreditCard, Building2, FileText } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { courses } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().min(10, 'Telefoonnummer is verplicht'),
  billingType: z.enum(['individual', 'corporate']),
  companyName: z.string().optional(),
  billingAddress: z.string().optional(),
  paymentMethod: z.enum(['card', 'ideal', 'invoice']),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'Je moet akkoord gaan met de algemene voorwaarden',
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('course');
  const dateStr = searchParams.get('date');

  const course = courses.find((c) => c.id === courseId);
  const selectedDate = dateStr ? new Date(dateStr) : null;

  const [step, setStep] = useState(1);
  const [billingType, setBillingType] = useState<'individual' | 'corporate'>('individual');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billingType: 'individual',
      paymentMethod: 'card',
      termsAccepted: false,
    },
  });

  const watchBillingType = watch('billingType');
  const watchPaymentMethod = watch('paymentMethod');

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Form submitted:', data);
    // Here you would handle the payment processing
    alert('Bestelling succesvol verzonden! (Demo mode)');
  };

  if (!course || !selectedDate) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-secondary-900 mb-4">Ongeldige Afrekening</h1>
        <p className="text-secondary-600">Cursus of datum niet gevonden.</p>
      </div>
    );
  }

  // Calculate VAT (21% for Netherlands)
  const VAT_RATE = 0.21;
  const subtotal = course.price;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Afrekenen</h1>
          <div className="flex items-center gap-2 text-sm">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-600' : 'text-secondary-400'}`}>
              {step > 1 ? <Check className="w-5 h-5" /> : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs">1</span>}
              <span>Contactgegevens</span>
            </div>
            <div className="w-12 h-0.5 bg-secondary-300" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-600' : 'text-secondary-400'}`}>
              {step > 2 ? <Check className="w-5 h-5" /> : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs">2</span>}
              <span>Facturering</span>
            </div>
            <div className="w-12 h-0.5 bg-secondary-300" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary-600' : 'text-secondary-400'}`}>
              <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs">3</span>
              <span>Betaling</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Contactgegevens</h2>
                <div className="space-y-4">
                  <Input
                    label="Naam"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Jan Jansen"
                  />
                  <Input
                    label="E-mail"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="jan@voorbeeld.nl"
                  />
                  <Input
                    label="Telefoonnummer"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="+31 6 12345678"
                  />
                </div>
              </Card>

              {/* Billing Details */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Factuurgegevens</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-3">
                      Factureringstype
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          value="individual"
                          {...register('billingType')}
                          className="sr-only peer"
                        />
                        <div className="p-4 border-2 rounded-lg peer-checked:border-primary-600 peer-checked:bg-primary-50">
                          <div className="font-medium">Particulier</div>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          value="corporate"
                          {...register('billingType')}
                          className="sr-only peer"
                        />
                        <div className="p-4 border-2 rounded-lg peer-checked:border-primary-600 peer-checked:bg-primary-50">
                          <div className="font-medium">Bedrijf</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {watchBillingType === 'corporate' && (
                    <>
                      <Input
                        label="Bedrijfsnaam"
                        {...register('companyName')}
                        placeholder="Acme Corporation"
                      />
                      <Input
                        label="Factuuradres"
                        {...register('billingAddress')}
                        placeholder="123 Zakelijke Straat, Amsterdam"
                      />
                    </>
                  )}
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Selecteer Betaalmethode</h2>
                <div className="space-y-3">
                  <label className="relative cursor-pointer block">
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod')}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 rounded-lg peer-checked:border-primary-600 peer-checked:bg-primary-50 flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Credit-/Debetkaart</span>
                    </div>
                  </label>

                  <label className="relative cursor-pointer block">
                    <input
                      type="radio"
                      value="ideal"
                      {...register('paymentMethod')}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 rounded-lg peer-checked:border-primary-600 peer-checked:bg-primary-50 flex items-center gap-3">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">iDEAL</span>
                    </div>
                  </label>

                  <label className="relative cursor-pointer block">
                    <input
                      type="radio"
                      value="invoice"
                      {...register('paymentMethod')}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 rounded-lg peer-checked:border-primary-600 peer-checked:bg-primary-50 flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">Bankoverschrijving (Factuur)</span>
                    </div>
                  </label>
                </div>

                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('termsAccepted')}
                      className="w-4 h-4 mt-0.5 text-primary-600 rounded"
                    />
                    <span className="text-sm text-secondary-700">
                      Ik ga akkoord met de Algemene Voorwaarden en het Privacybeleid
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="mt-1 text-sm text-red-500">{errors.termsAccepted.message}</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Besteloverzicht</h2>

                <div className="space-y-3 mb-6">
                  <div>
                    <h3 className="font-semibold text-secondary-900">{course.title}</h3>
                    <p className="text-sm text-secondary-600 mt-1">
                      {formatDate(selectedDate)}
                    </p>
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600">Cursusprijs (excl. BTW)</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600">BTW (21%)</span>
                      <span className="font-medium">{formatPrice(vat)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-lg pt-3 border-t">
                    <span>Totaal (incl. BTW)</span>
                    <span className="text-primary-600">{formatPrice(total)}</span>
                  </div>

                  <p className="text-xs text-secondary-500 italic">
                    1 deelnemer • Inclusief materialen & certificaat
                  </p>
                </div>

                <Input
                  placeholder="Promocode"
                  className="mb-4"
                />

                <Button type="submit" size="lg" className="w-full">
                  Bestelling Voltooien
                </Button>

                <p className="text-xs text-secondary-600 text-center mt-4">
                  Veilige betaling • Directe bevestiging
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Laden...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
