'use client';

import { Star, Users, Award, Clock, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import Badge from './ui/Badge';
import { formatPrice } from '@/lib/utils';

interface CourseHeaderProps {
  course: Course;
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  const nextDate = course.dates[0];
  const formattedDate = nextDate
    ? new Intl.DateTimeFormat('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(nextDate)
    : 'op aanvraag';

  const getLevelLabel = (level?: string) => {
    const labels: Record<string, string> = {
      beginner: 'Beginner',
      intermediate: 'Gemiddeld',
      advanced: 'Gevorderd',
    };
    return level ? labels[level] || level : 'Alle niveaus';
  };

  return (
    <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${course.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-600/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-white/80 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/courses" className="hover:text-white transition-colors">
            Cursussen
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/courses?category=${course.category}`} className="hover:text-white transition-colors">
            {course.category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white font-medium">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge variant="primary" size="md" className="bg-white/20 backdrop-blur-sm border-white/30">
                {course.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Training {course.title}
            </h1>

            {/* Instructor */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src={course.instructor.imageUrl}
                  alt={course.instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-white/80 text-sm">Docent</div>
                <div className="text-white font-semibold">{course.instructor.name}</div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {course.rating && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-bold text-lg">{course.rating.toFixed(1)}</span>
                  {course.reviewCount && (
                    <span className="text-white/80 text-sm">
                      ({course.reviewCount} beoordelingen)
                    </span>
                  )}
                </div>
              )}

              {course.studentCount && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">{course.studentCount}</span>
                  <span className="text-white/80 text-sm">studenten</span>
                </div>
              )}

              {course.hasCertificate && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Certificaat</span>
                </div>
              )}
            </div>

            {/* Course Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{getLevelLabel(course.level)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="font-medium uppercase">{course.language}</span>
              </div>
            </div>
          </div>

          {/* CTA Card - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-white/20">
              {/* Price */}
              <div className="mb-4">
                {course.hasDiscount && course.discountPercentage && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-secondary-500 line-through text-lg">
                      {formatPrice(course.price / (1 - course.discountPercentage / 100))}
                    </span>
                    <Badge variant="warning" size="sm">
                      {course.discountPercentage}% korting
                    </Badge>
                  </div>
                )}
                <div className="text-4xl font-bold text-primary-600">
                  {formatPrice(course.price)}
                </div>
                <div className="text-sm text-secondary-600 mt-1">excl. BTW</div>
              </div>

              {/* Next Start Date */}
              <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
                <div className="text-sm text-secondary-600 mb-1">Volgende start</div>
                <div className="text-lg font-bold text-secondary-900">{formattedDate}</div>
                {course.spotsLeft && course.spotsLeft <= 5 && (
                  <div className="mt-2">
                    <Badge variant="urgency" size="sm">
                      Laatste {course.spotsLeft} {course.spotsLeft === 1 ? 'plaats' : 'plaatsen'}!
                    </Badge>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/inschrijven?course=${course.slug}`}
                  className="block w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white text-center font-bold rounded-xl transition-colors shadow-lg"
                >
                  Direct Inschrijven
                </Link>
                <Link
                  href="/contact"
                  className="block w-full px-6 py-3 bg-white hover:bg-secondary-50 text-secondary-900 text-center font-semibold rounded-xl border-2 border-secondary-200 transition-colors"
                >
                  Download Brochure
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-secondary-200 space-y-3 text-sm text-secondary-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Certificaat inbegrepen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Cursusmateriaal inbegrepen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>14 dagen niet goed, geld terug</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Ook incompany beschikbaar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
