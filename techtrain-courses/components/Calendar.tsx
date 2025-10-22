'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns'
import { nl } from 'date-fns/locale'
import type { CourseSchedule } from '@/app/actions/schedules'

interface CalendarProps {
  schedules: CourseSchedule[]
  onDateSelect?: (date: Date) => void
  selectedDate?: Date | null
}

export default function Calendar({ schedules, onDateSelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get days in current month
  const days = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  // Create a map of dates with schedules
  const schedulesMap = useMemo(() => {
    const map = new Map<string, CourseSchedule[]>()
    schedules.forEach(schedule => {
      const dateKey = format(new Date(schedule.start_date), 'yyyy-MM-dd')
      if (!map.has(dateKey)) {
        map.set(dateKey, [])
      }
      map.get(dateKey)!.push(schedule)
    })
    return map
  }, [schedules])

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const getDaySchedules = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd')
    return schedulesMap.get(dateKey) || []
  }

  const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {format(currentMonth, 'MMMM yyyy', { locale: nl })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Vorige maand"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Volgende maand"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const daySchedules = getDaySchedules(day)
          const hasSchedules = daySchedules.length > 0
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isTodayDate = isToday(day)

          return (
            <div
              key={index}
              className={`
                min-h-[80px] p-2 border border-gray-100 rounded-lg
                ${!isSameMonth(day, currentMonth) ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${hasSchedules ? 'cursor-pointer hover:bg-blue-50 transition-colors' : ''}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                ${isTodayDate ? 'bg-blue-50' : ''}
              `}
              onClick={() => hasSchedules && onDateSelect?.(day)}
            >
              <div className={`
                text-sm font-medium mb-1
                ${isTodayDate ? 'text-blue-600 font-bold' : ''}
              `}>
                {format(day, 'd')}
              </div>

              {hasSchedules && (
                <div className="space-y-1">
                  {daySchedules.slice(0, 2).map(schedule => (
                    <div
                      key={schedule.id}
                      className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate"
                      title={schedule.course?.title}
                    >
                      {schedule.course?.title.substring(0, 15)}...
                    </div>
                  ))}
                  {daySchedules.length > 2 && (
                    <div className="text-xs text-gray-500 font-medium">
                      +{daySchedules.length - 2} meer
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
          <span>Vandaag</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Cursus beschikbaar</span>
        </div>
      </div>
    </div>
  )
}
