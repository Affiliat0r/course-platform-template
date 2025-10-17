import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
  }).format(price);
}

export function formatDate(date: Date, locale: string = 'nl-NL'): string {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateWithDay(date: Date, locale: string = 'nl-NL'): string {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateShort(date: Date, locale: string = 'nl-NL'): string {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getWeekday(date: Date, locale: string = 'nl-NL'): string {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return date.toLocaleDateString(locale, {
      weekday: 'long',
    });
  }
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
  }).format(date);
}
