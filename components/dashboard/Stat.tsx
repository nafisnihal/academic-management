import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export default function Stat({ label, value, icon: Icon }: StatProps) {
  return (
    <Card className="p-4 shadow-sm border rounded-xl">
      <CardContent className="flex items-center gap-4">
        <div className="p-2 rounded-md bg-muted text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
