'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import Button from '@/components/ui/Button';
import { courses, categories } from '@/lib/data';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  // Initialize filters from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');

    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === '' || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-80 flex items-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Beheers IT-Vaardigheden
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Zoek cursussen..."
                className="pl-12 pr-4 h-14 w-full rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-secondary-900 placeholder-secondary-500 focus:ring-2 focus:ring-white focus:border-white transition-all shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {(searchQuery || selectedCategory) && (
            <Button
              variant="outline"
              size="lg"
              className="mt-4 bg-white hover:bg-white/90"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
            >
              Filters Wissen
            </Button>
          )}
        </div>
      </section>

      {/* Filters and Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-200 sticky top-24">
              <h2 className="text-xl font-bold text-secondary-900 mb-5 pb-3 border-b border-secondary-200">
                Categorie
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-secondary-700">Alle Categorieën</span>
                </label>
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                Trainingscatalogus
              </h2>
              <p className="text-secondary-600 text-lg">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'cursus' : 'cursussen'} gevonden
              </p>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-secondary-200">
                <div className="max-w-md mx-auto">
                  <svg className="w-20 h-20 mx-auto mb-4 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-secondary-700 text-xl font-medium mb-2">
                    Geen cursussen gevonden
                  </p>
                  <p className="text-secondary-500 mb-6">
                    Probeer een andere zoekterm of filter
                  </p>
                  <Button
                    size="lg"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                    }}
                  >
                    Filters Wissen
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
