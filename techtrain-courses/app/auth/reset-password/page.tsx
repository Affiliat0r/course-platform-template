'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { updatePassword } from '@/app/actions/auth';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Wachtwoord moet minimaal 8 karakters zijn'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('password', data.password);
      formData.append('confirm_password', data.confirmPassword);

      const result = await updatePassword(formData);

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
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Nieuw Wachtwoord Instellen</h1>
          <p className="text-secondary-600">
            Voer je nieuwe wachtwoord in
          </p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Nieuw wachtwoord"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="••••••••"
            />

            <Input
              label="Bevestig nieuw wachtwoord"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="••••••••"
            />

            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending ? 'Bezig met opslaan...' : 'Wachtwoord opslaan'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
