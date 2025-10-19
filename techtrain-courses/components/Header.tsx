'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/branding/logo.svg"
              alt="TechTrain"
              width={240}
              height={69}
              className="h-15 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-secondary-700 hover:text-primary-600 font-medium">
              Cursusaanbod
            </Link>
            <Link href="/corporate" className="text-secondary-700 hover:text-primary-600 font-medium">
              Bedrijfstraining
            </Link>
            <Link href="/about" className="text-secondary-700 hover:text-primary-600 font-medium">
              Over Ons
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-primary-600 font-medium">
              Inloggen
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Sluit menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-secondary-200"
            role="navigation"
            aria-label="Mobiele navigatie"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/courses"
                className="text-secondary-700 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cursusaanbod
              </Link>
              <Link
                href="/corporate"
                className="text-secondary-700 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bedrijfstraining
              </Link>
              <Link
                href="/about"
                className="text-secondary-700 hover:text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Over Ons
              </Link>
              <Link
                href="/login"
                className="text-primary-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inloggen
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
