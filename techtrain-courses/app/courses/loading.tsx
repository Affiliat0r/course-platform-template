import Card from '@/components/ui/Card';

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-10 w-64 bg-secondary-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 w-96 bg-secondary-200 rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Skeleton */}
          <aside className="w-full md:w-64">
            <Card className="p-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-5 w-32 bg-secondary-200 rounded animate-pulse mb-3"></div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-4 bg-secondary-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* Course Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-secondary-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-secondary-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-secondary-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-secondary-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
