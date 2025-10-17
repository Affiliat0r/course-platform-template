'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Code, Database, Cloud, Cpu, Container, Lock, Webhook } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import CourseCard from '@/components/CourseCard';
import { getFeaturedCourses, categories as allCategories, courses } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';

// Map Dutch categories to icons
const categoryIconMap: Record<string, LucideIcon> = {
  'Programmeren & Development': Code,
  'Data & Data Science': Database,
  'AI & Machine Learning': Cpu,
  'Cloud Computing': Cloud,
  'DevOps & Containers': Container,
  'Databases': Database,
  'Beveiliging': Lock,
  'APIs & Scripting': Webhook,
};

// Calculate real counts for each category
const categoriesWithCounts = allCategories.map(category => ({
  name: category,
  icon: categoryIconMap[category] || Code,
  count: courses.filter(course => course.category === category).length,
}));

export default function Home() {
  const featuredCourses = getFeaturedCourses(4);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/courses');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            ONTGRENDEL JE POTENTIEEL<br />
            BEHEERS IT-VAARDIGHEDEN
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-secondary-100">
            Hoogwaardige IT-training voor professionals en organisaties
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Zoek cursussen..."
                className="pl-10 h-12 w-full rounded-lg border border-secondary-200 bg-white text-secondary-900 placeholder-secondary-500 focus:ring-2 focus:ring-white/50 focus:border-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-12" aria-label="Zoeken">
              <Search className="w-5 h-5" />
            </Button>
          </form>

          <Link href="/courses">
            <Button size="lg" className="mt-6">
              Bekijk Alle Cursussen
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-secondary-900 mb-8">Uitgelichte Cursussen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Course Categories */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">Cursuscategorieën</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesWithCounts.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${encodeURIComponent(category.name)}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1 text-sm">{category.name}</h3>
                <p className="text-sm text-secondary-600">{category.count} {category.count === 1 ? 'cursus' : 'cursussen'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">Hoe Het Werkt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Ontdekken</h3>
            <p className="text-secondary-600">
              Blader door onze uitgebreide catalogus van IT-cursussen en vind de perfecte training voor jouw behoeften.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Inschrijven & Leren</h3>
            <p className="text-secondary-600">
              Kies je voorkeursformat, selecteer een datum en schrijf je in voor door experts geleide trainingen.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Groei Je Carrière</h3>
            <p className="text-secondary-600">
              Pas je nieuwe vaardigheden toe, behaal certificeringen en versterk je professionele carrière.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
