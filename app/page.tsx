import AddCourseForm from "@/components/courses/AddCourseForm";
import CourseList from "@/components/courses/CourseList";
import FacultyPanel from "@/components/faculty/FacultyPanel";
import AddStudentForm from "@/components/students/AddStudentForm";
import StudentList from "@/components/students/StudentList";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        <h1 className="text-2xl font-bold">Students</h1>
        <StudentList />
        <AddStudentForm />
        <h1 className="text-2xl font-bold">Courses</h1>
        <CourseList />
        <AddCourseForm />
        <h1 className="text-2xl font-bold">Faculty Panel</h1>
        <FacultyPanel />
      </div>
    </>
  );
}
