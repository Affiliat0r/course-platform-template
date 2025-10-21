'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { resetPassword } from '@/app/actions/auth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', data.email);

      const result = await resetPassword(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSubmitted(true);
      }
    });
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Wachtwoord Vergeten</h1>
          <p className="text-secondary-600">
            {submitted
              ? 'We hebben je een e-mail gestuurd'
              : 'Voer je e-mailadres in om je wachtwoord opnieuw in te stellen'
            }
          </p>
        </div>

        <Card className="p-8">
          {!submitted ? (
            <>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="E-mailadres"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="jij@voorbeeld.nl"
                />

                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                  {isPending ? 'Bezig met verzenden...' : 'Verstuur reset link'}
                </Button>

                <p className="text-center text-sm text-secondary-600">
                  Weet je je wachtwoord weer?{' '}
                  <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Inloggen
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  Als er een account bestaat met dit e-mailadres, ontvang je binnen enkele minuten een e-mail met instructies om je wachtwoord opnieuw in te stellen.
                </p>
              </div>

              <div className="text-sm text-secondary-600 space-y-2">
                <p className="font-medium">E-mail niet ontvangen?</p>
                <ul className="list-disc list-inside space-y-1 text-secondary-600">
                  <li>Controleer je spam/ongewenste e-mail map</li>
                  <li>Zorg ervoor dat je het juiste e-mailadres hebt ingevoerd</li>
                  <li>Wacht een paar minuten en controleer opnieuw</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Probeer een ander e-mailadres
                </Button>
                <Link href="/login">
                  <Button variant="outline" className="w-full">Terug naar inloggen</Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        {!submitted && (
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Nog geen account?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Registreren
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
