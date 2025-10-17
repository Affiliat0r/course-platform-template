import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { formatPrice } from '@/lib/utils';
import Card from './ui/Card';
import { Star, Globe } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  showPrice?: boolean;
}

export default function CourseCard({ course, showPrice = true }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-secondary-200 bg-white">
        <div className="relative h-52 w-full overflow-hidden bg-secondary-100">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Urgency badge - next course date */}
          {course.dates && course.dates[0] && (
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-secondary-900 shadow-lg">
              Volgende: {new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' }).format(course.dates[0])}
            </div>
          )}

          {/* Category badge - move to top left on image */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-lg shadow-lg">
              {course.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-secondary-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-secondary-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Metadata row */}
          <div className="flex items-center gap-3 text-sm text-secondary-500 mb-4 pb-4 border-b border-secondary-100">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{course.duration}</span>
            </div>

            {course.rating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-secondary-900">{course.rating.toFixed(1)}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-secondary-500 ml-auto">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">{course.language}</span>
            </div>
          </div>

          {/* Price CTA */}
          {showPrice && (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-secondary-500 mb-0.5">Vanaf</div>
                <div className="text-2xl font-bold text-primary-600">
                  {formatPrice(course.price)}
                </div>
              </div>
              <div className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg group-hover:bg-primary-700 transition-colors">
                Bekijk →
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
