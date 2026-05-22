import { cn } from '@/lib/utils';
import type { WeeklyProgress as WeeklyProgressType } from '@/types';

interface WeeklyProgressProps {
  progress: WeeklyProgressType;
  className?: string;
}

export function WeeklyProgress({ progress, className }: WeeklyProgressProps) {
  const { completed, target } = progress;
  const pct = Math.min(100, Math.round((completed / target) * 100));
  const done = completed >= target;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">This week</span>
        <span className={cn('font-medium', done ? 'text-success' : 'text-foreground')}>
          {completed} / {target}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            done ? 'bg-success' : 'bg-primary',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
