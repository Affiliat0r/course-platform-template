'use client'

import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { CourseSchedule } from '@/app/actions/schedules'

interface ScheduleListProps {
  schedules: CourseSchedule[]
  showCourseTitle?: boolean
}

export default function ScheduleList({ schedules, showCourseTitle = false }: ScheduleListProps) {
  if (schedules.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Geen geplande cursussen gevonden</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {schedules.map(schedule => {
        const startDate = new Date(schedule.start_date)
        const spotsLeft = schedule.available_spots
        const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
        const isFull = spotsLeft === 0

        return (
          <div
            key={schedule.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {showCourseTitle && schedule.course && (
                  <Link
                    href={`/courses/${schedule.course.slug}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-2 block"
                  >
                    {schedule.course.title}
                  </Link>
                )}

                <div className="space-y-2">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">
                      {format(startDate, 'EEEE d MMMM yyyy', { locale: nl })}
                    </span>
                    {schedule.end_date && (
                      <span className="text-gray-500">
                        - {format(new Date(schedule.end_date), 'd MMMM yyyy', { locale: nl })}
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  {schedule.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{schedule.location}</span>
                    </div>
                  )}

                  {/* Availability */}
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    {isFull ? (
                      <span className="text-red-600 font-medium">VOL</span>
                    ) : isAlmostFull ? (
                      <span className="text-orange-600 font-medium">
                        Nog {spotsLeft} {spotsLeft === 1 ? 'plek' : 'plekken'} beschikbaar
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">
                        {spotsLeft} {spotsLeft === 1 ? 'plek' : 'plekken'} beschikbaar
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col items-end gap-2">
                {schedule.course && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      €{schedule.course.price}
                    </div>
                    <div className="text-sm text-gray-500">excl. BTW</div>
                  </div>
                )}

                <Link
                  href={`/courses/${schedule.course?.slug}?schedule=${schedule.id}`}
                  className={`
                    px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2
                    ${isFull
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    }
                  `}
                  aria-disabled={isFull}
                >
                  {isFull ? 'Vol' : 'Inschrijven'}
                  {!isFull && <ChevronRight className="w-4 h-4" />}
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
