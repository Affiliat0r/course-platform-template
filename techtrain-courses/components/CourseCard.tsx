import Link from 'next/link';
import Image from 'next/image';
import { Course, TrainingFormat } from '@/types';
import { formatPrice } from '@/lib/utils';
import Card from './ui/Card';
import { Star, Globe } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

const formatLabels: Record<TrainingFormat, string> = {
  virtual: 'Virtueel',
  classroom: 'Klassikaal',
  corporate: 'Bedrijf',
  private: 'Privé',
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full">
          <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium z-10 shadow-sm">
            {formatLabels[course.format]}
          </span>
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-secondary-600 mb-3 line-clamp-2 flex-1">
            {course.shortDescription}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(course.price)}
              </span>
              {course.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-secondary-500">
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase">{course.language}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
