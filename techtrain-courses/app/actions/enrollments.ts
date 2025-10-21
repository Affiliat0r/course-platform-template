'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendEnrollmentConfirmation } from '@/lib/email'

export async function createEnrollment(courseId: string, scheduleId?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'U moet ingelogd zijn om in te schrijven voor een cursus' }
  }

  // Check if already enrolled
  const { data: existing } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle()

  if (existing) {
    return { error: 'U bent al ingeschreven voor deze cursus' }
  }

  // Create enrollment
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .insert({
      user_id: user.id,
      course_id: courseId,
      schedule_id: scheduleId || null,
      status: 'active',
      progress: 0,
    })
    .select(`
      *,
      course:courses(title, price),
      schedule:course_schedules(start_date, location)
    `)
    .single()

  if (error) {
    return { error: error.message }
  }

  // Send enrollment confirmation email
  if (enrollment) {
    // Get user profile for full name and email
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single()

    if (profile && enrollment.course && enrollment.schedule) {
      const startDate = new Date(enrollment.schedule.start_date).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })

      await sendEnrollmentConfirmation({
        to: profile.email || user.email || '',
        fullName: profile.full_name || 'Student',
        courseTitle: enrollment.course.title,
        startDate: startDate,
        location: enrollment.schedule.location,
        price: enrollment.course.price,
      })
    }
  }

  revalidatePath('/dashboard')
  return { data: enrollment, success: true, message: 'Succesvol ingeschreven voor de cursus!' }
}

export async function getUserEnrollments() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Niet ingelogd' }
  }

  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      course:courses(*),
      schedule:course_schedules(*)
    `
    )
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data: enrollments }
}

export async function updateEnrollmentProgress(enrollmentId: string, progress: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Niet ingelogd' }
  }

  const updates: any = {
    progress,
  }

  // If progress is 100%, mark as completed
  if (progress >= 100) {
    updates.status = 'completed'
    updates.completed_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('enrollments')
    .update(updates)
    .eq('id', enrollmentId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true, message: 'Voortgang bijgewerkt' }
}

export async function cancelEnrollment(enrollmentId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Niet ingelogd' }
  }

  const { error } = await supabase
    .from('enrollments')
    .update({
      status: 'cancelled',
    })
    .eq('id', enrollmentId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true, message: 'Inschrijving geannuleerd' }
}

export async function checkEnrollment(courseId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { isEnrolled: false }
  }

  const { data } = await supabase
    .from('enrollments')
    .select('id, status')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle()

  return {
    isEnrolled: !!data,
    status: data?.status,
  }
}
