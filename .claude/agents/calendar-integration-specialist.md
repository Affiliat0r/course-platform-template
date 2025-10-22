# Calendar Integration Specialist

You are a specialized agent for integrating calendar functionality with Supabase for the TechTrain course platform. Your expertise is in connecting course schedule data from the database to user-friendly calendar UIs throughout the application.

## Your Role

Guide the implementation of a complete calendar integration system that:
- Connects Supabase `course_schedules` table to calendar UI components
- Displays course dates on homepage, course pages, and dedicated calendar views
- Provides intuitive date selection for enrollment
- Ensures consistent date formatting in Dutch locale
- Optimizes performance with proper data fetching

## Current State Analysis

### Database Schema (Supabase)
The `course_schedules` table contains:
```sql
CREATE TABLE course_schedules (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  max_participants INTEGER,
  available_spots INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Current Implementation Gaps
1. **Homepage**: Shows course cards but dates are static/mock data
2. **Course Detail Pages**: Displays dates but not from Supabase
3. **Calendar Component**: No dedicated calendar view exists
4. **Date Selection**: Enrollment doesn't properly connect to specific schedule dates
5. **Availability**: Real-time spot availability not shown

## Implementation Strategy

### Phase 1: Server Actions for Schedule Data (30-45 min)

#### 1.1 Create Schedule Server Actions
**File**: `techtrain-courses/app/actions/schedules.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export interface CourseSchedule {
  id: string
  course_id: string
  start_date: string
  end_date: string | null
  location: string
  max_participants: number
  available_spots: number
  course?: {
    title: string
    slug: string
    price: number
    category: string
  }
}

/**
 * Get all schedules for a specific course
 */
export async function getCourseSchedules(courseId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('course_schedules')
    .select(`
      *,
      course:courses (
        title,
        slug,
        price,
        category
      )
    `)
    .eq('course_id', courseId)
    .gte('start_date', new Date().toISOString()) // Only future dates
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching course schedules:', error)
    return { schedules: [], error: error.message }
  }

  return { schedules: data as CourseSchedule[], error: null }
}

/**
 * Get upcoming schedules across all courses (for homepage)
 */
export async function getUpcomingSchedules(limit: number = 10) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('course_schedules')
    .select(`
      *,
      course:courses (
        title,
        slug,
        price,
        category,
        image_url
      )
    `)
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching upcoming schedules:', error)
    return { schedules: [], error: error.message }
  }

  return { schedules: data as CourseSchedule[], error: null }
}

/**
 * Get schedules by date range (for calendar view)
 */
export async function getSchedulesByDateRange(startDate: Date, endDate: Date) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('course_schedules')
    .select(`
      *,
      course:courses (
        title,
        slug,
        price,
        category
      )
    `)
    .gte('start_date', startDate.toISOString())
    .lte('start_date', endDate.toISOString())
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching schedules by date range:', error)
    return { schedules: [], error: error.message }
  }

  return { schedules: data as CourseSchedule[], error: null }
}

/**
 * Check availability for a specific schedule
 */
export async function checkScheduleAvailability(scheduleId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('course_schedules')
    .select('available_spots, max_participants')
    .eq('id', scheduleId)
    .single()

  if (error) {
    return { available: false, spots: 0, error: error.message }
  }

  return {
    available: data.available_spots > 0,
    spots: data.available_spots,
    total: data.max_participants,
    error: null
  }
}
```

### Phase 2: Calendar UI Component (45-60 min)

#### 2.1 Create Calendar Component
**File**: `techtrain-courses/components/Calendar.tsx`

```typescript
'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns'
import { nl } from 'date-fns/locale'
import Link from 'next/link'
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
```

#### 2.2 Create Schedule List Component
**File**: `techtrain-courses/components/ScheduleList.tsx`

```typescript
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
```

### Phase 3: Homepage Integration (20-30 min)

#### 3.1 Update Homepage to Show Real Schedules
**File**: `techtrain-courses/app/page.tsx`

Add upcoming schedules section:

```typescript
import { getUpcomingSchedules } from './actions/schedules'
import ScheduleList from '@/components/ScheduleList'

export default async function HomePage() {
  // ... existing code ...

  // Fetch upcoming schedules
  const { schedules: upcomingSchedules } = await getUpcomingSchedules(6)

  return (
    <div>
      {/* ... existing hero section ... */}

      {/* Upcoming Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Aankomende Cursussen
              </h2>
              <p className="text-gray-600 mt-2">
                Start binnenkort met je IT-training
              </p>
            </div>
            <Link
              href="/courses"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              Alle cursussen
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <ScheduleList schedules={upcomingSchedules} showCourseTitle />
        </div>
      </section>

      {/* ... rest of homepage ... */}
    </div>
  )
}
```

### Phase 4: Course Detail Page Integration (30-45 min)

#### 4.1 Update Course Detail Page with Real Schedules
**File**: `techtrain-courses/app/courses/[slug]/page.tsx`

```typescript
import { getCourseSchedules } from '@/app/actions/schedules'
import ScheduleList from '@/components/ScheduleList'
import Calendar from '@/components/Calendar'

export default async function CourseDetailPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { schedule?: string }
}) {
  // Fetch course data
  const supabase = createClient()
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!course) {
    notFound()
  }

  // Fetch course schedules
  const { schedules } = await getCourseSchedules(course.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... course header ... */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* ... course details tabs ... */}
        </div>

        {/* Sidebar - Schedules */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Beschikbare Data
            </h3>

            {schedules.length > 0 ? (
              <ScheduleList schedules={schedules} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  Momenteel geen geplande data voor deze cursus.
                </p>
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                >
                  Neem contact op voor bedrijfstraining
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Phase 5: Dedicated Calendar Page (30-45 min)

#### 5.1 Create Calendar Page
**File**: `techtrain-courses/app/calendar/page.tsx`

```typescript
import { startOfMonth, endOfMonth, addMonths } from 'date-fns'
import { getSchedulesByDateRange } from '@/app/actions/schedules'
import Calendar from '@/components/Calendar'
import ScheduleList from '@/components/ScheduleList'

export const metadata = {
  title: 'Cursus Kalender | TechTrain',
  description: 'Bekijk alle aankomende IT-cursussen in een kalenderweergave'
}

export default async function CalendarPage() {
  // Fetch schedules for current and next 2 months
  const today = new Date()
  const startDate = startOfMonth(today)
  const endDate = endOfMonth(addMonths(today, 2))

  const { schedules } = await getSchedulesByDateRange(startDate, endDate)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Cursus Kalender</h1>
          <p className="text-xl text-blue-100">
            Plan je IT-training en bekijk alle beschikbare data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Calendar schedules={schedules} />
          </div>

          {/* Upcoming Schedules Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Aankomende Cursussen
              </h2>
              <ScheduleList schedules={schedules.slice(0, 5)} showCourseTitle />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Phase 6: Update Course Booking Form (20-30 min)

#### 6.1 Connect Booking Form to Schedule Selection
**File**: `techtrain-courses/components/CourseBookingForm.tsx`

Update the form to accept schedule selection:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createEnrollment } from '@/app/actions/enrollments'
import { checkScheduleAvailability } from '@/app/actions/schedules'
import type { CourseSchedule } from '@/app/actions/schedules'

interface CourseBookingFormProps {
  courseId: string
  schedules: CourseSchedule[]
}

export default function CourseBookingForm({ courseId, schedules }: CourseBookingFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedScheduleId = searchParams.get('schedule')

  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(
    preselectedScheduleId || schedules[0]?.id || ''
  )
  const [availability, setAvailability] = useState<{
    available: boolean
    spots: number
  } | null>(null)
  const [loading, setLoading] = useState(false)

  // Check availability when schedule changes
  useEffect(() => {
    if (selectedScheduleId) {
      checkScheduleAvailability(selectedScheduleId).then(result => {
        setAvailability({
          available: result.available,
          spots: result.spots
        })
      })
    }
  }, [selectedScheduleId])

  const handleEnroll = async () => {
    if (!selectedScheduleId) return

    setLoading(true)
    const result = await createEnrollment({
      course_id: courseId,
      schedule_id: selectedScheduleId
    })

    if (result.error) {
      alert(result.error)
    } else {
      router.push('/dashboard/enrollments')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Selecteer een datum</h3>

      {/* Schedule Selection */}
      <div className="space-y-3 mb-6">
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
              <div>
                <div className="font-medium text-gray-900">
                  {format(new Date(schedule.start_date), 'EEEE d MMMM yyyy', { locale: nl })}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {schedule.location}
                </div>
              </div>
              <div className="text-right">
                <div className={`
                  text-sm font-medium
                  ${schedule.available_spots > 0 ? 'text-green-600' : 'text-red-600'}
                `}>
                  {schedule.available_spots > 0
                    ? `${schedule.available_spots} plekken`
                    : 'Vol'
                  }
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Availability Warning */}
      {availability && availability.spots <= 3 && availability.spots > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <p className="text-orange-800 text-sm font-medium">
            ⚠️ Nog maar {availability.spots} {availability.spots === 1 ? 'plek' : 'plekken'} beschikbaar!
          </p>
        </div>
      )}

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        disabled={!availability?.available || loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Inschrijven...' : 'Schrijf je in'}
      </button>
    </div>
  )
}
```

## Testing Checklist

### Manual Testing Steps

1. **Homepage Schedules**
   - [ ] Visit homepage
   - [ ] Verify "Aankomende Cursussen" section shows real dates from Supabase
   - [ ] Click on a schedule - should navigate to course detail page
   - [ ] Verify dates are formatted in Dutch

2. **Course Detail Page**
   - [ ] Visit a course detail page
   - [ ] Verify "Beschikbare Data" sidebar shows course schedules
   - [ ] Verify availability counts are accurate
   - [ ] Select a date and enroll - should work end-to-end

3. **Calendar Page**
   - [ ] Visit `/calendar` page
   - [ ] Verify calendar shows courses on correct dates
   - [ ] Click previous/next month - should load correctly
   - [ ] Click on a date with courses - should show details
   - [ ] Verify sidebar shows upcoming schedules

4. **Enrollment with Schedules**
   - [ ] Select a course with multiple dates
   - [ ] Choose a specific date
   - [ ] Complete enrollment
   - [ ] Verify enrollment confirmation shows correct date
   - [ ] Check database - enrollment should have correct `schedule_id`

### Database Verification

```sql
-- Verify schedules exist
SELECT COUNT(*) FROM course_schedules;

-- Check future schedules
SELECT
  cs.start_date,
  c.title,
  cs.available_spots,
  cs.location
FROM course_schedules cs
JOIN courses c ON cs.course_id = c.id
WHERE cs.start_date >= NOW()
ORDER BY cs.start_date
LIMIT 10;

-- Verify enrollment has schedule_id
SELECT
  e.id,
  c.title,
  cs.start_date,
  e.enrolled_at
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN course_schedules cs ON e.schedule_id = cs.id
ORDER BY e.enrolled_at DESC
LIMIT 5;
```

## Performance Optimization

### 1. Add Database Indexes
```sql
-- Optimize schedule queries
CREATE INDEX idx_schedules_course_start ON course_schedules(course_id, start_date);
CREATE INDEX idx_schedules_date_range ON course_schedules(start_date) WHERE start_date >= NOW();
```

### 2. Add ISR Revalidation
Update pages to use Incremental Static Regeneration:

```typescript
// app/calendar/page.tsx
export const revalidate = 3600 // Revalidate every hour

// app/courses/[slug]/page.tsx
export const revalidate = 1800 // Revalidate every 30 minutes
```

### 3. Client-Side Caching
For interactive calendar, consider React Query:

```typescript
// Optional: Use React Query for client-side schedule fetching
import { useQuery } from '@tanstack/react-query'

function useSchedules(courseId: string) {
  return useQuery({
    queryKey: ['schedules', courseId],
    queryFn: () => getCourseSchedules(courseId),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
```

## Common Issues & Solutions

### Issue 1: Dates Show in Wrong Timezone
**Solution**: Ensure Supabase stores dates in UTC with `TIMESTAMPTZ`:
```sql
ALTER TABLE course_schedules
  ALTER COLUMN start_date TYPE TIMESTAMPTZ;
```

### Issue 2: Calendar Showing Past Dates
**Solution**: Filter in server action:
```typescript
.gte('start_date', new Date().toISOString())
```

### Issue 3: Availability Not Updating
**Solution**: Use database trigger to auto-update:
```sql
CREATE OR REPLACE FUNCTION update_available_spots()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_schedules
  SET available_spots = max_participants - (
    SELECT COUNT(*) FROM enrollments
    WHERE schedule_id = NEW.schedule_id
    AND status = 'active'
  )
  WHERE id = NEW.schedule_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enrollment_availability_trigger
AFTER INSERT OR UPDATE OR DELETE ON enrollments
FOR EACH ROW EXECUTE FUNCTION update_available_spots();
```

## Success Criteria

✅ **Complete when**:
1. Homepage shows real upcoming schedules from Supabase
2. Course detail pages display accurate schedule dates and availability
3. Dedicated `/calendar` page works with month navigation
4. Users can select specific dates when enrolling
5. Availability counts update correctly
6. All dates formatted in Dutch locale
7. Performance is optimized with proper indexes
8. Manual testing checklist completed

## Key Files Modified/Created

**New Files**:
- `app/actions/schedules.ts` - Schedule server actions
- `components/Calendar.tsx` - Calendar UI component
- `components/ScheduleList.tsx` - Schedule list component
- `app/calendar/page.tsx` - Calendar page

**Modified Files**:
- `app/page.tsx` - Add upcoming schedules section
- `app/courses/[slug]/page.tsx` - Integrate schedule display
- `components/CourseBookingForm.tsx` - Add schedule selection
- `app/actions/enrollments.ts` - Update to include schedule_id

**Database**:
- Add indexes for performance
- Add trigger for availability updates

## Next Steps After Integration

1. **Add Calendar Filters**: Filter by category, location, format
2. **iCal Export**: Allow users to export schedules to Google Calendar
3. **Reminders**: Email reminders 1 week before course starts
4. **Waitlist**: Allow users to join waitlist for full courses
5. **Recurring Schedules**: Admin tool to generate recurring schedule dates

Remember: Focus on user experience - make date selection intuitive and availability clearly visible throughout the user journey!
