import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

export default function DashboardLoading() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Heading area */}
      <div>
        <div className="h-8 sm:h-9 w-64 animate-pulse bg-muted rounded-md" />
        <div className="h-4 sm:h-5 w-96 max-w-full animate-pulse bg-muted rounded-md mt-2" />
      </div>

      {/* Getting Started card */}
      <Card>
        <CardHeader>
          <div className="h-5 w-40 animate-pulse bg-muted rounded-md" />
          <div className="h-4 w-72 animate-pulse bg-muted rounded-md mt-1" />
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full animate-pulse bg-muted rounded-full mb-4" />
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-8 w-8 animate-pulse bg-muted rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-28 animate-pulse bg-muted rounded-md" />
                  <div className="h-3 w-20 animate-pulse bg-muted rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid - 4 columns */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse bg-muted rounded-md" />
              <div className="h-4 w-4 animate-pulse bg-muted rounded-md" />
            </CardHeader>
            <CardContent>
              <div className="h-7 sm:h-8 w-16 animate-pulse bg-muted rounded-md" />
              <div className="h-3 w-36 animate-pulse bg-muted rounded-md mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upgrade Banner */}
      <div className="h-16 w-full animate-pulse bg-muted rounded-lg" />

      {/* Quick Actions Panel */}
      <Card>
        <CardHeader>
          <div className="h-5 w-32 animate-pulse bg-muted rounded-md" />
          <div className="h-4 w-56 animate-pulse bg-muted rounded-md mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse bg-muted rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Status & Pending Actions - 2 columns */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Integration Status */}
        <Card>
          <CardHeader>
            <div className="h-5 w-36 animate-pulse bg-muted rounded-md" />
            <div className="h-4 w-48 animate-pulse bg-muted rounded-md mt-1" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
                  <div className="h-4 w-24 animate-pulse bg-muted rounded-md" />
                </div>
                <div className="h-6 w-20 animate-pulse bg-muted rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <div className="h-5 w-36 animate-pulse bg-muted rounded-md" />
            <div className="h-4 w-44 animate-pulse bg-muted rounded-md mt-1" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-5 w-5 animate-pulse bg-muted rounded-full shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 w-40 animate-pulse bg-muted rounded-md" />
                  <div className="h-3 w-28 animate-pulse bg-muted rounded-md" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="h-5 w-32 animate-pulse bg-muted rounded-md" />
          <div className="h-4 w-64 animate-pulse bg-muted rounded-md mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 animate-pulse bg-muted rounded-full" />
                  <div>
                    <div className="h-4 w-36 animate-pulse bg-muted rounded-md" />
                    <div className="h-3 w-20 animate-pulse bg-muted rounded-md mt-1" />
                  </div>
                </div>
                <div className="h-3 w-12 animate-pulse bg-muted rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
