'use client';

import { useState } from 'react';
import { Course } from '@/types';
import CourseTabNavigation, { TabType } from './CourseTabNavigation';
import TrainingFormatSelector from './TrainingFormatSelector';
import ContactSidebar from './ContactSidebar';
import { User, Calendar, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

interface CourseDetailContentProps {
  course: Course;
}

export default function CourseDetailContent({ course }: CourseDetailContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overzicht');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overzicht':
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {course.description}
            </p>
            <TrainingFormatSelector course={course} />
          </div>
        );

      case 'inleiding':
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Inleiding</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {course.description}
            </p>
            <p className="text-gray-700 leading-relaxed">
              Deze training is ontwikkeld voor professionals die hun kennis op dit gebied willen
              uitbreiden en direct toepasbare vaardigheden willen opdoen.
            </p>
          </div>
        );

      case 'modulen':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lesprogramma</h2>
            <div className="space-y-6">
              {course.syllabus.map((module, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 py-2">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'extra':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Extra Informatie</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Doelgroep</h3>
                <ul className="space-y-2">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Leerdoelen</h3>
                <ul className="space-y-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Vereiste Kennis</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Docent</h3>
                <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={course.instructor.imageUrl}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{course.instructor.name}</h4>
                    <p className="text-gray-700 mt-2">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'beoordelingen':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Beoordelingen</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold text-gray-900">
                  {course.rating?.toFixed(1) || '4.8'}
                </span>
              </div>
              <p className="text-gray-600">Gemiddelde waardering van deelnemers</p>
              <p className="text-sm text-gray-500 mt-4">
                Beoordelingen worden binnenkort toegevoegd
              </p>
            </div>
          </div>
        );

      case 'startdata-locaties':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Startdata & Locaties</h2>
            <div className="space-y-4">
              {course.dates.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {new Intl.DateTimeFormat('nl-NL', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }).format(date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>Online / Op locatie (naar keuze)</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/checkout?course=${course.slug}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Inschrijven
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tarieven':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Tarieven</h2>
            <TrainingFormatSelector course={course} />
          </div>
        );

      case 'virtuele-training':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Virtuele Training (Remote Classroom)</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Deze training is ook beschikbaar als virtuele training. Je volgt de cursus vanuit
                je eigen werkomgeving via een live verbinding met de docent.
              </p>

              <h3 className="text-xl font-semibold mb-3">Voordelen van virtuele training:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Geen reistijd en reiskosten</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Live interactie met de docent en andere deelnemers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Praktische oefeningen op je eigen systeem</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Flexibel te combineren met je werkzaamheden</span>
                </li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Let op:</strong> Voor virtuele training heb je een stabiele
                  internetverbinding nodig en een computer met webcam en microfoon.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <CourseTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <ContactSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
