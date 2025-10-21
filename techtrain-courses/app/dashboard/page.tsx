'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { getUserEnrollments } from '@/app/actions/enrollments';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BookOpen, Award, Calendar, ArrowRight } from 'lucide-react';

interface Enrollment {
  id: string;
  status: string;
  enrolled_at: string;
  course: {
    id: string;
    title: string;
    slug: string;
  };
  schedule?: {
    start_date: string;
    location: string;
  };
}

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadEnrollments();
    }
  }, [user]);

  const loadEnrollments = async () => {
    setDataLoading(true);
    const result = await getUserEnrollments();
    if (result.data) {
      setEnrollments(result.data as Enrollment[]);
    }
    setDataLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary-600">Bezig met laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const activeEnrollments = enrollments.filter((e) => e.status === 'active');
  const completedEnrollments = enrollments.filter((e) => e.status === 'completed');

  // Get upcoming courses (next 30 days)
  const upcomingCourses = activeEnrollments.filter((e) => {
    if (!e.schedule?.start_date) return false;
    const startDate = new Date(e.schedule.start_date);
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    return startDate >= now && startDate <= thirtyDaysFromNow;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welkom terug, {user.user_metadata?.full_name || user.email}!
      </h2>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">Actieve Cursussen</p>
              <p className="text-3xl font-bold text-primary-600">{activeEnrollments.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">Voltooide Cursussen</p>
              <p className="text-3xl font-bold text-green-600">{completedEnrollments.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">Aankomende Cursussen</p>
              <p className="text-3xl font-bold text-blue-600">{upcomingCourses.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Courses */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Aankomende Cursussen</h3>
          <Link href="/dashboard/enrollments">
            <Button variant="outline" size="sm">
              Bekijk Alles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {dataLoading ? (
          <div className="text-center py-8 text-secondary-600">
            <p>Laden...</p>
          </div>
        ) : upcomingCourses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-secondary-400 mx-auto mb-3" />
            <p className="text-secondary-600 mb-4">Je hebt geen aankomende cursussen.</p>
            <Link href="/courses">
              <Button>Bekijk Cursussen</Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {upcomingCourses.slice(0, 3).map((enrollment) => (
              <li
                key={enrollment.id}
                className="border-b border-secondary-200 pb-4 last:border-b-0 last:pb-0"
              >
                <Link
                  href={`/courses/${enrollment.course.slug}`}
                  className="block hover:bg-secondary-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-secondary-900 mb-1">
                        {enrollment.course.title}
                      </p>
                      {enrollment.schedule && (
                        <div className="text-sm text-secondary-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(enrollment.schedule.start_date).toLocaleDateString(
                                'nl-NL',
                                {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Actief
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
