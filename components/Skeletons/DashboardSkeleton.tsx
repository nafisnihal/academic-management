import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StatSkeleton from "./StatSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {/* Stat Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Leaderboard Skeleton */}
        <Card className="p-8 space-y-6">
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full col-span-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </Card>

        {/* Bar Chart Skeleton */}
        <Card className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <Skeleton className="h-48 w-full rounded-md" />
        </Card>
      </div>
    </div>
  );
}
