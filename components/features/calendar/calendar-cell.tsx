import { cn } from '@/lib/utils';
import type { HabitStatus } from '@/types';

interface CalendarCellProps {
  day: number | null;
  status: HabitStatus | null;
  isToday: boolean;
  isCurrentMonth: boolean;
}

const statusStyle: Record<NonNullable<HabitStatus>, string> = {
  completed: 'bg-success text-primary-foreground font-semibold',
  in_progress: 'bg-accent text-accent-foreground',
  not_started: 'bg-muted/60 text-muted-foreground',
};

export function CalendarCell({ day, status, isToday, isCurrentMonth }: CalendarCellProps) {
  if (!day) {
    return <div className="aspect-square" />;
  }

  return (
    <div
      className={cn(
        'aspect-square flex items-center justify-center rounded-lg text-xs transition-colors duration-150',
        !isCurrentMonth && 'opacity-30',
        status ? statusStyle[status] : 'text-muted-foreground',
        isToday && 'ring-2 ring-primary ring-offset-1 ring-offset-background font-semibold',
      )}
      aria-label={`Day ${day}${status ? `: ${status.replace('_', ' ')}` : ''}${isToday ? ' (today)' : ''}`}
    >
      {day}
    </div>
  );
}
