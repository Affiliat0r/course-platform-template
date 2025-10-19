'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 min-h-[700px] flex items-center">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Beheers IT-Vaardigheden.<br />
            <span className="text-blue-200">Versterk Je Carrière.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
            Hoogwaardige IT-training voor professionals en organisaties
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
              <input
                type="text"
                placeholder="Zoek cursussen, technologieën, vaardigheden..."
                className="pl-12 pr-4 h-14 w-full rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-secondary-900 placeholder-secondary-500 focus:ring-4 focus:ring-white/30 focus:border-white transition-all shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-white text-primary-600 hover:bg-secondary-50 font-semibold shadow-xl"
              aria-label="Zoeken"
            >
              <Search className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Zoeken</span>
            </Button>
          </form>

          <Link href="/courses">
            <Button size="lg" className="mt-6">
              Bekijk Alle Cursussen
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="border-y border-secondary-200 bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">2.500+</div>
              <div className="text-xs md:text-sm text-secondary-600">Professionals Getraind</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">4.8/5</div>
              <div className="text-xs md:text-sm text-secondary-600">Gemiddelde Beoordeling</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">150+</div>
              <div className="text-xs md:text-sm text-secondary-600">IT-Cursussen</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">100+</div>
              <div className="text-xs md:text-sm text-secondary-600">Bedrijfsklanten</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="bg-secondary-50 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-secondary-600 mb-8 uppercase tracking-wide">
            Vertrouwd door toonaangevende Nederlandse bedrijven
          </p>
          <div className="relative">
            {/* Animated sliding logos */}
            <div className="flex animate-slide">
              {/* First set of logos */}
              <div className="flex items-center justify-around min-w-full shrink-0 gap-12 px-6">
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/abn-amro-bank-1.svg" alt="ABN AMRO" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/kpn-3.svg" alt="KPN" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/de-nederlandsche-bank.svg" alt="De Nederlandsche Bank" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/postnl-3.svg" alt="PostNL" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/vattenfall.svg" alt="Vattenfall" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/Logo_DPD.svg" alt="DPD" width={100} height={48} className="object-contain" />
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-around min-w-full shrink-0 gap-12 px-6">
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/abn-amro-bank-1.svg" alt="ABN AMRO" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/kpn-3.svg" alt="KPN" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/de-nederlandsche-bank.svg" alt="De Nederlandsche Bank" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/postnl-3.svg" alt="PostNL" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/vattenfall.svg" alt="Vattenfall" width={100} height={48} className="object-contain" />
                </div>
                <div className="flex items-center justify-center h-12 min-w-[120px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <Image src="/logos/Logo_DPD.svg" alt="DPD" width={100} height={48} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
              Populaire IT-Cursussen
            </h2>
            <p className="text-lg text-secondary-600">
              De meest gevolgde trainingen door professionals zoals jij
            </p>
          </div>
          <Link
            href="/courses"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 group"
          >
            Bekijk alle cursussen
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} showPrice={false} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 border-y border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Wat Onze Cursisten Zeggen
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Ontdek hoe professionals hun carrière transformeerden met TechTrain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-secondary-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-700 mb-6 leading-relaxed italic">
                "De Python voor Data Science cursus heeft mijn carrière compleet veranderd. Binnen 3 maanden na afronding kreeg ik een promotie als Data Analyst. De instructeur was fantastisch!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                  SB
                </div>
                <div>
                  <div className="font-bold text-secondary-900">Sarah Bakker</div>
                  <div className="text-sm text-secondary-600">Data Analyst, ING Bank</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-secondary-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-700 mb-6 leading-relaxed italic">
                "Excellent! De Docker & Kubernetes training was precies wat ons team nodig had. Praktische hands-on sessies en real-world scenarios. Nu draaien we containers in productie."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                  MV
                </div>
                <div>
                  <div className="font-bold text-secondary-900">Mark van den Berg</div>
                  <div className="text-sm text-secondary-600">DevOps Engineer, Exact</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-secondary-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-700 mb-6 leading-relaxed italic">
                "Als beginner was ik nerveus, maar de React & Next.js cursus was perfect opgebouwd. Na 4 weken had ik mijn eerste web app live. Top begeleiding en ondersteuning!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                  LJ
                </div>
                <div>
                  <div className="font-bold text-secondary-900">Lisa Jansen</div>
                  <div className="text-sm text-secondary-600">Frontend Developer, Coolblue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="bg-gradient-to-br from-secondary-50 to-primary-50/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
              Ontdek Cursussen Per Categorie
            </h2>
            <p className="text-lg text-secondary-600">
              Van programmeren tot cloud computing - wij hebben de training die je zoekt
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categoriesWithCounts.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${encodeURIComponent(category.name)}`}
                className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon without circle - modern approach */}
                  <div className="mb-4 inline-flex">
                    <category.icon className="w-10 h-10 md:w-12 md:h-12 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="font-bold text-secondary-900 mb-2 text-sm md:text-base leading-tight">
                    {category.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <span className="font-semibold text-primary-600">{category.count}</span>
                    <span>{category.count === 1 ? 'cursus' : 'cursussen'}</span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-3 inline-flex items-center text-primary-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Bekijk cursussen
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Zo Werkt Het
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            In drie eenvoudige stappen begin je jouw IT-carrière naar een hoger niveau te tillen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group">
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-secondary-900">Ontdek & Vergelijk</h3>
            <p className="text-secondary-600 leading-relaxed">
              Gebruik onze slimme zoekfunctie om uit <strong>150+ IT-cursussen</strong> te kiezen. Filter op categorie, niveau en format.
            </p>
          </div>

          <div className="text-center group">
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-secondary-900">Schrijf In & Start</h3>
            <p className="text-secondary-600 leading-relaxed">
              Kies tussen <strong>klassikaal of virtueel</strong>, selecteer een datum die past en schrijf je direct in. Bevestiging binnen 24 uur.
            </p>
          </div>

          <div className="text-center group">
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-secondary-900">Leer & Certificeer</h3>
            <p className="text-secondary-600 leading-relaxed">
              Volg de training van <strong>expert-instructeurs</strong>, pas je kennis direct toe en ontvang je officiële certificaat.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-10 md:p-16 text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar om je IT-vaardigheden te verbeteren?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Sluit je aan bij 2.500+ professionals die hun carrière versterkten met TechTrain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-secondary-50 font-bold px-8 py-4 text-lg shadow-xl">
                Bekijk Alle Cursussen
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-bold px-8 py-4 text-lg">
                Neem Contact Op
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-lg text-secondary-600">
              Alles wat je moet weten over onze IT-trainingen
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Wat is het verschil tussen klassikaal en virtueel?
              </h3>
              <p className="text-secondary-700 leading-relaxed">
                Bij klassikale trainingen kom je fysiek naar onze trainingslocaties in Amsterdam, Rotterdam of Utrecht. Virtuele trainingen volg je online via een interactieve live videoverbinding. Beide formaten bieden dezelfde kwaliteit, hands-on oefeningen en directe interactie met de instructeur.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Krijg ik een certificaat na afronding?
              </h3>
              <p className="text-secondary-700 leading-relaxed">
                Ja! Na succesvolle afronding van elke cursus ontvang je een officieel TechTrain certificaat. Voor veel van onze cursussen kun je ook kiezen voor een extra officiële vendor-certificering (bijv. AWS, Microsoft, Docker) tegen meerprijs.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Kan mijn werkgever de cursus betalen?
              </h3>
              <p className="text-secondary-700 leading-relaxed">
                Absoluut! Meer dan 70% van onze cursisten wordt gesponsord door hun werkgever. We sturen graag een offerte en cursusprogramma voor je manager. Voor bedrijven bieden we ook incompany trainingen op maat aan.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Wat als ik de cursus moet annuleren?
              </h3>
              <p className="text-secondary-700 leading-relaxed">
                Tot 14 dagen voor aanvang kun je kosteloos annuleren of omboeken naar een andere datum. Tussen 14-7 dagen voor start rekenen we 50% van het cursusgeld. Bij annulering binnen 7 dagen is het volledige bedrag verschuldigd, tenzij je een vervanger stuurt.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Welk niveau moet ik hebben om te starten?
              </h3>
              <p className="text-secondary-700 leading-relaxed">
                Elk cursusprogramma vermeldt duidelijk de vereiste voorkennis. We hebben cursussen voor alle niveaus: van absolute beginners tot gevorderde professionals. Twijfel je? Neem contact op en we helpen je de juiste cursus te kiezen.
              </p>
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-secondary-900 mb-3">
              Heb je nog een vraag?
            </h3>
            <p className="text-secondary-600 mb-6">
              Ons team staat klaar om je te helpen met al je vragen over cursussen, planning of bedrijfstrainingen.
            </p>
            <Link href="/contact">
              <Button size="lg" className="font-bold">
                Neem Contact Op
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blijf Op De Hoogte
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ontvang maandelijks tips, nieuwe cursussen en exclusieve kortingen
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Jouw e-mailadres"
              className="flex-1 px-6 py-4 rounded-xl text-secondary-900 placeholder-secondary-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <Button size="lg" className="bg-white text-primary-600 hover:bg-secondary-50 font-bold px-8 py-4 whitespace-nowrap">
              Schrijf Je In
            </Button>
          </form>
          <p className="text-sm text-blue-200 mt-4">
            Geen spam, uitschrijven kan altijd. Privacy gegarandeerd.
          </p>
        </div>
      </section>
    </div>
  );
}
