import { Card, CardContent } from "@/components/ui/card";

// Add proper TypeScript interfaces
interface SummaryCardProps {
  title: string;
  value: number | undefined;
  subtitle: string;
  icon: string;
  isCurrency?: boolean;
}

export function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  isCurrency = false,
}: SummaryCardProps) {
  const displayValue = value !== undefined ? value : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              {isCurrency
                ? `৳${displayValue.toLocaleString()}`
                : displayValue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}
