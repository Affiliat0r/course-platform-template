/**
 * Course-related TypeScript types
 *
 * These types match the Prisma schema and are used throughout the application.
 */

export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string | null
  price: number
  currency: string
  thumbnailUrl?: string | null
  previewVideoUrl?: string | null
  status: CourseStatus
  featured: boolean
  enrollmentCount: number
  createdAt: Date
  updatedAt: Date
}

export interface CourseWithModules extends Course {
  modules: Module[]
}

export interface Module {
  id: string
  courseId: string
  title: string
  description?: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[]
}

export type LessonType = 'VIDEO' | 'TEXT' | 'QUIZ' | 'PROJECT'

export interface Lesson {
  id: string
  moduleId: string
  title: string
  slug: string
  content?: string | null
  videoUrl?: string | null
  duration?: number | null
  order: number
  isFree: boolean
  lessonType: LessonType
  createdAt: Date
  updatedAt: Date
}

export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED'

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: EnrollmentStatus
  progress: number
  enrolledAt: Date
  completedAt?: Date | null
  expiresAt?: Date | null
}

export interface Progress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED'

export interface Payment {
  id: string
  enrollmentId: string
  userId: string
  courseId: string
  stripeCheckoutSessionId?: string | null
  stripePaymentIntentId?: string | null
  stripeCustomerId?: string | null
  amount: number
  currency: string
  status: PaymentStatus
  createdAt: Date
  completedAt?: Date | null
}

export interface Review {
  id: string
  userId: string
  courseId: string
  rating: number
  comment?: string | null
  createdAt: Date
  updatedAt: Date
}
