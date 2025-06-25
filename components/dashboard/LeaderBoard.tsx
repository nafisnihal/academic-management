import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";

interface LeaderBoardProps {
  data: {
    _id: string;
    name: string;
    email: string;
    gpa: number;
  }[];
}

export default function LeaderBoard({ data }: LeaderBoardProps) {
  return (
    <Card className="p-6 shadow-md border rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        <Trophy />
        <h2 className="text-xl font-semibold">Top Students by GPA</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">GPA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((student, idx) => (
            <TableRow key={student._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>
                <div className="font-semibold">{student.name}</div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {student.email}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary" className="text-sm px-2 py-1">
                  {student.gpa}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
