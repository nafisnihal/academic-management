import CourseStat from "@/components/reports/CourseStat";
import TopPerformersTable from "@/components/reports/TopPerformersTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="pt-9">
      <Tabs defaultValue="course" className="w-full">
        <TabsList className="px-2">
          <TabsTrigger value="course">Course Enrollment</TabsTrigger>
          <TabsTrigger value="student">Student Report</TabsTrigger>
        </TabsList>
        <TabsContent value="course">
          <CourseStat />
        </TabsContent>
        <TabsContent value="student">
          <TopPerformersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
