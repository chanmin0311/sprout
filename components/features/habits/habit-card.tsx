'use client';

import Link from 'next/link';
import { Flame, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckInControl } from '@/components/features/habits/check-in-control';
import { WeeklyProgress } from '@/components/features/habits/weekly-progress';
import { cn } from '@/lib/utils';
import type { Habit, HabitStatus, WeeklyProgress as WeeklyProgressType } from '@/types';

interface HabitCardProps {
  habit: Habit;
  weeklyProgress?: WeeklyProgressType;
  onStatusChange?: (habitId: string, status: HabitStatus) => void;
  onEdit?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
}

const frequencyLabel = (habit: Habit) => {
  if (habit.frequencyType === 'daily') return 'Daily';
  return `${habit.weeklyTargetCount}× per week`;
};

const statusBorder = {
  not_started: 'border-border',
  in_progress: 'border-accent',
  completed: 'border-success',
};

export function HabitCard({
  habit,
  weeklyProgress,
  onStatusChange,
  onEdit,
  onDelete,
}: HabitCardProps) {
  return (
    <Card
      className={cn('transition-all duration-200 hover:shadow-md', statusBorder[habit.todayStatus])}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Check-in */}
          <div className="mt-0.5">
            <CheckInControl
              status={habit.todayStatus}
              onStatusChange={(s) => onStatusChange?.(habit.id, s)}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  href={`/habits/${habit.id}`}
                  className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                >
                  {habit.name}
                </Link>
                {habit.description && (
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {habit.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(habit)}
                    aria-label="Edit habit"
                    className="size-8"
                  >
                    <Edit className="size-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(habit.id)}
                    aria-label="Delete habit"
                    className="size-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <Badge variant="muted">{frequencyLabel(habit)}</Badge>

              {habit.currentStreak > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-warning">
                  <Flame className="size-3.5 fill-warning" />
                  {habit.currentStreak}
                </span>
              )}

              {habit.todayStatus === 'completed' && <Badge variant="success">Done today</Badge>}
              {habit.todayStatus === 'in_progress' && <Badge variant="warning">In progress</Badge>}
            </div>

            {/* Weekly progress for weekly habits */}
            {habit.frequencyType === 'weekly' && weeklyProgress && (
              <div className="mt-3">
                <WeeklyProgress progress={weeklyProgress} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* Skeleton variant */
export function HabitCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 size-6 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 rounded-lg bg-muted animate-pulse" />
            <div className="h-3 w-64 rounded-lg bg-muted animate-pulse" />
            <div className="flex gap-2 mt-3">
              <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
              <div className="h-5 w-12 rounded-full bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
