import { Course } from "@/types";
import { rawCourseData } from "./course-data-raw";

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
    'Programmeren & Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    'Data & Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    'AI & Machine Learning': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    'Cloud Computing': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    'DevOps & Containers': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    'Databases': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    'Beveiliging': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    'APIs & Scripting': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  };
  return imageMap[category] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800';
};

const instructorPool = [
  { name: 'Jan de Vries', bio: 'Senior IT trainer met 15+ jaar ervaring in softwareontwikkeling en opleidingen.', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { name: 'Lisa Bakker', bio: 'Gecertificeerd expert met internationale ervaring in enterprise technologieën.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { name: 'Mohammed El Amrani', bio: 'Cloud architect en DevOps specialist met track record bij Fortune 500 bedrijven.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { name: 'Sophie Chen', bio: 'Data scientist en AI researcher met publicaties in top conferenties.', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  { name: 'Mark van der Berg', bio: 'Database expert en performance specialist met 12 jaar ervaring.', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
  { name: 'Emma de Jong', bio: 'Security professional en compliance expert, gecertificeerd in meerdere frameworks.', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200' },
  { name: 'Pieter Janssen', bio: 'Full-stack developer en technical lead met passie voor onderwijs.', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200' },
  { name: 'Anna Vermeer', bio: 'Machine learning engineer met focus op productionisering van AI modellen.', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
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

const getCourseDescription = (name: string, category: string): { description: string, shortDescription: string, objectives: string[], prerequisites: string[], targetAudience: string[] } => {
  const descriptions: Record<string, any> = {
    'default': {
      description: `Professionele training in ${name}. Leer de essentiële vaardigheden en best practices om direct toe te passen in je werk.`,
      shortDescription: `Master ${name} met praktische hands-on training`,
      objectives: [
        'Begrijp de fundamentele concepten',
        'Implementeer best practices',
        'Los praktische problemen op',
        'Bouw productie-klare oplossingen'
      ],
      prerequisites: ['Basiskennis IT', 'Ervaring met gerelateerde technologieën aanbevolen'],
      targetAudience: ['Developers', 'IT Professionals', 'Technical Leads']
    }
  };

  return descriptions['default'];
};

// Transform raw data to Course objects
export const courses: Course[] = rawCourseData.map((raw, index) => {
  const slug = createSlug(raw.name);
  const details = getCourseDescription(raw.name, raw.category);

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
    rating: getDeterministicRating(index), // Deterministic rating between 4.5 and 4.9
    imageUrl: getImageForCategory(raw.category),
    objectives: details.objectives,
    prerequisites: details.prerequisites,
    targetAudience: details.targetAudience,
    syllabus: [
      {
        title: 'Fundamentals',
        topics: ['Basisconcepten', 'Core features', 'Best practices']
      },
      {
        title: 'Advanced Topics',
        topics: ['Geavanceerde technieken', 'Real-world toepassingen', 'Optimization']
      }
    ],
    instructor: getInstructor(index),
    dates: getCourseDates(index)
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
