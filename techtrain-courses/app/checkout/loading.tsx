import Card from '@/components/ui/Card';

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-48 bg-secondary-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 w-96 bg-secondary-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Skeleton */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="h-6 w-32 bg-secondary-200 rounded animate-pulse mb-4"></div>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-secondary-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 bg-secondary-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="h-6 w-32 bg-secondary-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-secondary-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-secondary-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="h-12 bg-secondary-200 rounded animate-pulse mt-6"></div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
