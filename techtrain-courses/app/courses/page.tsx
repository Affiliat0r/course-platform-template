'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import Button from '@/components/ui/Button';
import FilterPanel, { FilterState } from '@/components/FilterPanel';
import FilterDrawer from '@/components/FilterDrawer';
import SortBar, { SortOption, ViewMode } from '@/components/SortBar';
import { courses, categories } from '@/lib/data';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    formats: [],
    levels: [],
    priceRange: [0, 5000],
    startDate: [],
    extras: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filteredAndSortedCourses = useMemo(() => {
    // First, filter courses
    let result = courses.filter((course) => {
      // Search query
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(course.category);

      // Format filter
      const matchesFormat =
        filters.formats.length === 0 ||
        filters.formats.some((f) => {
          if (f === 'klassikaal') return course.format === 'classroom';
          if (f === 'online') return course.format === 'virtual';
          if (f === 'hybrid') return course.format === 'virtual'; // Adjust as needed
          if (f === 'incompany') return course.format === 'corporate';
          return false;
        });

      // Level filter
      const matchesLevel =
        filters.levels.length === 0 ||
        (course.level && filters.levels.includes(course.level));

      // Price filter
      const matchesPrice =
        course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1];

      // Extras filter
      const matchesExtras =
        filters.extras.length === 0 ||
        filters.extras.every((extra) => {
          if (extra === 'certificate') return course.hasCertificate;
          if (extra === 'discount') return course.hasDiscount;
          if (extra === 'high_rated') return (course.rating || 0) >= 4.5;
          if (extra === 'bestseller') return course.isBestseller;
          return true;
        });

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFormat &&
        matchesLevel &&
        matchesPrice &&
        matchesExtras
      );
    });

    // Then, sort courses
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popularity':
          return (b.studentCount || 0) - (a.studentCount || 0);
        case 'date':
          const aNextDate = a.dates[0]?.getTime() || Infinity;
          const bNextDate = b.dates[0]?.getTime() || Infinity;
          return aNextDate - bNextDate;
        case 'newest':
          const aUpdated = a.lastUpdated?.getTime() || 0;
          const bUpdated = b.lastUpdated?.getTime() || 0;
          return bUpdated - aUpdated;
        case 'relevance':
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, filters, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      categories: [],
      formats: [],
      levels: [],
      priceRange: [0, 5000],
      startDate: [],
      extras: [],
    });
  };

  const hasActiveFilters =
    searchQuery ||
    filters.categories.length > 0 ||
    filters.formats.length > 0 ||
    filters.levels.length > 0 ||
    filters.extras.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 5000;

  const getActiveFilterChips = () => {
    const chips: { label: string; onRemove: () => void }[] = [];

    if (searchQuery) {
      chips.push({
        label: `Zoeken: "${searchQuery}"`,
        onRemove: () => setSearchQuery(''),
      });
    }

    filters.categories.forEach((cat) => {
      chips.push({
        label: cat,
        onRemove: () =>
          setFilters({ ...filters, categories: filters.categories.filter((c) => c !== cat) }),
      });
    });

    filters.formats.forEach((format) => {
      const labels: Record<string, string> = {
        klassikaal: 'Klassikaal',
        online: 'Online',
        hybrid: 'Hybrid',
        incompany: 'Incompany',
      };
      chips.push({
        label: labels[format] || format,
        onRemove: () =>
          setFilters({ ...filters, formats: filters.formats.filter((f) => f !== format) }),
      });
    });

    filters.levels.forEach((level) => {
      const labels: Record<string, string> = {
        beginner: 'Beginner',
        intermediate: 'Gemiddeld',
        advanced: 'Gevorderd',
      };
      chips.push({
        label: labels[level] || level,
        onRemove: () =>
          setFilters({ ...filters, levels: filters.levels.filter((l) => l !== level) }),
      });
    });

    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) {
      chips.push({
        label: `€0 - €${filters.priceRange[1].toLocaleString('nl-NL')}`,
        onRemove: () => setFilters({ ...filters, priceRange: [0, 5000] }),
      });
    }

    return chips;
  };

  const activeFilterChips = getActiveFilterChips();

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
                aria-label="Zoek cursussen"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Active Filter Chips */}
        {activeFilterChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-secondary-600 font-medium">Actieve filters:</span>
            {activeFilterChips.map((chip, index) => (
              <button
                key={index}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                {chip.label}
                <X className="w-3.5 h-3.5" />
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-secondary-600 hover:text-secondary-900 font-medium underline"
            >
              Wis alle filters
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              courseCount={filteredAndSortedCourses.length}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          <FilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
            courseCount={filteredAndSortedCourses.length}
          />

          {/* Course Grid/List */}
          <main className="flex-1">
            {/* Sort Bar */}
            <SortBar
              courseCount={filteredAndSortedCourses.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onFilterClick={() => setIsFilterDrawerOpen(true)}
            />

            {/* Results */}
            {filteredAndSortedCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-secondary-200">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 text-secondary-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-secondary-700 text-xl font-medium mb-2">
                    Geen cursussen gevonden
                  </p>
                  <p className="text-secondary-500 mb-6">
                    Probeer een andere zoekterm of pas je filters aan
                  </p>
                  <Button size="lg" onClick={clearAllFilters}>
                    Wis alle filters
                  </Button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filteredAndSortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} variant="list" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
