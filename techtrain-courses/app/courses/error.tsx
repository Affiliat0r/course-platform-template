'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CoursesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Courses error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-4">Fout bij laden van cursussen</h1>
          <p className="text-secondary-600">
            We konden de cursusinformatie niet laden. Probeer het opnieuw of ga terug naar de homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Probeer opnieuw
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Terug naar home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
