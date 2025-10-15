'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  password: z.string().min(6, 'Wachtwoord moet minimaal 6 karakters zijn'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login:', data);
    alert('Inloggen succesvol! (Demo mode)');
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Welkom Terug</h1>
          <p className="text-secondary-600">Log in op je TechTrain account</p>
        </div>

        <Card className="p-8">
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

            <Button type="submit" size="lg" className="w-full">
              Inloggen
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
