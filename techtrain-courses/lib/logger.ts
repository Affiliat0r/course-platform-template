/**
 * Logging and Security Monitoring Utilities
 *
 * Provides structured logging for application events and security incidents.
 * In production, logs can be sent to external services like Sentry, LogRocket, or Datadog.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  context?: any
  timestamp: string
  userId?: string
  ip?: string
  userAgent?: string
}

/**
 * Core logging function
 * Logs to console in development, can be extended to send to external services in production
 */
export function log(level: LogLevel, message: string, context?: any) {
  const entry: LogEntry = {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  }

  // In production, send to logging service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to logging service (Sentry, LogRocket, Datadog, etc.)
    // Example: Sentry.captureMessage(message, { level, extra: context })
    console[level](JSON.stringify(entry))
  } else {
    // Development: pretty print to console
    console[level](`[${level.toUpperCase()}] ${message}`, context || '')
  }
}

/**
 * Log info message
 */
export function logInfo(message: string, context?: any) {
  log('info', message, context)
}

/**
 * Log warning message
 */
export function logWarn(message: string, context?: any) {
  log('warn', message, context)
}

/**
 * Log error message
 */
export function logError(message: string, context?: any) {
  log('error', message, context)
}

/**
 * Log debug message (only in development)
 */
export function logDebug(message: string, context?: any) {
  if (process.env.NODE_ENV !== 'production') {
    log('debug', message, context)
  }
}

/**
 * Log security event with additional metadata
 */
export function logSecurityEvent(event: string, details?: any) {
  const logMessage = `[SECURITY] ${event}`

  log('warn', logMessage, {
    ...details,
    securityEvent: true,
    timestamp: new Date().toISOString(),
  })

  // Alert admin for critical events
  if (event.includes('CRITICAL')) {
    logCriticalSecurityEvent(event, details)
  }
}

/**
 * Log critical security event
 * This should trigger immediate alerts (email, SMS, etc.)
 */
function logCriticalSecurityEvent(event: string, details?: any) {
  const criticalEntry = {
    level: 'error' as LogLevel,
    message: `[CRITICAL SECURITY] ${event}`,
    context: details,
    timestamp: new Date().toISOString(),
    alert: true,
  }

  // Log to console
  console.error('🚨 CRITICAL SECURITY EVENT 🚨')
  console.error(JSON.stringify(criticalEntry, null, 2))

  // TODO: Send immediate alert via email/SMS
  // TODO: Send to incident management system
  // TODO: Trigger automated security response if needed
}

/**
 * Log authentication event
 */
export function logAuthEvent(
  event: 'login' | 'logout' | 'register' | 'password_reset' | 'password_change',
  userId?: string,
  success: boolean = true,
  details?: any
) {
  const message = success
    ? `User ${event} successful`
    : `User ${event} failed`

  log(success ? 'info' : 'warn', message, {
    event,
    userId,
    success,
    ...details,
  })
}

/**
 * Log failed login attempt
 */
export function logFailedLogin(email: string, ip: string, reason?: string) {
  logSecurityEvent('Failed login attempt', {
    email,
    ip,
    reason,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Log rate limit exceeded
 */
export function logRateLimitExceeded(ip: string, endpoint: string, details?: any) {
  logSecurityEvent('Rate limit exceeded', {
    ip,
    endpoint,
    ...details,
  })
}

/**
 * Log database error
 */
export function logDatabaseError(operation: string, error: any, details?: any) {
  logError(`Database error during ${operation}`, {
    operation,
    error: error.message || error,
    stack: error.stack,
    ...details,
  })
}

/**
 * Log API error
 */
export function logApiError(endpoint: string, error: any, details?: any) {
  logError(`API error at ${endpoint}`, {
    endpoint,
    error: error.message || error,
    stack: error.stack,
    ...details,
  })
}

/**
 * Log payment event
 */
export function logPaymentEvent(
  event: 'initiated' | 'completed' | 'failed' | 'refunded',
  amount: number,
  currency: string,
  userId?: string,
  details?: any
) {
  log(event === 'failed' ? 'error' : 'info', `Payment ${event}`, {
    event,
    amount,
    currency,
    userId,
    ...details,
  })
}

/**
 * Log enrollment event
 */
export function logEnrollmentEvent(
  event: 'created' | 'updated' | 'cancelled',
  courseId: string,
  userId: string,
  details?: any
) {
  logInfo(`Enrollment ${event}`, {
    event,
    courseId,
    userId,
    ...details,
  })
}

/**
 * Log suspicious activity
 */
export function logSuspiciousActivity(activity: string, details?: any) {
  logSecurityEvent(`Suspicious activity detected: ${activity}`, details)
}

/**
 * Performance logging
 */
export function logPerformance(operation: string, duration: number, details?: any) {
  const level: LogLevel = duration > 1000 ? 'warn' : 'debug'
  log(level, `Performance: ${operation} took ${duration}ms`, {
    operation,
    duration,
    ...details,
  })
}

/**
 * Log user action
 */
export function logUserAction(action: string, userId?: string, details?: any) {
  logInfo(`User action: ${action}`, {
    action,
    userId,
    ...details,
  })
}

/**
 * Create a performance timer
 * Returns a function to stop the timer and log the duration
 */
export function startPerformanceTimer(operation: string) {
  const start = Date.now()

  return (details?: any) => {
    const duration = Date.now() - start
    logPerformance(operation, duration, details)
    return duration
  }
}

/**
 * Error reporting utility
 * Logs error and sends to external service in production
 */
export function reportError(error: Error, context?: any) {
  logError(error.message, {
    error: error.message,
    stack: error.stack,
    ...context,
  })

  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Sentry, Rollbar, etc.
    // Example: Sentry.captureException(error, { extra: context })
  }
}

/**
 * Security metrics tracking
 */
export class SecurityMetrics {
  private static failedLogins = new Map<string, number>()
  private static rateLimitHits = new Map<string, number>()

  /**
   * Track failed login attempt
   */
  static trackFailedLogin(ip: string) {
    const current = this.failedLogins.get(ip) || 0
    this.failedLogins.set(ip, current + 1)

    // Alert if too many failures from same IP
    if (current + 1 >= 10) {
      logSecurityEvent('High number of failed logins from single IP', {
        ip,
        count: current + 1,
      })
    }
  }

  /**
   * Track rate limit hit
   */
  static trackRateLimitHit(identifier: string) {
    const current = this.rateLimitHits.get(identifier) || 0
    this.rateLimitHits.set(identifier, current + 1)
  }

  /**
   * Get security metrics
   */
  static getMetrics() {
    return {
      failedLogins: Object.fromEntries(this.failedLogins),
      rateLimitHits: Object.fromEntries(this.rateLimitHits),
    }
  }

  /**
   * Reset metrics (call this periodically, e.g., daily)
   */
  static reset() {
    this.failedLogins.clear()
    this.rateLimitHits.clear()
  }
}

/**
 * Audit log for compliance (GDPR, etc.)
 */
export function logAuditEvent(
  action: string,
  userId: string,
  resourceType: string,
  resourceId: string,
  details?: any
) {
  log('info', `[AUDIT] ${action}`, {
    audit: true,
    action,
    userId,
    resourceType,
    resourceId,
    timestamp: new Date().toISOString(),
    ...details,
  })
}
