'use client';

import { useState, useTransition, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signIn } from '@/app/actions/auth';

const loginSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 karakters zijn'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const result = await signIn(formData);

      if (result?.error) {
        setError(result.error);
      }
      // If successful, the server action will redirect to /dashboard
    });
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Welkom Terug</h1>
          <p className="text-secondary-600">Log in op je TechTrain account</p>
        </div>

        <Card className="p-8">
          {message && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}

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

            <Input
              label="Wachtwoord"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
                <span className="text-sm text-secondary-700">Onthoud mij</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Wachtwoord vergeten?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending ? 'Bezig met inloggen...' : 'Inloggen'}
            </Button>

            <p className="text-center text-sm text-secondary-600">
              Nog geen account?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Registreren
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Welkom Terug</h1>
            <p className="text-secondary-600">Log in op je TechTrain account</p>
          </div>
          <Card className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-secondary-200 rounded"></div>
              <div className="h-10 bg-secondary-200 rounded"></div>
              <div className="h-10 bg-secondary-200 rounded"></div>
            </div>
          </Card>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
