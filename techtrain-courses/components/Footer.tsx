import Link from 'next/link';
import { Twitter, Github, Linkedin, Facebook } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="text-sm text-secondary-400 mb-4">
              Professionele IT-cursussen en trainingen voor het MKB en grote organisaties.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/techtrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/techtrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/techtrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Nieuwsbrief</h3>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Voer e-mail in"
                className="flex-1 bg-white"
              />
              <Button type="submit">Abonneren</Button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-secondary-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Juridisch</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-secondary-300 hover:text-white">
                  Algemene Voorwaarden
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary-300 hover:text-white">
                  Privacybeleid
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-700 pt-8 text-center">
          <p className="text-secondary-400 text-sm">
            © {new Date().getFullYear()} TechTrain. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
