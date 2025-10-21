'use client';

import { useUser } from '@/contexts/UserContext';
import { getUserEnrollments, cancelEnrollment } from '@/app/actions/enrollments';
import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Calendar, MapPin, X, BookOpen, AlertCircle } from 'lucide-react';

interface Enrollment {
  id: string;
  status: string;
  enrolled_at: string;
  course: {
    id: string;
    title: string;
    slug: string;
    category: string;
  };
  schedule?: {
    start_date: string;
    end_date: string;
    location: string;
  };
}

export default function EnrollmentsPage() {
  const { user } = useUser();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadEnrollments();
    }
  }, [user]);

  const loadEnrollments = async () => {
    setLoading(true);
    const result = await getUserEnrollments();
    if (result.data) {
      setEnrollments(result.data as Enrollment[]);
    }
    setLoading(false);
  };

  const handleCancel = async (enrollmentId: string, courseTitle: string) => {
    if (!confirm(`Weet je zeker dat je de inschrijving voor "${courseTitle}" wilt annuleren?`)) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await cancelEnrollment(enrollmentId);
      if (result.error) {
        setError(result.error);
      } else {
        // Refresh enrollments list
        await loadEnrollments();
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-secondary-600">Cursussen laden...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Mijn Cursussen</h2>
        <Link href="/courses">
          <Button variant="outline">Bekijk Cursusaanbod</Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {enrollments.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Nog geen cursussen
            </h3>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Je bent nog niet ingeschreven voor cursussen. Ontdek ons cursusaanbod en begin vandaag
              nog met leren!
            </p>
            <Link href="/courses">
              <Button>Bekijk Cursusaanbod</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <Card key={enrollment.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        <Link
                          href={`/courses/${enrollment.course.slug}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {enrollment.course.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-secondary-600">{enrollment.course.category}</p>
                    </div>
                  </div>

                  {enrollment.schedule && (
                    <div className="space-y-2 text-sm text-secondary-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Start:{' '}
                          {new Date(enrollment.schedule.start_date).toLocaleDateString('nl-NL', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      {enrollment.schedule.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{enrollment.schedule.location}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        enrollment.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : enrollment.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {enrollment.status === 'active'
                        ? 'Actief'
                        : enrollment.status === 'completed'
                        ? 'Voltooid'
                        : 'Geannuleerd'}
                    </span>

                    <span className="text-xs text-secondary-500">
                      Ingeschreven op:{' '}
                      {new Date(enrollment.enrolled_at).toLocaleDateString('nl-NL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {enrollment.status === 'active' && (
                  <div className="ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(enrollment.id, enrollment.course.title)}
                      disabled={isPending}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Annuleren
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
