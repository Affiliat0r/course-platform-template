'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types';

interface SearchResult {
  results: Course[];
  summary: string;
  method: string;
  query: string;
  totalResults: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(query);
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  async function performSearch(searchQuery: string) {
    setIsLoading(true);
    setError(null);
    setIsOpen(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResult = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Er is een fout opgetreden bij het zoeken. Probeer het opnieuw.');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }

  function clearSearch() {
    setQuery('');
    setResults(null);
    setIsOpen(false);
    setError(null);
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Zoek naar cursussen, technologieën, vaardigheden..."
          className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none text-base"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (results || error) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-secondary-200 max-h-[600px] overflow-y-auto z-50">
          {error ? (
            <div className="p-6 text-center">
              <div className="text-red-600 font-medium">{error}</div>
            </div>
          ) : results && (
            <>
              {/* Search Summary Header */}
              {results.summary && (
                <div className="p-4 bg-primary-50 border-b border-primary-200">
                  <p className="text-sm text-secondary-700 leading-relaxed">
                    {results.summary}
                  </p>
                </div>
              )}

              {/* Results Count */}
              {results.results.length > 0 && (
                <div className="px-6 py-3 bg-secondary-50 border-b border-secondary-200">
                  <div className="text-sm text-secondary-600">
                    {results.results.length} {results.results.length === 1 ? 'cursus' : 'cursussen'} gevonden
                    {results.totalResults > results.results.length && (
                      <span className="text-secondary-500">
                        {' '}(top {results.results.length} van {results.totalResults})
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Course Results */}
              {results.results.length > 0 ? (
                <div className="divide-y divide-secondary-100">
                  {results.results.map((course, index) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-4 hover:bg-secondary-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Ranking Badge */}
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold text-sm flex items-center justify-center">
                          {index + 1}
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h4 className="font-semibold text-secondary-900 line-clamp-1">
                              {course.title}
                            </h4>
                            <div className="flex-shrink-0 text-lg font-bold text-primary-600">
                              {formatPrice(course.price)}
                            </div>
                          </div>

                          <p className="text-sm text-secondary-600 line-clamp-2 mb-2">
                            {course.shortDescription}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-secondary-500">
                            <span className="px-2 py-1 bg-secondary-100 rounded-full">
                              {course.category}
                            </span>
                            <span>{course.duration}</span>
                            {course.rating && <span>⭐ {course.rating.toFixed(1)}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-secondary-500 mb-2">
                    Geen cursussen gevonden voor "{results.query}"
                  </div>
                  <Link
                    href="/courses"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Bekijk alle cursussen →
                  </Link>
                </div>
              )}

              {/* View All Results Link */}
              {results.results.length > 0 && (
                <div className="p-4 bg-secondary-50 border-t border-secondary-200">
                  <Link
                    href={`/courses?search=${encodeURIComponent(results.query)}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Bekijk alle resultaten voor "{results.query}" →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
