'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { courses } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2025-11-08', course: 'Advanced Cyber Security', status: 'completed', total: 1399 },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2025-11-07', course: 'Cloud Native with Docker', status: 'completed', total: 1399 },
  { id: 'ORD-003', customer: 'Mike Johnson', date: '2025-11-06', course: 'Data Science Fundamentals', status: 'pending', total: 899 },
  { id: 'ORD-004', customer: 'Sarah Williams', date: '2025-11-05', course: 'AWS Cloud Solutions', status: 'completed', total: 1299 },
  { id: 'ORD-005', customer: 'Tom Brown', date: '2025-11-04', course: 'Machine Learning with Python', status: 'cancelled', total: 1009 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'courses' | 'schedules' | 'orders' | 'users'>('courses');

  const stats = [
    { label: 'Totale Omzet', value: formatPrice(45200), icon: DollarSign, change: '+12%', trend: 'up' },
    { label: 'Nieuwe Inschrijvingen', value: '92', icon: TrendingUp, change: '+8%', trend: 'up' },
    { label: 'Totaal Cursussen', value: courses.length.toString(), icon: BookOpen, change: '+2', trend: 'up' },
    { label: 'Actieve Studenten', value: '324', icon: Users, change: '+15%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="text-secondary-600 mt-1">Beheer je cursussen, schema's en bestellingen</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Categorie</h2>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'courses'
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-secondary-100'
                  }`}
                >
                  Cursussen
                </button>
                <button
                  onClick={() => setActiveTab('schedules')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'schedules'
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-secondary-100'
                  }`}
                >
                  Schema's
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-secondary-100'
                  }`}
                >
                  Bestellingen
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'users'
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-secondary-100'
                  }`}
                >
                  Gebruikers
                </button>
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === 'courses' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Cursussen Beheren</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nieuwe Cursus Toevoegen
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-sm">Cursus</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Categorie</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Format</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Prijs</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.slice(0, 6).map((course) => (
                        <tr key={course.id} className="border-b hover:bg-secondary-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={course.imageUrl}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-sm">{course.title}</div>
                                <div className="text-xs text-secondary-600">{course.duration}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{course.category}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 capitalize">
                              {course.format}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">{formatPrice(course.price)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {activeTab === 'orders' && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Recente Bestellingen</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-sm">Bestelnummer</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Klant</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Datum</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Cursus</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Totaal</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-secondary-50">
                          <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                          <td className="py-3 px-4 text-sm">{order.customer}</td>
                          <td className="py-3 px-4 text-sm">{order.date}</td>
                          <td className="py-3 px-4 text-sm">{order.course}</td>
                          <td className="py-3 px-4 text-sm font-medium">{formatPrice(order.total)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {(activeTab === 'schedules' || activeTab === 'users') && (
              <Card className="p-12 text-center">
                <h2 className="text-xl font-bold text-secondary-900 mb-2">
                  {activeTab === 'schedules' ? 'Cursusschema\'s' : 'Gebruikersbeheer'}
                </h2>
                <p className="text-secondary-600">
                  Deze sectie wordt beschikbaar in de volgende ontwikkelingsfase.
                </p>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
