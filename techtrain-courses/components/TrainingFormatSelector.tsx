'use client';

import { Phone, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types';

interface TrainingFormatAction {
  iconType: 'phone' | 'file' | 'check';
  label: string;
  href: string;
}

interface TrainingFormatConfig {
  id: string;
  title: string;
  iconType: 'check';
  pricing: string;
  description?: string;
  actions: TrainingFormatAction[];
}

interface TrainingFormatSelectorProps {
  course: Course;
}

const getIcon = (iconType: string, className: string) => {
  switch (iconType) {
    case 'phone':
      return <Phone className={className} />;
    case 'file':
      return <FileText className={className} />;
    case 'check':
      return <CheckCircle className={className} />;
    default:
      return null;
  }
};

export default function TrainingFormatSelector({ course }: TrainingFormatSelectorProps) {
  const formats: TrainingFormatConfig[] = [
    {
      id: 'corporate',
      title: 'Bedrijfstraining',
      iconType: 'check',
      pricing: 'in overleg',
      description: 'Voor één of meerdere deelnemers, op de door jou gewenste locatie (maatwerk mogelijk)',
      actions: [
        {
          iconType: 'phone',
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          iconType: 'file',
          label: 'Stuur mij een vrijblijvend voorstel',
          href: '/contact',
        },
      ],
    },
    {
      id: 'private',
      title: 'Privétraining',
      iconType: 'check',
      pricing: 'in overleg',
      description: undefined,
      actions: [
        {
          iconType: 'phone',
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          iconType: 'file',
          label: 'Stuur mij een vrijblijvend voorstel',
          href: '/contact',
        },
      ],
    },
    {
      id: 'virtual',
      title: 'Virtuele training',
      iconType: 'check',
      pricing: 'in overleg',
      description: '(Remote classroom)',
      actions: [
        {
          iconType: 'phone',
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          iconType: 'file',
          label: 'Stuur mij een vrijblijvend voorstel',
          href: '/contact',
        },
      ],
    },
    {
      id: 'classroom',
      title: 'Klassikale training',
      iconType: 'check',
      pricing: `${course.duration} / € ${course.price.toLocaleString('nl-NL')}`,
      description: '(excl. btw, prijs per deelnemer)',
      actions: [
        {
          iconType: 'phone',
          label: 'Bel mij hierover',
          href: '/contact',
        },
        {
          iconType: 'check',
          label: 'Ik wil me inschrijven',
          href: `/inschrijven?course=${course.slug}`,
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
              {getIcon(format.iconType, "w-5 h-5 text-green-600")}
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
                  {getIcon(action.iconType, "w-4 h-4")}
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
