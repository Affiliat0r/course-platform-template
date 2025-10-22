'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Calendar, Check, AlertCircle, MapPin, Users } from 'lucide-react';
import { Course } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useUser } from '@/contexts/UserContext';
import { createEnrollment, checkEnrollment } from '@/app/actions/enrollments';
import { checkScheduleAvailability } from '@/app/actions/schedules';
import { translateEnrollmentError } from '@/lib/translate-error';
import type { CourseSchedule } from '@/app/actions/schedules';

interface CourseBookingFormProps {
  course: Course;
  schedules: CourseSchedule[];
}

export default function CourseBookingForm({ course, schedules }: CourseBookingFormProps) {
  const searchParams = useSearchParams();
  const preselectedScheduleId = searchParams.get('schedule');

  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(
    preselectedScheduleId || schedules[0]?.id || ''
  );
  const [availability, setAvailability] = useState<{
    available: boolean
    spots: number
  } | null>(null);
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

  // Check availability when schedule changes
  useEffect(() => {
    if (selectedScheduleId) {
      checkScheduleAvailability(selectedScheduleId).then(result => {
        setAvailability({
          available: result.available,
          spots: result.spots
        });
      });
    }
  }, [selectedScheduleId]);

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

    if (!selectedScheduleId) return;

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await createEnrollment(course.id, selectedScheduleId);

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

  if (schedules.length === 0) {
    return (
      <Card className="p-6 sticky top-20">
        <h3 className="text-xl font-bold mb-4">Geen beschikbare data</h3>
        <p className="text-gray-600 mb-4">
          Momenteel geen geplande data voor deze cursus.
        </p>
        <Button size="lg" className="w-full" onClick={() => router.push('/contact')}>
          Neem Contact Op
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-4">Selecteer een datum</h3>

      {/* Schedule Selection */}
      <div className="mb-6">
        <div className="space-y-3">
          {schedules.map(schedule => (
            <label
              key={schedule.id}
              className={`
                block p-4 border-2 rounded-lg cursor-pointer transition-all
                ${selectedScheduleId === schedule.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <input
                type="radio"
                name="schedule"
                value={schedule.id}
                checked={selectedScheduleId === schedule.id}
                onChange={(e) => setSelectedScheduleId(e.target.value)}
                className="sr-only"
              />
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div className="font-medium text-gray-900">
                      {format(new Date(schedule.start_date), 'EEEE d MMMM yyyy', { locale: nl })}
                    </div>
                  </div>
                  {schedule.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{schedule.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className={`font-medium ${
                      schedule.available_spots > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {schedule.available_spots > 0
                        ? `${schedule.available_spots} plekken`
                        : 'Vol'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </label>
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

      {/* Availability Warning */}
      {availability && availability.spots <= 3 && availability.spots > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <p className="text-orange-800 text-sm font-medium">
            ⚠️ Nog maar {availability.spots} {availability.spots === 1 ? 'plek' : 'plekken'} beschikbaar!
          </p>
        </div>
      )}

      {/* Enroll Button */}
      {isEnrolled ? (
        <Button size="lg" className="w-full mb-3" disabled>
          <Check className="w-4 h-4 mr-2" />
          Al Ingeschreven
        </Button>
      ) : !availability?.available ? (
        <Button size="lg" className="w-full mb-3" disabled>
          Vol - Geen Plekken Beschikbaar
        </Button>
      ) : (
        <Button
          size="lg"
          className="w-full mb-3"
          onClick={handleEnroll}
          disabled={isPending || loading || !selectedScheduleId}
        >
          {isPending ? 'Inschrijven...' : 'Schrijf je in'}
        </Button>
      )}

      <p className="text-xs text-secondary-600 text-center">
        {isEnrolled ? 'Je bent ingeschreven voor deze cursus' : 'Veilige betaling • Directe bevestiging'}
      </p>
    </Card>
  );
}
