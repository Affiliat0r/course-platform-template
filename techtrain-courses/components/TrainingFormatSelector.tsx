'use client';

import { Phone, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types';

interface TrainingFormat {
  id: string;
  title: string;
  icon: React.ReactNode;
  pricing: string;
  description?: string;
  actions: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

interface TrainingFormatSelectorProps {
  course: Course;
}

export default function TrainingFormatSelector({ course }: TrainingFormatSelectorProps) {
  const formats: TrainingFormat[] = [
    {
      id: 'corporate',
      title: 'Bedrijfstraining',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      pricing: 'in overleg',
      description: 'Voor één of meerdere deelnemers, op de door jou gewenste locatie (maatwerk mogelijk)',
      actions: [
        {
          icon: <Phone className="w-4 h-4" />,
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          icon: <FileText className="w-4 h-4" />,
          label: 'Stuur mij een vrijblijvend voorstel',
          href: '/contact',
        },
      ],
    },
    {
      id: 'private',
      title: 'Privétraining',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      pricing: 'in overleg',
      description: undefined,
      actions: [
        {
          icon: <Phone className="w-4 h-4" />,
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          icon: <FileText className="w-4 h-4" />,
          label: 'Stuur mij een vrijblijvend voorstel',
          href: '/contact',
        },
      ],
    },
    {
      id: 'virtual',
      title: 'Virtuele training',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      pricing: 'in overleg',
      description: '(Remote classroom)',
      actions: [
        {
          icon: <Phone className="w-4 h-4" />,
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          icon: <FileText className="w-4 h-4" />,
          label: 'Stuur mij een vrijblijvend voorstel',
          href: '/contact',
        },
      ],
    },
    {
      id: 'classroom',
      title: 'Klassikale training',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      pricing: `${course.duration} / € ${course.price.toLocaleString('nl-NL')}`,
      description: '(excl. btw, prijs per deelnemer)',
      actions: [
        {
          icon: <Phone className="w-4 h-4" />,
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Ik wil me inschrijven',
          href: `/checkout?course=${course.slug}`,
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Kies hier je training</h2>
      <div className="space-y-6">
        {formats.map((format) => (
          <div key={format.id} className="bg-white p-4 rounded-md border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              {format.icon}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{format.title}</h3>
                {format.description && (
                  <p className="text-sm text-gray-600">{format.description}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-600">Aantal dagen en prijs:</div>
              <div className="font-bold text-gray-900">{format.pricing}</div>
            </div>

            <div className="space-y-2">
              {format.actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
