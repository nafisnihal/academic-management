import AddStudentForm from "@/components/students/AddStudentForm";
import StudentList from "@/components/students/StudentList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <StudentList />
      <AddStudentForm />
    </div>
  );
}
