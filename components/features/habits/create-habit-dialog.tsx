"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { HabitForm } from "@/components/features/habits/habit-form";
import type { Habit, HabitFrequencyType } from "@/types";

interface CreateHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (habit: Partial<Habit>) => void;
}

export function CreateHabitDialog({ open, onOpenChange, onCreated }: CreateHabitDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: {
    name: string;
    description: string;
    frequencyType: HabitFrequencyType;
    weeklyTargetCount: number;
  }) {
    setLoading(true);
    try {
      // Placeholder — replaced by server action in data layer feature
      await new Promise((r) => setTimeout(r, 400));
      onCreated?.({ ...values });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New habit</DialogTitle>
          <DialogDescription>
            Start small — one habit at a time.
          </DialogDescription>
        </DialogHeader>
        <HabitForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Create habit"
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
