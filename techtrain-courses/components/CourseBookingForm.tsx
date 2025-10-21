'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Check, AlertCircle } from 'lucide-react';
import { Course } from '@/types';
import { formatPrice, formatDate, formatDateWithDay, getWeekday } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useUser } from '@/contexts/UserContext';
import { createEnrollment, checkEnrollment } from '@/app/actions/enrollments';
import { translateEnrollmentError } from '@/lib/translate-error';

interface CourseBookingFormProps {
  course: Course;
}

export default function CourseBookingForm({ course }: CourseBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { user, loading } = useUser();
  const router = useRouter();

  // Check enrollment status when user loads
  useEffect(() => {
    if (user && course.id) {
      checkEnrollmentStatus();
    }
  }, [user, course.id]);

  const checkEnrollmentStatus = async () => {
    const result = await checkEnrollment(course.id);
    setIsEnrolled(result.isEnrolled);
    setEnrollmentStatus(result.status || null);
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await createEnrollment(course.id);

      if (result.error) {
        setError(translateEnrollmentError(result.error));
      } else {
        setSuccess('Je bent succesvol ingeschreven! Controleer je e-mail voor bevestiging.');
        setIsEnrolled(true);
        setEnrollmentStatus('active');

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard/enrollments');
        }, 2000);
      }
    });
  };

  return (
    <Card className="p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-4">Eerstvolgende Beschikbare Data</h3>

      {/* Calendar/Dates */}
      <div className="mb-6">
        <div className="text-sm font-medium text-secondary-700 mb-3">Selecteer een startdatum</div>
        <div className="space-y-3">
          {course.dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`w-full text-left px-4 py-4 rounded-lg border-2 transition-all duration-200 ${
                selectedDate?.getTime() === date.getTime()
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-secondary-200 hover:border-primary-400 hover:shadow-sm'
              }`}
              aria-label={`Selecteer datum ${formatDateWithDay(date)}`}
              aria-pressed={selectedDate?.getTime() === date.getTime()}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${
                  selectedDate?.getTime() === date.getTime()
                    ? 'text-primary-600'
                    : 'text-secondary-400'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                    selectedDate?.getTime() === date.getTime()
                      ? 'text-primary-700'
                      : 'text-secondary-500'
                  }`}>
                    {getWeekday(date)}
                  </div>
                  <div className={`text-base font-bold ${
                    selectedDate?.getTime() === date.getTime()
                      ? 'text-primary-900'
                      : 'text-secondary-900'
                  }`}>
                    {formatDate(date)}
                  </div>
                </div>
                {selectedDate?.getTime() === date.getTime() && (
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
        <div className="text-3xl font-bold text-primary-600">
          {formatPrice(course.price)}
        </div>
        <div className="text-sm text-secondary-600 mt-1">Per deelnemer</div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Enroll Button */}
      {isEnrolled ? (
        <Button size="lg" className="w-full mb-3" disabled>
          <Check className="w-4 h-4 mr-2" />
          Al Ingeschreven
        </Button>
      ) : selectedDate ? (
        <Button
          size="lg"
          className="w-full mb-3"
          onClick={handleEnroll}
          disabled={isPending || loading}
        >
          {isPending ? 'Inschrijven...' : 'Nu Inschrijven'}
        </Button>
      ) : (
        <Button size="lg" className="w-full mb-3" disabled>
          Selecteer een datum om in te schrijven
        </Button>
      )}

      <p className="text-xs text-secondary-600 text-center">
        {isEnrolled ? 'Je bent ingeschreven voor deze cursus' : 'Veilige betaling • Directe bevestiging'}
      </p>
    </Card>
  );
}
