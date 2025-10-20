/**
 * Database Types for Supabase
 *
 * These types match the database schema defined in supabase/schema.sql
 * To regenerate these types from your live database:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Login: supabase login
 * 3. Link project: supabase link --project-ref your-project-ref
 * 4. Generate: supabase gen types typescript --project-id your-project-ref > types/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          long_description: string | null
          price: number
          category: string
          level: string
          language: string
          duration_hours: number | null
          instructor_id: string | null
          thumbnail_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          long_description?: string | null
          price: number
          category: string
          level: string
          language?: string
          duration_hours?: number | null
          instructor_id?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          long_description?: string | null
          price?: number
          category?: string
          level?: string
          language?: string
          duration_hours?: number | null
          instructor_id?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      course_schedules: {
        Row: {
          id: string
          course_id: string
          start_date: string
          end_date: string | null
          location: string | null
          format: string
          available_seats: number | null
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          start_date: string
          end_date?: string | null
          location?: string | null
          format: string
          available_seats?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          start_date?: string
          end_date?: string | null
          location?: string | null
          format?: string
          available_seats?: number | null
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          schedule_id: string | null
          status: string
          progress: number
          enrolled_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          schedule_id?: string | null
          status?: string
          progress?: number
          enrolled_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          schedule_id?: string | null
          status?: string
          progress?: number
          enrolled_at?: string
          completed_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          enrollment_id: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          amount: number
          currency: string
          status: string
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          enrollment_id?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          amount: number
          currency?: string
          status?: string
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          enrollment_id?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          amount?: number
          currency?: string
          status?: string
          created_at?: string
          completed_at?: string | null
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          course_id: string
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          added_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          course_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
