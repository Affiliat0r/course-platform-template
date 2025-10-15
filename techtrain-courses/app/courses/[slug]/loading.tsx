import Card from '@/components/ui/Card';

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Skeleton */}
      <section className="relative bg-secondary-300 h-96 flex items-center animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="h-12 w-3/4 bg-secondary-400 rounded mb-4"></div>
          <div className="h-6 w-1/2 bg-secondary-400 rounded mb-6"></div>
          <div className="h-12 w-40 bg-secondary-400 rounded"></div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-8 w-48 bg-secondary-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-secondary-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-secondary-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-secondary-200 rounded animate-pulse w-3/4"></div>
                </div>
              </Card>
            ))}
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="h-7 w-3/4 bg-secondary-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-secondary-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-24 bg-secondary-200 rounded animate-pulse mt-6"></div>
              <div className="h-12 bg-secondary-200 rounded animate-pulse mt-4"></div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
