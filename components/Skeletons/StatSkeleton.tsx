import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatSkeleton() {
  return (
    <Card className="p-4 shadow-sm border rounded-xl">
      <CardContent className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-6 w-16" /> {/* Value */}
        </div>
      </CardContent>
    </Card>
  );
}
