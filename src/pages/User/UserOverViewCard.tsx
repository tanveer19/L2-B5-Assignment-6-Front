// src/components/dashboard/OverviewCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type UserOverviewCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
};

const UserOverviewCard = ({
  title,
  children,
  className,
}: UserOverviewCardProps) => {
  return (
    <Card className={cn("rounded-2xl shadow-md p-4 flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default UserOverviewCard;
