/**
 * Migration Script: Mock Data to Supabase
 *
 * This script migrates the existing mock course data to Supabase database.
 *
 * Usage:
 * 1. Ensure you have set up your Supabase project and environment variables
 * 2. Run the database schema in Supabase SQL Editor (supabase/schema.sql)
 * 3. For development: npx tsx scripts/migrate-to-supabase.ts
 * 4. For production: NODE_ENV=production npx tsx scripts/migrate-to-supabase.ts
 *
 * Requirements:
 * - npm install tsx --save-dev (if not already installed)
 * - SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { courses } from '../lib/data'
import { config } from 'dotenv'
import { resolve } from 'path'
import * as readline from 'readline'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

// Detect environment
const isProduction = process.env.NODE_ENV === 'production'
const isDryRun = process.env.DRY_RUN === 'true'

// Use service role key for migration (has admin privileges)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side only, bypasses RLS
)

interface MigrationStats {
  coursesCreated: number
  schedulesCreated: number
  errors: string[]
}

/**
 * Prompt user for confirmation in production mode
 */
async function confirmProduction(): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question('Type "CONFIRM" to proceed: ', (answer: string) => {
      rl.close()
      resolve(answer === 'CONFIRM')
    })
  })
}

/**
 * Verify database connection and show current state
 */
async function verifyDatabase() {
  console.log('\n🔍 Verifying database connection...')

  try {
    const { data: existingCourses, error } = await supabase
      .from('courses')
      .select('id, title')
      .limit(5)

    if (error) {
      throw new Error(`Database connection failed: ${error.message}`)
    }

    console.log(`✅ Connected to: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    console.log(`📊 Current courses in database: ${existingCourses?.length || 0}`)

    if (existingCourses && existingCourses.length > 0) {
      console.log('\n⚠️  WARNING: Database already contains courses!')
      console.log('   This migration will add new courses (may create duplicates)')
    }

    return true
  } catch (error) {
    console.error('❌ Database verification failed:', error)
    return false
  }
}

async function migrateCourses() {
  const stats: MigrationStats = {
    coursesCreated: 0,
    schedulesCreated: 0,
    errors: []
  }

  console.log('\n' + '='.repeat(60))
  console.log('🚀 SUPABASE MIGRATION TOOL')
  console.log('='.repeat(60))
  console.log(`Environment: ${isProduction ? '🔴 PRODUCTION' : '🟢 DEVELOPMENT'}`)
  console.log(`Mode: ${isDryRun ? '👁️  DRY RUN (no changes)' : '✍️  LIVE (will write data)'}`)
  console.log(`Courses to migrate: ${courses.length}`)
  console.log('='.repeat(60))

  // Production safety checks
  if (isProduction) {
    console.log('\n⚠️  WARNING: Running in PRODUCTION mode')
    console.log('This will migrate data to your production database.')
    console.log('Make sure you have:')
    console.log('  1. ✅ Backed up your production database')
    console.log('  2. ✅ Tested migration on a test/staging environment')
    console.log('  3. ✅ Verified your production credentials are correct')
    console.log('')

    const confirmed = await confirmProduction()
    if (!confirmed) {
      console.log('\n❌ Migration cancelled by user.')
      return
    }
  }

  // Verify database connection
  const dbOk = await verifyDatabase()
  if (!dbOk) {
    console.log('\n❌ Migration aborted: Database verification failed')
    return
  }

  if (isDryRun) {
    console.log('\n👁️  DRY RUN MODE: No data will be written to database')
  }

  console.log('\n🚀 Starting migration...')
  console.log(`📚 Found ${courses.length} courses to migrate\n`)

  for (const course of courses) {
    try {
      console.log(`Migrating: ${course.title}...`)

      if (isDryRun) {
        console.log(`  👁️  Would create course: ${course.title}`)
        console.log(`  👁️  Would create ${course.dates?.length || 0} schedules`)
        stats.coursesCreated++
        stats.schedulesCreated += course.dates?.length || 0
        continue
      }

      // 1. Insert course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .insert({
          slug: course.slug,
          title: course.title,
          description: course.shortDescription,
          long_description: course.description,
          price: course.price,
          category: mapCategory(course.category),
          level: course.level,
          language: course.language,
          duration_hours: parseDuration(course.duration),
          thumbnail_url: course.imageUrl,
          is_published: true,
        })
        .select()
        .single()

      if (courseError) {
        stats.errors.push(`Error inserting course "${course.title}": ${courseError.message}`)
        console.error(`  ❌ Failed: ${courseError.message}`)
        continue
      }

      stats.coursesCreated++
      console.log(`  ✅ Course created (ID: ${courseData.id})`)

      // 2. Insert schedules based on course dates
      if (course.dates && course.dates.length > 0) {
        for (const date of course.dates) {
          const { error: scheduleError } = await supabase
            .from('course_schedules')
            .insert({
              course_id: courseData.id,
              start_date: date.toISOString().split('T')[0],
              end_date: calculateEndDate(date, course.duration),
              location: course.format === 'virtual' ? 'online' : 'utrecht',
              format: course.format === 'virtual' ? 'online-live' : 'klaslokaal',
              available_seats: 12, // Default capacity
            })

          if (scheduleError) {
            stats.errors.push(`Error inserting schedule for "${course.title}": ${scheduleError.message}`)
          } else {
            stats.schedulesCreated++
          }
        }
        console.log(`  ✅ ${course.dates.length} schedules created`)
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      stats.errors.push(`Unexpected error for "${course.title}": ${errorMessage}`)
      console.error(`  ❌ Unexpected error: ${errorMessage}`)
    }
  }

  // Print migration summary
  console.log('\n' + '='.repeat(50))
  console.log('📊 Migration Summary')
  console.log('='.repeat(50))
  console.log(`✅ Courses created: ${stats.coursesCreated}`)
  console.log(`✅ Schedules created: ${stats.schedulesCreated}`)
  console.log(`❌ Errors: ${stats.errors.length}`)

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Error Details:')
    stats.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`)
    })
  }

  console.log('\n✨ Migration completed!')
}

// Helper functions

function mapCategory(category: string): string {
  // Map Dutch categories to database categories
  const categoryMap: Record<string, string> = {
    'Programmeren & Development': 'frontend',
    'Data & Data Science': 'data',
    'AI & Machine Learning': 'ai-ml',
    'Cloud Computing': 'cloud',
    'DevOps & Containers': 'devops',
    'Databases': 'backend',
    'Beveiliging': 'security',
    'APIs & Scripting': 'backend'
  }
  return categoryMap[category] || 'backend'
}

function parseDuration(duration: string): number {
  // Parse duration strings like "1 dag", "2 dagen", etc.
  const match = duration.match(/(\d+)/)
  if (match) {
    const days = parseInt(match[1])
    return days * 8 // Assume 8 hours per day
  }
  return 8 // Default to 1 day
}

function calculateEndDate(startDate: Date, duration: string): string {
  const days = parseInt(duration.match(/(\d+)/)?.[1] || '1')
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + days - 1) // -1 because start date is day 1
  return endDate.toISOString().split('T')[0]
}

// Run migration
migrateCourses()
  .then(() => {
    console.log('\n👋 Exiting...')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
