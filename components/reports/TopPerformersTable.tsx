"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTopPerformers } from "@/hooks/useReports";
import { DownloadIcon } from "lucide-react";
import Papa from "papaparse";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

// Define TypeScript interface for performer
interface Performer {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  grade: number;
}

export default function TopPerformersTable() {
  const {
    data,
    isLoading,
    error,
  }: {
    data: Performer[] | undefined;
    isLoading: boolean;
    error: unknown;
  } = useTopPerformers();

  const handleDownload = () => {
    if (!data || data.length === 0) return;

    const csv = Papa.unparse(
      data.map(({ courseName, studentName, grade }) => ({
        Course: courseName,
        Student: studentName,
        Grade: grade,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "top_performers.csv";
    link.click();
  };

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (error instanceof Error) return <div>Failed to load top performers</div>;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Top Performing Students by Course</CardTitle>
        <Button onClick={handleDownload} size="sm" className="gap-2">
          <DownloadIcon className="h-4 w-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item: Performer, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{item.courseName}</TableCell>
                  <TableCell>{item.studentName}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
