// src/components/dashboard/OverviewCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type OverviewCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
};

const UserOverviewCard = ({
  title,
  value,
  icon,
  className,
}: OverviewCardProps) => {
  return (
    <Card className={cn("rounded-2xl shadow-md p-4 flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default UserOverviewCard;
