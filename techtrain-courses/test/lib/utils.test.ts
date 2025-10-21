import { describe, it, expect } from 'vitest'
import { cn, formatPrice, formatDate, formatDateWithDay, formatDateShort, getWeekday } from '@/lib/utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('handles empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })
})

describe('formatPrice', () => {
  it('formats price in EUR by default', () => {
    const result = formatPrice(1299)
    expect(result).toContain('1.299')
    expect(result).toContain('€')
  })

  it('formats price without decimals', () => {
    const result = formatPrice(1299.99)
    expect(result).toContain('1.300')
  })

  it('formats zero price', () => {
    const result = formatPrice(0)
    expect(result).toContain('0')
    expect(result).toContain('€')
  })

  it('formats large numbers correctly', () => {
    const result = formatPrice(12999)
    expect(result).toContain('12.999')
  })

  it('formats price with different currency', () => {
    const result = formatPrice(1299, 'USD')
    expect(result).toContain('1.299')
  })
})

describe('formatDate', () => {
  it('formats date in Dutch locale', () => {
    const date = new Date('2025-03-15')
    const result = formatDate(date)
    expect(result).toContain('15')
    expect(result).toContain('maart')
    expect(result).toContain('2025')
  })

  it('handles January dates', () => {
    const date = new Date('2025-01-10')
    const result = formatDate(date)
    expect(result).toContain('10')
    expect(result).toContain('januari')
    expect(result).toContain('2025')
  })

  it('handles December dates', () => {
    const date = new Date('2025-12-25')
    const result = formatDate(date)
    expect(result).toContain('25')
    expect(result).toContain('december')
    expect(result).toContain('2025')
  })
})

describe('formatDateWithDay', () => {
  it('includes weekday in formatted date', () => {
    const date = new Date('2025-03-15')
    const result = formatDateWithDay(date)
    expect(result).toContain('15')
    expect(result).toContain('maart')
    expect(result).toContain('2025')
    // Should include a weekday (maandag, dinsdag, etc.)
    expect(result.length).toBeGreaterThan(formatDate(date).length)
  })
})

describe('formatDateShort', () => {
  it('formats date in short format', () => {
    const date = new Date('2025-03-15')
    const result = formatDateShort(date)
    expect(result).toContain('15')
    expect(result).toContain('2025')
    // Short format should be shorter than full format
    expect(result.length).toBeLessThan(formatDate(date).length)
  })
})

describe('getWeekday', () => {
  it('returns weekday for a given date', () => {
    const date = new Date('2025-03-17') // Monday
    const result = getWeekday(date)
    expect(result).toBeTruthy()
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns Dutch weekday names', () => {
    const monday = new Date('2025-03-17')
    const result = getWeekday(monday)
    expect(result).toMatch(/maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag/i)
  })
})
