import Link from 'next/link'
import Image from 'next/image'
import { Course } from '@/types/course'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <article className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {course.thumbnailUrl && (
        <Link href={`/courses/${course.slug}`} className="block relative h-48 overflow-hidden">
          <Image
            src={course.thumbnailUrl}
            alt={`${course.title} course thumbnail`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      <div className="p-4 space-y-3">
        <Link href={`/courses/${course.slug}`}>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-2xl font-bold">{formatPrice(course.price, course.currency)}</p>

          {onEnroll ? (
            <Button
              onClick={() => onEnroll(course.id)}
              size="sm"
              aria-label={`Enroll in ${course.title}`}
            >
              Enroll Now
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={`/courses/${course.slug}`}>View Course</Link>
            </Button>
          )}
        </div>

        {course.enrollmentCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {course.enrollmentCount.toLocaleString()} student{course.enrollmentCount !== 1 ? 's' : ''}{' '}
            enrolled
          </p>
        )}
      </div>
    </article>
  )
}
