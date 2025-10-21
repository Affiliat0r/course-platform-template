'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signUp } from '@/app/actions/auth';

const registerSchema = z.object({
  name: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(8, 'Wachtwoord moet minimaal 8 karakters zijn'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('full_name', data.name);

      const result = await signUp(formData);

      if (result?.error) {
        setError(result.error);
      }
      // If successful, the server action will redirect to /login with success message
    });
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Account Aanmaken</h1>
          <p className="text-secondary-600">Maak je TechTrain account aan en start met leren</p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Volledige naam"
              type="text"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Jan de Vries"
            />

            <Input
              label="E-mailadres"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="jij@voorbeeld.nl"
            />

            <Input
              label="Wachtwoord"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="••••••••"
            />

            <Input
              label="Bevestig wachtwoord"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="••••••••"
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-primary-600 rounded mt-1"
                required
              />
              <label htmlFor="terms" className="text-sm text-secondary-700">
                Ik ga akkoord met de{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                  algemene voorwaarden
                </Link>
                {' '}en het{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                  privacybeleid
                </Link>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending ? 'Bezig met registreren...' : 'Registreren'}
            </Button>

            <p className="text-center text-sm text-secondary-600">
              Heb je al een account?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Inloggen
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
