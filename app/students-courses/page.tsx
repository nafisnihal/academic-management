import CourseTable from "@/components/courses/CourseTable";
import StudentTable from "@/components/students/StudentTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="pt-9">
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="px-2">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <Card className="p-4">
            <StudentTable />
          </Card>
        </TabsContent>
        <TabsContent value="courses">
          <Card className="p-4">
            <CourseTable />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
