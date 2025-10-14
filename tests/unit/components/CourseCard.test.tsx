import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CourseCard } from '@/components/CourseCard'
import { Course } from '@/types/course'

const mockCourse: Course = {
  id: '1',
  slug: 'typescript-mastery',
  title: 'TypeScript Mastery',
  description: 'Learn TypeScript from scratch with hands-on projects',
  longDescription: null,
  price: 149,
  currency: 'USD',
  thumbnailUrl: '/course-thumbnail.jpg',
  previewVideoUrl: null,
  status: 'PUBLISHED',
  featured: true,
  enrollmentCount: 234,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('CourseCard Component', () => {
  it('renders course title', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('TypeScript Mastery')).toBeInTheDocument()
  })

  it('renders course description', () => {
    render(<CourseCard course={mockCourse} />)
    expect(
      screen.getByText('Learn TypeScript from scratch with hands-on projects')
    ).toBeInTheDocument()
  })

  it('renders formatted price', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('$149.00')).toBeInTheDocument()
  })

  it('renders thumbnail image with alt text', () => {
    render(<CourseCard course={mockCourse} />)
    const img = screen.getByAltText('TypeScript Mastery course thumbnail')
    expect(img).toBeInTheDocument()
  })

  it('renders enrollment count', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText(/234 students enrolled/i)).toBeInTheDocument()
  })

  it('renders singular "student" for enrollment count of 1', () => {
    const courseWithOneStudent = { ...mockCourse, enrollmentCount: 1 }
    render(<CourseCard course={courseWithOneStudent} />)
    expect(screen.getByText(/1 student enrolled/i)).toBeInTheDocument()
  })

  it('does not render enrollment count when zero', () => {
    const courseWithNoStudents = { ...mockCourse, enrollmentCount: 0 }
    render(<CourseCard course={courseWithNoStudents} />)
    expect(screen.queryByText(/enrolled/i)).not.toBeInTheDocument()
  })

  it('renders "Enroll Now" button when onEnroll is provided', () => {
    const onEnroll = vi.fn()
    render(<CourseCard course={mockCourse} onEnroll={onEnroll} />)

    const button = screen.getByRole('button', { name: /enroll in typescript mastery/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Enroll Now')
  })

  it('calls onEnroll with course ID when enroll button clicked', async () => {
    const onEnroll = vi.fn()
    render(<CourseCard course={mockCourse} onEnroll={onEnroll} />)

    const button = screen.getByRole('button', { name: /enroll/i })
    await userEvent.click(button)

    expect(onEnroll).toHaveBeenCalledTimes(1)
    expect(onEnroll).toHaveBeenCalledWith('1')
  })

  it('renders "View Course" link when onEnroll is not provided', () => {
    render(<CourseCard course={mockCourse} />)

    const viewLink = screen.getByRole('link', { name: /view course/i })
    expect(viewLink).toBeInTheDocument()
    expect(viewLink).toHaveAttribute('href', '/courses/typescript-mastery')
  })

  it('has accessible heading and article structure', () => {
    render(<CourseCard course={mockCourse} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('TypeScript Mastery')
  })
})
