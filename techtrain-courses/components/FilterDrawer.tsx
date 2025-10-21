'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import { FilterState } from './FilterPanel';
import FilterPanel from './FilterPanel';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  courseCount: number;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  categories,
  courseCount,
}: FilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Drag Handle */}
          <div className="sticky top-0 z-10 bg-white pt-3 pb-2 border-b border-secondary-200">
            <div className="w-12 h-1 bg-secondary-300 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between px-6 pb-2">
              <h2 className="text-xl font-bold text-secondary-900">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
                aria-label="Sluit filters"
              >
                <X className="w-5 h-5 text-secondary-600" />
              </button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="px-4 pb-24">
            <FilterPanel
              filters={filters}
              onFilterChange={onFilterChange}
              categories={categories}
              courseCount={courseCount}
            />
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t border-secondary-200 p-4 shadow-lg">
            <button
              onClick={onClose}
              className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Toon {courseCount} {courseCount === 1 ? 'cursus' : 'cursussen'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
