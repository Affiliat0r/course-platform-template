import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create example courses
  const typescriptCourse = await prisma.course.upsert({
    where: { slug: 'typescript-mastery' },
    update: {},
    create: {
      slug: 'typescript-mastery',
      title: 'TypeScript Mastery: From Beginner to Advanced',
      description:
        'Master TypeScript with hands-on projects, covering types, interfaces, generics, and real-world patterns.',
      longDescription: `
# About This Course

Learn TypeScript from the ground up with comprehensive coverage of all essential features.

## What You'll Learn

- TypeScript fundamentals and type system
- Interfaces, type aliases, and generics
- Advanced patterns with decorators and utility types
- Integration with React and Node.js
- Real-world project development

## Prerequisites

- Basic JavaScript knowledge
- Familiarity with modern web development

This course includes video lessons, interactive exercises, and hands-on projects.
      `,
      price: 149,
      currency: 'USD',
      status: 'PUBLISHED',
      featured: true,
      modules: {
        create: [
          {
            title: 'TypeScript Foundations',
            description: 'Learn the basics of TypeScript',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'What is TypeScript?',
                  slug: 'what-is-typescript',
                  content:
                    'Introduction to TypeScript and its benefits over plain JavaScript.',
                  duration: 15,
                  order: 1,
                  isFree: true,
                  lessonType: 'VIDEO',
                },
                {
                  title: 'Setting Up Your Environment',
                  slug: 'setup-environment',
                  content: 'How to install and configure TypeScript.',
                  duration: 20,
                  order: 2,
                  isFree: true,
                  lessonType: 'VIDEO',
                },
                {
                  title: 'Basic Types',
                  slug: 'basic-types',
                  content: 'Understanding TypeScript basic types: string, number, boolean, etc.',
                  duration: 30,
                  order: 3,
                  lessonType: 'VIDEO',
                },
              ],
            },
          },
          {
            title: 'Interfaces and Type Aliases',
            description: 'Deep dive into TypeScript interfaces',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Creating Interfaces',
                  slug: 'creating-interfaces',
                  content: 'How to define and use interfaces in TypeScript.',
                  duration: 25,
                  order: 1,
                  lessonType: 'VIDEO',
                },
                {
                  title: 'Type Aliases vs Interfaces',
                  slug: 'type-aliases-vs-interfaces',
                  content: 'Understanding the differences and when to use each.',
                  duration: 20,
                  order: 2,
                  lessonType: 'VIDEO',
                },
              ],
            },
          },
        ],
      },
    },
  })

  const reactCourse = await prisma.course.upsert({
    where: { slug: 'react-essentials' },
    update: {},
    create: {
      slug: 'react-essentials',
      title: 'React Essentials: Build Modern Web Apps',
      description: 'Learn React from scratch and build production-ready applications.',
      longDescription: `
# React Essentials

A comprehensive guide to modern React development.

## What You'll Learn

- React fundamentals (components, props, state)
- Hooks and functional components
- State management with Context API
- React Router for navigation
- Building and deploying React apps

Perfect for beginners and intermediate developers.
      `,
      price: 129,
      currency: 'USD',
      status: 'PUBLISHED',
      featured: true,
      modules: {
        create: [
          {
            title: 'React Fundamentals',
            description: 'Core concepts of React',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to React',
                  slug: 'intro-to-react',
                  content: 'What is React and why use it?',
                  duration: 18,
                  order: 1,
                  isFree: true,
                  lessonType: 'VIDEO',
                },
                {
                  title: 'Components and Props',
                  slug: 'components-and-props',
                  content: 'Building reusable components with props.',
                  duration: 35,
                  order: 2,
                  lessonType: 'VIDEO',
                },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('✅ Created courses:', {
    typescript: typescriptCourse.title,
    react: reactCourse.title,
  })

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
