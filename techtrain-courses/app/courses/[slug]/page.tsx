import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/lib/data';
import CourseHeader from '@/components/CourseHeader';
import CourseDetailContent from '@/components/CourseDetailContent';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader course={course} />
      <CourseDetailContent course={course} />
    </div>
  );
}
