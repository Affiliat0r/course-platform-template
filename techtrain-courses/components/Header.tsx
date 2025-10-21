'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import Button from './ui/Button';
import { useUser } from '@/contexts/UserContext';
import { signOut } from '@/app/actions/auth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, loading } = useUser();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOut();
    });
  };

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
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-secondary-200 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary-100 transition-colors"
                  aria-label="Gebruikersmenu"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-secondary-700">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-secondary-200 py-2">
                    <div className="px-4 py-2 border-b border-secondary-200">
                      <p className="text-sm font-medium text-secondary-900">
                        {user.user_metadata?.full_name || 'Gebruiker'}
                      </p>
                      <p className="text-xs text-secondary-600 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      disabled={isPending}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      {isPending ? 'Bezig met uitloggen...' : 'Uitloggen'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-primary-600 font-medium">
                Inloggen
              </Link>
            )}
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

              {user ? (
                <>
                  <div className="pt-4 border-t border-secondary-200">
                    <p className="text-sm font-medium text-secondary-900 mb-1">
                      {user.user_metadata?.full_name || 'Gebruiker'}
                    </p>
                    <p className="text-xs text-secondary-600 mb-4">{user.email}</p>
                  </div>
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-secondary-700 hover:text-primary-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    disabled={isPending}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-left disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    {isPending ? 'Bezig met uitloggen...' : 'Uitloggen'}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inloggen
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
