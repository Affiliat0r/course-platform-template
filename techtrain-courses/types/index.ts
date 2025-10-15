export type Language = 'en' | 'nl';

export type TrainingFormat = 'classroom' | 'virtual' | 'corporate' | 'private';

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
  rating?: number;
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
  };
  dates: Date[];
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
