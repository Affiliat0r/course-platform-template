'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types';

interface CourseHeaderProps {
  course: Course;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  // Get the next available date
  const nextDate = course.dates[0];
  const formattedDate = nextDate
    ? new Intl.DateTimeFormat('nl-NL', {
        day: 'numeric',
        month: 'long',
      }).format(nextDate)
    : 'op aanvraag';

  // Display star rating
  const renderStars = () => {
    const rating = course.rating || 4.5;
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Training {course.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-700">
          <span className="font-semibold">{course.duration}</span>
          <span className="text-gray-400">|</span>
          <span className="font-semibold">
            € {course.price.toLocaleString('nl-NL')}
          </span>
          <span className="text-gray-400">|</span>
          <span>
            Eerstvolgende startdatum <strong>{formattedDate}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-600">Gemiddelde waardering</span>
          {renderStars()}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            Bel mij
          </Link>
          <Link
            href={`/checkout?course=${course.slug}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Ik wil me inschrijven
          </Link>
        </div>
      </div>
    </div>
  );
}
