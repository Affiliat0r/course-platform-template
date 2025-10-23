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
    image_url?: string
  }
}

/**
 * Get all schedules for a specific course
 */
export async function getCourseSchedules(courseId: string) {
  const supabase = await createClient()

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
  const supabase = await createClient()

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
  const supabase = await createClient()

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
  const supabase = await createClient()

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
