'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { formatPrice } from '@/lib/utils';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { Star, Globe, Clock, Users, Award, Heart, TrendingUp } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';

interface CourseCardProps {
  course: Course;
  showPrice?: boolean;
  variant?: 'grid' | 'list';
}

export default function CourseCard({ course, showPrice = true, variant = 'grid' }: CourseCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(course.id);

  const getUrgencyBadge = () => {
    if (course.spotsLeft && course.spotsLeft <= 5) {
      return (
        <Badge variant="urgency" size="sm" className="shadow-lg">
          Laatste {course.spotsLeft} {course.spotsLeft === 1 ? 'plaats' : 'plaatsen'}
        </Badge>
      );
    }
    return null;
  };

  const getStatusBadges = () => {
    const badges = [];

    if (course.isBestseller) {
      badges.push(
        <Badge key="bestseller" variant="bestseller" size="sm" className="shadow-lg">
          <TrendingUp className="w-3 h-3 mr-1" />
          Populair
        </Badge>
      );
    }

    if (course.isNew) {
      badges.push(
        <Badge key="new" variant="new" size="sm" className="shadow-lg">
          Nieuw
        </Badge>
      );
    }

    if (course.hasDiscount && course.discountPercentage) {
      badges.push(
        <Badge key="discount" variant="warning" size="sm" className="shadow-lg">
          {course.discountPercentage}% korting
        </Badge>
      );
    }

    return badges;
  };

  const getNextDate = () => {
    if (!course.dates || course.dates.length === 0) return null;
    const nextDate = course.dates[0];

    return new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'short',
    }).format(nextDate);
  };

  const getLevelLabel = (level?: string) => {
    const labels: Record<string, string> = {
      beginner: 'Beginner',
      intermediate: 'Gemiddeld',
      advanced: 'Gevorderd',
    };
    return level ? labels[level] || level : 'Alle niveaus';
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course.id);
  };

  if (variant === 'list') {
    return (
      <Link href={`/courses/${course.slug}`}>
        <Card className="group hover:shadow-xl transition-all duration-300 border border-secondary-200 bg-white">
          <div className="flex gap-6 p-6">
            {/* Image */}
            <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg bg-secondary-100">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="primary" size="sm">
                      {course.category}
                    </Badge>
                    {getStatusBadges()}
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-secondary-600 mb-1">
                    door {course.instructor.name}
                  </p>
                </div>

                {/* Wishlist */}
                <button
                  onClick={handleWishlistClick}
                  className="flex-shrink-0 p-2 hover:bg-secondary-50 rounded-full transition-colors"
                  aria-label={isWishlisted ? 'Verwijder van favorieten' : 'Toevoegen aan favorieten'}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-secondary-400'
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm text-secondary-600 mb-3 line-clamp-2 leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-secondary-500 mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <span>•</span>
                <span>{getLevelLabel(course.level)}</span>
                {course.rating && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-secondary-900">{course.rating.toFixed(1)}</span>
                      {course.reviewCount && (
                        <span className="text-secondary-500">({course.reviewCount})</span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-4 text-xs text-secondary-500">
                {course.studentCount && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{course.studentCount} studenten</span>
                  </div>
                )}
                {course.hasCertificate && (
                  <div className="flex items-center gap-1.5 text-purple-700">
                    <Award className="w-4 h-4" />
                    <span>Certificaat</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{course.language}</span>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            {showPrice && (
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  {course.hasDiscount && course.discountPercentage && (
                    <div className="text-sm text-secondary-500 line-through mb-1">
                      {formatPrice(course.price / (1 - course.discountPercentage / 100))}
                    </div>
                  )}
                  <div className="text-xs text-secondary-500 mb-0.5">Vanaf</div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {formatPrice(course.price)}
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  {getNextDate() && (
                    <div className="text-xs text-secondary-600 text-right">
                      Start: {getNextDate()}
                    </div>
                  )}
                  <div className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg group-hover:bg-primary-700 transition-colors text-center">
                    Bekijk →
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-secondary-200 bg-white relative">
        {/* Wishlist Heart - Absolute positioned */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-20 p-2 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          aria-label={isWishlisted ? 'Verwijder van favorieten' : 'Toevoegen aan favorieten'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-secondary-600'
            }`}
          />
        </button>

        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden bg-secondary-100">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Category Badge - Top Left */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="primary" size="md">
              {course.category}
            </Badge>
          </div>

          {/* Next Date Badge - Top Right */}
          {getNextDate() && (
            <div className="absolute top-3 right-14 z-10">
              <Badge variant="default" size="sm" className="bg-white/95 backdrop-blur-sm shadow-lg">
                Start {getNextDate()}
              </Badge>
            </div>
          )}

          {/* Urgency Badge - Bottom Right on Image */}
          {getUrgencyBadge() && (
            <div className="absolute bottom-3 right-3 z-10">
              {getUrgencyBadge()}
            </div>
          )}

          {/* Status Badges - Bottom Left on Image */}
          <div className="absolute bottom-3 left-3 z-10 flex gap-2">
            {getStatusBadges()}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          {/* Metadata Pills */}
          <div className="flex items-center gap-2 text-xs text-secondary-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">{course.duration}</span>
            </div>
            <span>•</span>
            <span>{getLevelLabel(course.level)}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-secondary-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-secondary-600 mb-3">
            door {course.instructor.name}
          </p>

          {/* Description */}
          <p className="text-sm text-secondary-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Trust Signals Row */}
          <div className="flex items-center gap-3 text-xs mb-4 pb-4 border-b border-secondary-100 flex-wrap">
            {course.rating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-secondary-900">{course.rating.toFixed(1)}</span>
                {course.reviewCount && (
                  <span className="text-secondary-600">({course.reviewCount})</span>
                )}
              </div>
            )}

            {course.studentCount && (
              <div className="flex items-center gap-1.5 text-secondary-600">
                <Users className="w-3.5 h-3.5" />
                <span className="font-medium">{course.studentCount} studenten</span>
              </div>
            )}

            {course.hasCertificate && (
              <div className="flex items-center gap-1 bg-purple-50 px-2.5 py-1 rounded-lg">
                <Award className="w-3.5 h-3.5 text-purple-700" />
                <span className="text-purple-700 font-medium">Cert.</span>
              </div>
            )}
          </div>

          {/* Price & CTA */}
          {showPrice && (
            <div className="flex items-center justify-between">
              <div>
                {course.hasDiscount && course.discountPercentage && (
                  <div className="text-xs text-secondary-500 line-through mb-0.5">
                    {formatPrice(course.price / (1 - course.discountPercentage / 100))}
                  </div>
                )}
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
