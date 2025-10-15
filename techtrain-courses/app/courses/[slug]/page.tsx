import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, Globe, Star, User } from 'lucide-react';
import { getCourseBySlug, courses } from '@/lib/data';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CourseCard from '@/components/CourseCard';
import CourseBookingForm from '@/components/CourseBookingForm';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center"
        style={{
          backgroundImage: `url(${course.imageUrl})`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {course.title}
          </h1>
          <p className="text-xl text-white/90 mb-6">{course.shortDescription}</p>
          <Button size="lg">Ontdek Cursussen</Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Overview */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
              <p className="text-secondary-700 leading-relaxed mb-6">
                {course.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="text-xs text-secondary-600">Duur</div>
                    <div className="font-medium">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="text-xs text-secondary-600">Taal</div>
                    <div className="font-medium uppercase">{course.language}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="text-xs text-secondary-600">Format</div>
                    <div className="font-medium capitalize">{course.format}</div>
                  </div>
                </div>
                {course.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <div className="text-xs text-secondary-600">Beoordeling</div>
                      <div className="font-medium">{course.rating}/5</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Learning Objectives */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Leerdoelen</h2>
              <h3 className="font-semibold mb-3">Cursusdoelstellingen</h3>
              <ul className="space-y-2 mb-6">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-secondary-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Syllabus */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Lesprogramma</h2>
              <div className="space-y-4">
                {course.syllabus.map((module, index) => (
                  <div key={index} className="border-l-4 border-primary-600 pl-4">
                    <h3 className="font-semibold mb-2">{module.title}</h3>
                    <ul className="space-y-1">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="text-sm text-secondary-600">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* Prerequisites */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Vereisten</h2>
              <h3 className="font-semibold mb-3">Vereiste Kennis</h3>
              <ul className="space-y-2">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-secondary-700">{prereq}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Target Audience */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Doelgroep</h2>
              <ul className="space-y-2">
                {course.targetAudience.map((audience, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600" />
                    <span className="text-secondary-700">{audience}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Instructor Bio */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Docent Bio</h2>
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={course.instructor.imageUrl}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{course.instructor.name}</h3>
                  <p className="text-secondary-700 mt-2">{course.instructor.bio}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <CourseBookingForm course={course} />

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Gerelateerde Cursussen</h3>
                <div className="space-y-4">
                  {relatedCourses.map((relatedCourse) => (
                    <CourseCard key={relatedCourse.id} course={relatedCourse} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
