'use client';

import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'rating'
  | 'popularity'
  | 'date'
  | 'newest';

export type ViewMode = 'grid' | 'list';

interface SortBarProps {
  courseCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onFilterClick?: () => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevantie' },
  { value: 'price_asc', label: 'Prijs: laag → hoog' },
  { value: 'price_desc', label: 'Prijs: hoog → laag' },
  { value: 'rating', label: 'Beoordeling: hoog → laag' },
  { value: 'popularity', label: 'Populariteit' },
  { value: 'date', label: 'Startdatum: eerst binnenkort' },
  { value: 'newest', label: 'Nieuwste cursussen' },
];

export default function SortBar({
  courseCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFilterClick,
}: SortBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Results count */}
        <div className="flex items-center gap-3">
          {/* Mobile filter button */}
          {onFilterClick && (
            <button
              onClick={onFilterClick}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-900 font-medium rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          )}

          <div className="text-secondary-900">
            <span className="font-bold text-lg">{courseCount}</span>{' '}
            <span className="text-secondary-600">
              {courseCount === 1 ? 'cursus' : 'cursussen'} gevonden
            </span>
          </div>
        </div>

        {/* Right: View mode and sort */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-secondary-100 p-1 rounded-lg">
            <button
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              )}
              aria-label="Grid weergave"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              )}
              aria-label="Lijst weergave"
              aria-pressed={viewMode === 'list'}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-secondary-600 whitespace-nowrap">
              Sorteer op:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3 py-2 bg-white border border-secondary-300 rounded-lg text-sm font-medium text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
