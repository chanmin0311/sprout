'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HabitCard, HabitCardSkeleton } from '@/components/features/habits/habit-card';
import { HabitEmptyState } from '@/components/features/habits/empty-state';
import { CreateHabitDialog } from '@/components/features/habits/create-habit-dialog';
import { EditHabitDialog } from '@/components/features/habits/edit-habit-dialog';
import type { Habit, HabitStatus, WeeklyProgress } from '@/types';

interface HabitListProps {
  habits: Habit[];
  weeklyProgressMap?: Record<string, WeeklyProgress>;
  loading?: boolean;
  onStatusChange?: (habitId: string, status: HabitStatus) => void;
  onCreated?: (habit: Partial<Habit>) => void;
  onUpdated?: (habitId: string, values: Partial<Habit>) => void;
  onDeleted?: (habitId: string) => void;
}

export function HabitList({
  habits,
  weeklyProgressMap = {},
  loading,
  onStatusChange,
  onCreated,
  onUpdated,
  onDeleted,
}: HabitListProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <HabitCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your habits</h2>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" />
          Add habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <HabitEmptyState onCreate={() => setCreateOpen(true)} />
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              weeklyProgress={weeklyProgressMap[habit.id]}
              onStatusChange={onStatusChange}
              onEdit={(h) => setEditingHabit(h)}
              onDelete={onDeleted}
            />
          ))}
        </div>
      )}

      <CreateHabitDialog open={createOpen} onOpenChange={setCreateOpen} onCreated={onCreated} />

      <EditHabitDialog
        habit={editingHabit}
        open={!!editingHabit}
        onOpenChange={(open) => {
          if (!open) setEditingHabit(null);
        }}
        onUpdated={onUpdated}
        onDeleted={onDeleted}
      />
    </div>
  );
}
