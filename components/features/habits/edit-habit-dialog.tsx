"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HabitForm } from "@/components/features/habits/habit-form";
import type { Habit, HabitFrequencyType } from "@/types";

interface EditHabitDialogProps {
  habit: Habit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: (habitId: string, values: Partial<Habit>) => void;
  onDeleted?: (habitId: string) => void;
}

export function EditHabitDialog({
  habit,
  open,
  onOpenChange,
  onUpdated,
  onDeleted,
}: EditHabitDialogProps) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSubmit(values: {
    name: string;
    description: string;
    frequencyType: HabitFrequencyType;
    weeklyTargetCount: number;
  }) {
    if (!habit) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      onUpdated?.(habit.id, values);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!habit) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      onDeleted?.(habit.id);
      onOpenChange(false);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  function handleOpenChange(val: boolean) {
    setConfirmDelete(false);
    onOpenChange(val);
  }

  if (!habit) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit habit</DialogTitle>
          <DialogDescription>Update your habit details.</DialogDescription>
        </DialogHeader>

        <HabitForm
          defaultValues={{
            name: habit.name,
            description: habit.description ?? "",
            frequencyType: habit.frequencyType,
            weeklyTargetCount: habit.weeklyTargetCount ?? 3,
          }}
          onSubmit={handleSubmit}
          onCancel={() => handleOpenChange(false)}
          submitLabel="Save changes"
          loading={loading}
        />

        <div className="mt-4 pt-4 border-t border-border">
          {confirmDelete ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-destructive font-medium">
                Delete &quot;{habit.name}&quot;? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  loading={deleting}
                >
                  Yes, delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmDelete(false)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Delete habit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
