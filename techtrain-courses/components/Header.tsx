'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import Button from './ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <ChevronUp className="w-6 h-6 text-primary-600" />
              <ChevronUp className="w-6 h-6 text-primary-600 -mt-3" />
            </div>
            <span className="text-xl font-bold text-secondary-900">TECHTRAIN</span>
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
            <Button asChild>
              <Link href="/courses">Nu Inschrijven</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
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
              <Button asChild className="w-full">
                <Link href="/courses" onClick={() => setMobileMenuOpen(false)}>
                  Nu Inschrijven
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
