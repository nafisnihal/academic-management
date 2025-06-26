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
import { useCourseEnrollments } from "@/hooks/useReports";
import { DownloadIcon } from "lucide-react";
import Papa from "papaparse";
import { Button } from "../ui/button";

interface CourseStat {
  courseName: string;
  month: number;
  year: number;
  count: number;
}

export default function CourseStat() {
  const { data, isLoading, error } = useCourseEnrollments();

  const handleDownloadCSV = () => {
    if (!data || data.length === 0) return;

    const csv = Papa.unparse(data, {
      columns: ["courseName", "month", "year", "count"],
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "course_enrollments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <div>Loading enrollment data...</div>;
  if (error instanceof Error) return <div>Failed to load enrollment data.</div>;

  return (
    <Card className="">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Course Enrollments Over Time</CardTitle>
        <Button onClick={handleDownloadCSV} size="sm" className="gap-2">
          <DownloadIcon className="h-4 w-4" />
          Download CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Enrollments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((stat: CourseStat, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{stat.courseName}</TableCell>
                  <TableCell>{stat.month}</TableCell>
                  <TableCell>{stat.year}</TableCell>
                  <TableCell>{stat.count}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No enrollment data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
