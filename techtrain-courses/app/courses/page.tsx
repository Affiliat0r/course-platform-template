'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import Button from '@/components/ui/Button';
import { courses, categories } from '@/lib/data';
import { TrainingFormat } from '@/types';

const trainingFormats: { value: TrainingFormat; label: string }[] = [
  { value: 'classroom', label: 'Klassikaal' },
  { value: 'virtual', label: 'Virtueel' },
  { value: 'corporate', label: 'Bedrijf' },
  { value: 'private', label: 'Privé' },
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<TrainingFormat | ''>('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'nl' | ''>('');
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

      const matchesFormat =
        selectedFormat === '' || course.format === selectedFormat;

      const matchesLanguage =
        selectedLanguage === '' || course.language === selectedLanguage;

      return matchesSearch && matchesCategory && matchesFormat && matchesLanguage;
    });
  }, [searchQuery, selectedCategory, selectedFormat, selectedLanguage]);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BEHEERS IT-VAARDIGHEDEN
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Zoek cursussen..."
                className="pl-10 h-12 w-full rounded-lg border border-secondary-200 bg-white text-secondary-900 placeholder-secondary-500 focus:ring-2 focus:ring-white/50 focus:border-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="mt-6 bg-white"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedFormat('');
              setSelectedLanguage('');
            }}
          >
            Filters Wissen
          </Button>
        </div>
      </section>

      {/* Filters and Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Categorie</h2>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm">Alle Categorieën</span>
                </label>
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-4 pt-4 border-t">Trainingsformaat</h2>
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={selectedFormat === ''}
                    onChange={() => setSelectedFormat('')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm">Alle Formaten</span>
                </label>
                {trainingFormats.map((format) => (
                  <label key={format.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      checked={selectedFormat === format.value}
                      onChange={() => setSelectedFormat(format.value)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm">{format.label}</span>
                  </label>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-4 pt-4 border-t">Taal</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === ''}
                    onChange={() => setSelectedLanguage('')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm">Alle Talen</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === 'en'}
                    onChange={() => setSelectedLanguage('en')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm">Engels</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === 'nl'}
                    onChange={() => setSelectedLanguage('nl')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm">Nederlands</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-secondary-900">
                Trainingscatalogus
              </h2>
              <p className="text-secondary-600 mt-1">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'cursus' : 'cursussen'} gevonden
              </p>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <p className="text-secondary-600 text-lg">
                  Geen cursussen gevonden die aan je criteria voldoen.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedFormat('');
                    setSelectedLanguage('');
                  }}
                >
                  Filters Wissen
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
