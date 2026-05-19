import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreate?: () => void;
}

export function HabitEmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-3xl bg-secondary">
        <Sprout className="size-8 text-primary" />
      </div>
      <div className="max-w-xs space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Start with one small habit</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Consistency builds over time. Pick one thing you want to do regularly and track it here.
        </p>
      </div>
      {onCreate && (
        <Button onClick={onCreate} size="md">
          <Sprout className="size-4" />
          Add your first habit
        </Button>
      )}
    </div>
  );
}
