import { startOfMonth, endOfMonth, addMonths } from 'date-fns';
import { getSchedulesByDateRange } from '@/app/actions/schedules';
import Calendar from '@/components/Calendar';
import ScheduleList from '@/components/ScheduleList';

export const metadata = {
  title: 'Cursus Kalender | TechTrain',
  description: 'Bekijk alle aankomende IT-cursussen in een kalenderweergave'
};

export default async function CalendarPage() {
  // Fetch schedules for current and next 2 months
  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(addMonths(today, 2));

  const { schedules } = await getSchedulesByDateRange(startDate, endDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Cursus Kalender</h1>
          <p className="text-xl text-blue-100">
            Plan je IT-training en bekijk alle beschikbare data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Calendar schedules={schedules} />
          </div>

          {/* Upcoming Schedules Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Aankomende Cursussen
              </h2>
              <ScheduleList schedules={schedules.slice(0, 5)} showCourseTitle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
