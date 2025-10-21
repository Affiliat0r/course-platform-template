import { Course } from "@/types";
import { rawCourseData } from "./course-data-raw";
import { getCourseDescription as getUniqueDescription } from "./course-descriptions";

// Helper functions
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/\//g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const getDuration = (price: number): string => {
  if (price < 800) return '1 dag';
  if (price < 1500) return '2 dagen';
  if (price < 2500) return '3 dagen';
  if (price < 3500) return '4 dagen';
  return '5 dagen';
};

const getCourseDates = (offset: number = 0): Date[] => {
  // Generate dates dynamically based on current date
  const now = new Date();
  const futureBase = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Start of next month
  return [
    new Date(futureBase.getTime() + (offset * 7 + 10) * 24 * 60 * 60 * 1000),
    new Date(futureBase.getTime() + (offset * 7 + 24) * 24 * 60 * 60 * 1000),
    new Date(futureBase.getTime() + (offset * 7 + 40) * 24 * 60 * 60 * 1000),
  ];
};

const getImageForCategory = (category: string): string => {
  const imageMap: Record<string, string> = {
    'Programmeren & Development': '/images/courses/programming.jpg',
    'Data & Data Science': '/images/courses/data-science.jpg',
    'AI & Machine Learning': '/images/courses/ai-ml.jpg',
    'Cloud Computing': '/images/courses/cloud.jpg',
    'DevOps & Containers': '/images/courses/devops.jpg',
    'Databases': '/images/courses/databases.jpg',
    'Beveiliging': '/images/courses/security.jpg',
    'APIs & Scripting': '/images/courses/apis.jpg',
  };
  return imageMap[category] || '/images/courses/programming.jpg';
};

const instructorPool = [
  { name: 'Jan de Vries', bio: 'Senior IT trainer met 15+ jaar ervaring in softwareontwikkeling en opleidingen.', imageUrl: '/images/instructors/jan-de-vries.jpg' },
  { name: 'Lisa Bakker', bio: 'Gecertificeerd expert met internationale ervaring in enterprise technologieën.', imageUrl: '/images/instructors/lisa-bakker.jpg' },
  { name: 'Mohammed El Amrani', bio: 'Cloud architect en DevOps specialist met track record bij Fortune 500 bedrijven.', imageUrl: '/images/instructors/mohammed-el-amrani.jpg' },
  { name: 'Sophie Chen', bio: 'Data scientist en AI researcher met publicaties in top conferenties.', imageUrl: '/images/instructors/sophie-chen.jpg' },
  { name: 'Mark van der Berg', bio: 'Database expert en performance specialist met 12 jaar ervaring.', imageUrl: '/images/instructors/mark-van-der-berg.jpg' },
  { name: 'Emma de Jong', bio: 'Security professional en compliance expert, gecertificeerd in meerdere frameworks.', imageUrl: '/images/instructors/emma-de-jong.jpg' },
  { name: 'Pieter Janssen', bio: 'Full-stack developer en technical lead met passie voor onderwijs.', imageUrl: '/images/instructors/pieter-janssen.jpg' },
  { name: 'Anna Vermeer', bio: 'Machine learning engineer met focus op productionisering van AI modellen.', imageUrl: '/images/instructors/anna-vermeer.jpg' },
];

const getInstructor = (index: number) => {
  return instructorPool[index % instructorPool.length];
};

// Deterministic rating generation based on index
const getDeterministicRating = (index: number): number => {
  // Use a simple hash to generate consistent ratings between 4.5 and 4.9
  const hash = (index * 2654435761) % 40; // Simple hash function
  return 4.5 + (hash / 100);
};

// Generate student count based on course index
const getStudentCount = (index: number): number => {
  const base = [523, 412, 687, 234, 891, 345, 567, 723, 456, 912];
  return base[index % base.length];
};

// Generate review count based on student count
const getReviewCount = (studentCount: number): number => {
  return Math.floor(studentCount * 0.15); // 15% of students leave reviews
};

// Determine course level
const getCourseLevel = (index: number): 'beginner' | 'intermediate' | 'advanced' => {
  const levels: ('beginner' | 'intermediate' | 'advanced')[] = ['intermediate', 'beginner', 'advanced'];
  return levels[index % 3];
};

// Determine if course has special attributes
const getSpecialAttributes = (index: number) => {
  return {
    hasCertificate: index % 4 !== 3, // 75% have certificates
    hasDiscount: index % 7 === 0, // ~14% have discounts
    discountPercentage: index % 7 === 0 ? 15 : undefined,
    isBestseller: index % 5 === 0, // 20% are bestsellers
    isNew: index % 11 === 0, // ~9% are new
    spotsLeft: index % 6 === 0 ? 3 : undefined, // Some have limited spots
    lastUpdated: index % 11 === 0 ? new Date() : undefined,
  };
};

// This function is now imported from course-descriptions.ts as getUniqueDescription
// It provides unique, SEO-optimized descriptions for each course instead of generic templates

// Transform raw data to Course objects
export const courses: Course[] = rawCourseData.map((raw, index) => {
  const slug = createSlug(raw.name);
  const details = getUniqueDescription(slug, raw.name, raw.category);
  const studentCount = getStudentCount(index);
  const specialAttrs = getSpecialAttributes(index);

  return {
    id: String(index + 1),
    title: raw.name,
    slug: slug,
    description: details.description,
    shortDescription: details.shortDescription,
    price: raw.price,
    duration: getDuration(raw.price),
    language: 'nl',
    format: index % 3 === 0 ? 'virtual' : 'classroom',
    category: raw.category,
    level: getCourseLevel(index),
    rating: getDeterministicRating(index),
    reviewCount: getReviewCount(studentCount),
    studentCount: studentCount,
    imageUrl: getImageForCategory(raw.category),
    objectives: details.objectives,
    prerequisites: details.prerequisites,
    targetAudience: details.targetAudience,
    syllabus: details.syllabus,
    instructor: getInstructor(index),
    dates: getCourseDates(index),
    ...specialAttrs,
  };
});

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter(course => course.category === category);
}

export function getFeaturedCourses(limit: number = 6): Course[] {
  // Return a mix of popular courses from different categories
  return courses.slice(0, limit);
}

export const categories = [
  'Programmeren & Development',
  'Data & Data Science',
  'AI & Machine Learning',
  'Cloud Computing',
  'DevOps & Containers',
  'Databases',
  'Beveiliging',
  'APIs & Scripting'
];
