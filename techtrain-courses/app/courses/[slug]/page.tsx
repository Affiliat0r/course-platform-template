import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getCourseSchedules } from '@/app/actions/schedules';
import CourseHeader from '@/components/CourseHeader';
import CourseDetailContent from '@/components/CourseDetailContent';

export default async function CourseDetailPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { schedule?: string }
}) {
  const supabase = await createClient();

  // Fetch course from Supabase
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!course) {
    notFound();
  }

  // Fetch course schedules
  const { schedules } = await getCourseSchedules(course.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader course={course} />
      <CourseDetailContent course={course} schedules={schedules} preselectedScheduleId={searchParams.schedule} />
    </div>
  );
}
