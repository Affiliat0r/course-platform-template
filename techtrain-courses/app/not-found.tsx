import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Pagina niet gevonden
          </h2>
          <p className="text-secondary-600">
            Sorry, de pagina die je zoekt bestaat niet of is verplaatst. Controleer de URL of ga terug naar de homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">Terug naar home</Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline">Bekijk cursussen</Button>
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm text-secondary-500">
            Populaire pagina&apos;s:{' '}
            <Link href="/courses" className="text-primary-600 hover:text-primary-700">
              Cursussen
            </Link>
            {' · '}
            <Link href="/about" className="text-primary-600 hover:text-primary-700">
              Over ons
            </Link>
            {' · '}
            <Link href="/contact" className="text-primary-600 hover:text-primary-700">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
