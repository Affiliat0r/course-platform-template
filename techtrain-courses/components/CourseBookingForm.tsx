'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Course } from '@/types';
import { formatPrice, formatDate, formatDateWithDay, getWeekday } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface CourseBookingFormProps {
  course: Course;
}

export default function CourseBookingForm({ course }: CourseBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Card className="p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-4">Eerstvolgende Beschikbare Data</h3>

      {/* Calendar/Dates */}
      <div className="mb-6">
        <div className="text-sm font-medium text-secondary-700 mb-3">Selecteer een startdatum</div>
        <div className="space-y-3">
          {course.dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`w-full text-left px-4 py-4 rounded-lg border-2 transition-all duration-200 ${
                selectedDate?.getTime() === date.getTime()
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-secondary-200 hover:border-primary-400 hover:shadow-sm'
              }`}
              aria-label={`Selecteer datum ${formatDateWithDay(date)}`}
              aria-pressed={selectedDate?.getTime() === date.getTime()}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${
                  selectedDate?.getTime() === date.getTime()
                    ? 'text-primary-600'
                    : 'text-secondary-400'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                    selectedDate?.getTime() === date.getTime()
                      ? 'text-primary-700'
                      : 'text-secondary-500'
                  }`}>
                    {getWeekday(date)}
                  </div>
                  <div className={`text-base font-bold ${
                    selectedDate?.getTime() === date.getTime()
                      ? 'text-primary-900'
                      : 'text-secondary-900'
                  }`}>
                    {formatDate(date)}
                  </div>
                </div>
                {selectedDate?.getTime() === date.getTime() && (
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
        <div className="text-3xl font-bold text-primary-600">
          {formatPrice(course.price)}
        </div>
        <div className="text-sm text-secondary-600 mt-1">Per deelnemer</div>
      </div>

      {/* Enroll Button */}
      {selectedDate ? (
        <Link href={`/checkout?course=${course.id}&date=${selectedDate.toISOString()}`} className="w-full mb-3 block">
          <Button size="lg" className="w-full">
            Nu Inschrijven
          </Button>
        </Link>
      ) : (
        <Button size="lg" className="w-full mb-3" disabled>
          Selecteer een datum om in te schrijven
        </Button>
      )}

      <p className="text-xs text-secondary-600 text-center">
        Veilige betaling • Directe bevestiging
      </p>
    </Card>
  );
}
