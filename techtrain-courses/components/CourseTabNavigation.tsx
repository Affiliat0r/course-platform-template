'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type TabType =
  | 'overzicht'
  | 'inleiding'
  | 'modulen'
  | 'extra'
  | 'beoordelingen'
  | 'startdata-locaties'
  | 'tarieven'
  | 'virtuele-training';

interface Tab {
  id: TabType;
  label: string;
}

const tabs: Tab[] = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'inleiding', label: 'Inleiding' },
  { id: 'modulen', label: 'Modulen' },
  { id: 'extra', label: 'Extra' },
  { id: 'beoordelingen', label: 'Beoordelingen' },
  { id: 'startdata-locaties', label: 'Startdata & Locaties' },
  { id: 'tarieven', label: 'Tarieven' },
  { id: 'virtuele-training', label: 'Virtuele training' },
];

interface CourseTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function CourseTabNavigation({ activeTab, onTabChange }: CourseTabNavigationProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'whitespace-nowrap py-4 px-4 border-b-4 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
