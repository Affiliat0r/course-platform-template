'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterState {
  categories: string[];
  formats: string[];
  levels: string[];
  priceRange: [number, number];
  startDate: string[];
  extras: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  courseCount: number;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-secondary-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 hover:bg-secondary-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-secondary-900">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-secondary-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-secondary-600" />
        )}
      </button>
      {isOpen && <div className="pb-4 px-1">{children}</div>}
    </div>
  );
}

export default function FilterPanel({
  filters,
  onFilterChange,
  categories,
  courseCount,
}: FilterPanelProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleFormatChange = (format: string) => {
    const newFormats = filters.formats.includes(format)
      ? filters.formats.filter((f) => f !== format)
      : [...filters.formats, format];

    onFilterChange({ ...filters, formats: newFormats });
  };

  const handleLevelChange = (level: string) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];

    onFilterChange({ ...filters, levels: newLevels });
  };

  const handleExtraChange = (extra: string) => {
    const newExtras = filters.extras.includes(extra)
      ? filters.extras.filter((e) => e !== extra)
      : [...filters.extras, extra];

    onFilterChange({ ...filters, extras: newExtras });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      formats: [],
      levels: [],
      priceRange: [0, 5000],
      startDate: [],
      extras: [],
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.formats.length > 0 ||
    filters.levels.length > 0 ||
    filters.extras.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 5000;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 sticky top-24">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Wis alle
            </button>
          )}
        </div>

        <div className="space-y-0">
          {/* Categories */}
          <FilterSection title="Categorie">
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 rounded border-secondary-300"
                  />
                  <span className="text-sm text-secondary-700 group-hover:text-secondary-900">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Format */}
          <FilterSection title="Format">
            <div className="space-y-2">
              {['Klassikaal', 'Online', 'Hybrid', 'Incompany'].map((format) => (
                <label
                  key={format}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={filters.formats.includes(format.toLowerCase())}
                    onChange={() => handleFormatChange(format.toLowerCase())}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 rounded border-secondary-300"
                  />
                  <span className="text-sm text-secondary-700 group-hover:text-secondary-900">
                    {format}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Level */}
          <FilterSection title="Niveau">
            <div className="space-y-2">
              {[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Gemiddeld' },
                { value: 'advanced', label: 'Gevorderd' },
              ].map((level) => (
                <label
                  key={level.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={filters.levels.includes(level.value)}
                    onChange={() => handleLevelChange(level.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 rounded border-secondary-300"
                  />
                  <span className="text-sm text-secondary-700 group-hover:text-secondary-900">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Prijs">
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex items-center justify-between text-sm text-secondary-600">
                <span>€ 0</span>
                <span className="font-semibold text-primary-600">
                  Tot € {filters.priceRange[1].toLocaleString('nl-NL')}
                </span>
              </div>
            </div>
          </FilterSection>

          {/* Extras */}
          <FilterSection title="Extra opties">
            <div className="space-y-2">
              {[
                { value: 'certificate', label: 'Certificaat inbegrepen' },
                { value: 'discount', label: 'Met korting' },
                { value: 'high_rated', label: 'Hoog beoordeeld (4.5+)' },
                { value: 'bestseller', label: 'Populair' },
              ].map((extra) => (
                <label
                  key={extra.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={filters.extras.includes(extra.value)}
                    onChange={() => handleExtraChange(extra.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 rounded border-secondary-300"
                  />
                  <span className="text-sm text-secondary-700 group-hover:text-secondary-900">
                    {extra.label}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Results count */}
        <div className="mt-6 pt-4 border-t border-secondary-200">
          <div className="text-sm text-secondary-600 text-center">
            <span className="font-bold text-primary-600">{courseCount}</span>{' '}
            {courseCount === 1 ? 'cursus' : 'cursussen'} gevonden
          </div>
        </div>
      </div>
    </div>
  );
}
