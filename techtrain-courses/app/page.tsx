import Link from 'next/link';
import { Search, Code, Database, Cloud, Cpu, Container } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import CourseCard from '@/components/CourseCard';
import { getFeaturedCourses } from '@/lib/data';

const categories = [
  { name: 'Programming', icon: Code, count: 15 },
  { name: 'Data', icon: Database, count: 12 },
  { name: 'Cloud', icon: Cloud, count: 10 },
  { name: 'AI/ML', icon: Cpu, count: 8 },
  { name: 'DevOps', icon: Container, count: 9 },
];

export default function Home() {
  const featuredCourses = getFeaturedCourses(4);

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
          <div className="flex gap-2 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Zoek cursussen..."
                className="pl-10 h-12"
              />
            </div>
            <Button size="lg" className="h-12">
              <Search className="w-5 h-5" />
            </Button>
          </div>

          <Link href="/courses">
            <Button size="lg" className="mt-6">
              Ontdek Cursussen
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${category.name}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{category.name}</h3>
                <p className="text-sm text-secondary-600">{category.count} cursussen</p>
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
