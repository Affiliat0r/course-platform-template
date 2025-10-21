/**
 * Input Sanitization and Validation Utilities
 *
 * Provides functions to sanitize and validate user input to prevent XSS, injection attacks,
 * and ensure data integrity. All user input should be sanitized before processing or storage.
 */

import validator from 'validator'
import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes and normalizes email addresses
 * Converts to lowercase and removes dots from Gmail addresses
 */
export function sanitizeEmail(email: string): string {
  const normalized = validator.normalizeEmail(email, {
    gmail_remove_dots: false, // Keep dots in Gmail addresses
    gmail_remove_subaddress: false, // Keep + addressing
  })
  return normalized || ''
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  return validator.isEmail(email)
}

/**
 * Sanitizes a general text string
 * Removes HTML tags, control characters, and limits length
 *
 * @param input - The string to sanitize
 * @param maxLength - Maximum allowed length (default: 1000)
 * @returns Sanitized string
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Remove HTML tags
  let sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] })

  // Trim whitespace
  sanitized = sanitized.trim()

  // Limit length
  sanitized = sanitized.slice(0, maxLength)

  // Remove control characters (except newlines and tabs for multiline text)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  return sanitized
}

/**
 * Sanitizes HTML content (allows safe HTML tags)
 * Use this for rich text input where some HTML is acceptable
 *
 * @param html - The HTML string to sanitize
 * @param maxLength - Maximum allowed length (default: 10000)
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string, maxLength: number = 10000): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  // Limit length before processing
  const truncated = html.slice(0, maxLength)

  // Allow only safe HTML tags
  const sanitized = DOMPurify.sanitize(truncated, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'title', 'target'],
    ALLOW_DATA_ATTR: false,
  })

  return sanitized
}

/**
 * Validates Dutch phone number format
 * Accepts formats: 0612345678, +31612345678, 06-12345678, etc.
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false

  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')

  // Dutch mobile: starts with 06 or +316
  // Dutch landline: starts with 0 followed by 1-9
  const dutchMobileRegex = /^(\+31|0)6\d{8}$/
  const dutchLandlineRegex = /^(\+31|0)[1-9]\d{8}$/

  return dutchMobileRegex.test(cleaned) || dutchLandlineRegex.test(cleaned)
}

/**
 * Sanitizes phone number by removing non-numeric characters (except +)
 */
export function sanitizePhoneNumber(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return ''
  }

  // Keep only digits and leading +
  let sanitized = phone.replace(/[^\d+]/g, '')

  // Ensure + is only at the start
  if (sanitized.includes('+')) {
    const hasPlus = sanitized.startsWith('+')
    sanitized = sanitized.replace(/\+/g, '')
    if (hasPlus) {
      sanitized = '+' + sanitized
    }
  }

  return sanitized.slice(0, 20) // Limit to reasonable length
}

/**
 * Validates Dutch postal code format
 * Format: 1234 AB or 1234AB
 */
export function validatePostalCode(postalCode: string): boolean {
  if (!postalCode) return false

  const dutchPostalCodeRegex = /^[1-9]\d{3}\s?[A-Z]{2}$/i
  return dutchPostalCodeRegex.test(postalCode.trim())
}

/**
 * Sanitizes and formats Dutch postal code
 * Converts to uppercase and adds space: 1234AB -> 1234 AB
 */
export function sanitizePostalCode(postalCode: string): string {
  if (!postalCode || typeof postalCode !== 'string') {
    return ''
  }

  // Remove all whitespace and convert to uppercase
  let sanitized = postalCode.replace(/\s/g, '').toUpperCase()

  // Validate format
  if (!/^[1-9]\d{3}[A-Z]{2}$/.test(sanitized)) {
    return postalCode.trim() // Return trimmed original if invalid
  }

  // Add space: 1234AB -> 1234 AB
  return sanitized.slice(0, 4) + ' ' + sanitized.slice(4, 6)
}

/**
 * Validates URL format
 * Only allows http and https protocols
 */
export function validateUrl(url: string): boolean {
  if (!url) return false

  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
  })
}

/**
 * Sanitizes URL
 * Returns null if URL is invalid
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  const trimmed = url.trim()

  if (!validateUrl(trimmed)) {
    return null
  }

  return trimmed
}

/**
 * Validates password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter (optional but recommended)
 * - At least one lowercase letter (optional but recommended)
 * - At least one number (optional but recommended)
 */
export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!password) {
    return { valid: false, errors: ['Wachtwoord is verplicht'] }
  }

  if (password.length < 8) {
    errors.push('Wachtwoord moet minimaal 8 tekens bevatten')
  }

  if (password.length > 128) {
    errors.push('Wachtwoord mag maximaal 128 tekens bevatten')
  }

  // Optional: Check for common weak passwords
  const weakPasswords = ['password', '12345678', 'qwerty', 'abc12345', 'password123']
  if (weakPasswords.includes(password.toLowerCase())) {
    errors.push('Dit wachtwoord is te zwak, kies een sterker wachtwoord')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validates password strength (stronger requirements)
 * Use this for administrative or sensitive accounts
 */
export function validateStrongPassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const { valid, errors } = validatePassword(password)

  if (!valid) {
    return { valid, errors }
  }

  const additionalErrors: string[] = []

  if (!/[A-Z]/.test(password)) {
    additionalErrors.push('Wachtwoord moet minimaal één hoofdletter bevatten')
  }

  if (!/[a-z]/.test(password)) {
    additionalErrors.push('Wachtwoord moet minimaal één kleine letter bevatten')
  }

  if (!/\d/.test(password)) {
    additionalErrors.push('Wachtwoord moet minimaal één cijfer bevatten')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    additionalErrors.push('Wachtwoord moet minimaal één speciaal teken bevatten')
  }

  return {
    valid: additionalErrors.length === 0,
    errors: [...errors, ...additionalErrors]
  }
}

/**
 * Sanitizes a name (first name, last name, company name)
 * Removes HTML, special characters (except hyphens, apostrophes, spaces)
 */
export function sanitizeName(name: string, maxLength: number = 100): string {
  if (!name || typeof name !== 'string') {
    return ''
  }

  // Remove HTML
  let sanitized = DOMPurify.sanitize(name, { ALLOWED_TAGS: [] })

  // Trim whitespace
  sanitized = sanitized.trim()

  // Allow only letters, spaces, hyphens, apostrophes, and dots
  sanitized = sanitized.replace(/[^a-zA-Z\s\-'\.àáâãäåçèéêëìíîïñòóôõöùúûüýÿ]/gi, '')

  // Replace multiple spaces with single space
  sanitized = sanitized.replace(/\s+/g, ' ')

  // Limit length
  return sanitized.slice(0, maxLength)
}

/**
 * Sanitizes textarea input (allows newlines)
 */
export function sanitizeTextarea(text: string, maxLength: number = 5000): string {
  if (!text || typeof text !== 'string') {
    return ''
  }

  // Remove HTML tags
  let sanitized = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] })

  // Trim whitespace from start and end
  sanitized = sanitized.trim()

  // Limit length
  sanitized = sanitized.slice(0, maxLength)

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  // Normalize line endings to \n
  sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // Limit consecutive newlines to 2
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n')

  return sanitized
}

/**
 * Validates and sanitizes form data
 * Returns sanitized data and validation errors
 */
export function sanitizeFormData(formData: FormData, fields: {
  name: string
  type: 'string' | 'email' | 'phone' | 'url' | 'textarea' | 'postalCode' | 'name'
  required?: boolean
  maxLength?: number
}[]): {
  data: Record<string, string>
  errors: Record<string, string>
  valid: boolean
} {
  const data: Record<string, string> = {}
  const errors: Record<string, string> = {}

  for (const field of fields) {
    const value = formData.get(field.name) as string

    // Check required
    if (field.required && (!value || value.trim() === '')) {
      errors[field.name] = 'Dit veld is verplicht'
      continue
    }

    if (!value) {
      data[field.name] = ''
      continue
    }

    // Sanitize based on type
    switch (field.type) {
      case 'email':
        const email = sanitizeEmail(value)
        if (!validateEmail(email)) {
          errors[field.name] = 'Ongeldig e-mailadres'
        } else {
          data[field.name] = email
        }
        break

      case 'phone':
        const phone = sanitizePhoneNumber(value)
        if (!validatePhoneNumber(phone)) {
          errors[field.name] = 'Ongeldig telefoonnummer'
        } else {
          data[field.name] = phone
        }
        break

      case 'url':
        const url = sanitizeUrl(value)
        if (!url) {
          errors[field.name] = 'Ongeldige URL'
        } else {
          data[field.name] = url
        }
        break

      case 'postalCode':
        const postalCode = sanitizePostalCode(value)
        if (!validatePostalCode(postalCode)) {
          errors[field.name] = 'Ongeldige postcode'
        } else {
          data[field.name] = postalCode
        }
        break

      case 'name':
        data[field.name] = sanitizeName(value, field.maxLength)
        break

      case 'textarea':
        data[field.name] = sanitizeTextarea(value, field.maxLength)
        break

      case 'string':
      default:
        data[field.name] = sanitizeString(value, field.maxLength)
        break
    }
  }

  return {
    data,
    errors,
    valid: Object.keys(errors).length === 0
  }
}
