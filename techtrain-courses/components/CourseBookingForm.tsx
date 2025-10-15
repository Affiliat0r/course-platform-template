'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Course } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface CourseBookingFormProps {
  course: Course;
}

export default function CourseBookingForm({ course }: CourseBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(course.language);

  return (
    <Card className="p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-4">Eerstvolgende Beschikbare Data</h3>

      {/* Calendar/Dates */}
      <div className="mb-6">
        <div className="text-sm font-medium text-secondary-700 mb-2">Data</div>
        <div className="space-y-2">
          {course.dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                selectedDate?.getTime() === date.getTime()
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-secondary-200 hover:border-primary-300'
              }`}
              aria-label={`Selecteer datum ${formatDate(date)}`}
              aria-pressed={selectedDate?.getTime() === date.getTime()}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{formatDate(date)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <label htmlFor="language-select" className="block text-sm font-medium text-secondary-700 mb-2">
          Taal
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'nl')}
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="en">Engels</option>
          <option value="nl">Nederlands</option>
        </select>
      </div>

      {/* Price */}
      <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
        <div className="text-3xl font-bold text-primary-600">
          {formatPrice(course.price)}
        </div>
        <div className="text-sm text-secondary-600 mt-1">Per deelnemer</div>
      </div>

      {/* Enroll Button */}
      <Button
        size="lg"
        className="w-full mb-3"
        disabled={!selectedDate}
        asChild={selectedDate !== null}
      >
        {selectedDate ? (
          <Link href={`/checkout?course=${course.id}&date=${selectedDate.toISOString()}`}>
            Nu Inschrijven
          </Link>
        ) : (
          <span>Selecteer een datum om in te schrijven</span>
        )}
      </Button>

      <p className="text-xs text-secondary-600 text-center">
        Veilige betaling • Directe bevestiging
      </p>
    </Card>
  );
}
