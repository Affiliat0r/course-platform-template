export type Language = 'en' | 'nl';

export type TrainingFormat = 'classroom' | 'virtual' | 'corporate' | 'private';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: string;
  language: Language;
  format: TrainingFormat;
  category: string;
  level?: CourseLevel;
  rating?: number;
  reviewCount?: number;
  studentCount?: number;
  completionRate?: number;
  imageUrl: string;
  objectives: string[];
  prerequisites: string[];
  targetAudience: string[];
  syllabus: {
    title: string;
    topics: string[];
  }[];
  instructor: {
    name: string;
    bio: string;
    imageUrl: string;
    linkedIn?: string;
    github?: string;
  };
  dates: Date[];
  hasCertificate?: boolean;
  hasDiscount?: boolean;
  discountPercentage?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  lastUpdated?: Date;
  spotsLeft?: number;
  companyLogos?: string[];
}

export interface CourseReview {
  id: string;
  courseId: string;
  userName: string;
  userTitle?: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
  notHelpful: number;
}

export interface CartItem {
  course: Course;
  selectedDate: Date;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  billingType: 'individual' | 'corporate';
  billingDetails: {
    name: string;
    email: string;
    phone: string;
    companyName?: string;
    address?: string;
  };
  paymentMethod: 'card' | 'ideal' | 'invoice';
  createdAt: Date;
}
