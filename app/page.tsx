"use client";

import BarChart from "@/components/dashboard/BarChart";
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import LeaderBoard from "@/components/dashboard/LeaderBoard";
import Stat from "@/components/dashboard/Stat";
import { Card } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";
import { BookOpen, BookUser, ChartBarIncreasing, Users } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total Students" value={data.totalStudents} icon={Users} />
        <Stat label="Total Courses" value={data.totalCourses} icon={BookOpen} />
        <Stat
          label="Total Faculty"
          value={data.totalFaculties}
          icon={BookUser}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LeaderBoard data={data?.topStudents} />
        <Card className="p-8 shadow">
          <div className="flex items-center gap-4 mb-4">
            <ChartBarIncreasing />
            <h2 className="text-lg font-semibold">Most Popular Courses</h2>
          </div>
          <BarChart data={data.courseEnrollments} />
        </Card>
      </div>
    </div>
  );
}
