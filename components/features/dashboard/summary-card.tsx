import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: string;
  className?: string;
}

export function SummaryCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  trend,
  className,
}: SummaryCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground font-medium">{label}</span>
            <span className="text-3xl font-bold text-foreground leading-none">{value}</span>
            {trend && (
              <span className="text-xs text-muted-foreground mt-1">{trend}</span>
            )}
          </div>
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary",
              iconClassName
            )}
          >
            <Icon className="size-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="size-10 rounded-2xl" />
        </div>
      </CardContent>
    </Card>
  );
}
