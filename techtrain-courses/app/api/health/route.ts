/**
 * Health Check API Route
 *
 * Provides a health check endpoint for monitoring system status.
 * Checks database connectivity and detects suspicious activity.
 */

import { createClient } from '@/lib/supabase/server'
import { logSecurityEvent } from '@/lib/logger'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Check database connection by querying a simple table
    const { data, error } = await supabase
      .from('courses')
      .select('id')
      .limit(1)

    if (error) {
      logSecurityEvent('CRITICAL: Database connection failed', { error: error.message })
      throw error
    }

    // Basic health metrics
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0',
    }

    return NextResponse.json(healthData, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}

// Disable caching for health checks
export const dynamic = 'force-dynamic'
export const revalidate = 0
