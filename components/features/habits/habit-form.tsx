"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Habit, HabitFrequencyType } from "@/types";

interface HabitFormValues {
  name: string;
  description: string;
  frequencyType: HabitFrequencyType;
  weeklyTargetCount: number;
}

interface HabitFormProps {
  defaultValues?: Partial<HabitFormValues>;
  onSubmit: (values: HabitFormValues) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export function HabitForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  loading,
}: HabitFormProps) {
  const [values, setValues] = useState<HabitFormValues>({
    name: defaultValues?.name ?? "",
    description: defaultValues?.description ?? "",
    frequencyType: defaultValues?.frequencyType ?? "daily",
    weeklyTargetCount: defaultValues?.weeklyTargetCount ?? 3,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof HabitFormValues, string>>>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Habit name is required.";
    if (values.frequencyType === "weekly") {
      if (values.weeklyTargetCount < 1 || values.weeklyTargetCount > 7) {
        next.weeklyTargetCount = "Must be between 1 and 7.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormField label="Habit name" htmlFor="habit-name" error={errors.name} required>
        <Input
          id="habit-name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="e.g. Morning walk"
          error={!!errors.name}
          maxLength={100}
          autoFocus
        />
      </FormField>

      <FormField
        label="Description"
        htmlFor="habit-description"
        helper="Optional — add context or a reminder."
      >
        <Textarea
          id="habit-description"
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          placeholder="Why does this habit matter to you?"
          rows={3}
          maxLength={300}
        />
      </FormField>

      <FormField label="Frequency" htmlFor="habit-frequency">
        <Select
          value={values.frequencyType}
          onValueChange={(val) =>
            setValues((v) => ({ ...v, frequencyType: val as HabitFrequencyType }))
          }
        >
          <SelectTrigger id="habit-frequency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly (custom count)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      {values.frequencyType === "weekly" && (
        <FormField
          label="Times per week"
          htmlFor="habit-target"
          error={errors.weeklyTargetCount}
          helper="How many times per week do you want to do this?"
        >
          <Input
            id="habit-target"
            type="number"
            min={1}
            max={7}
            value={values.weeklyTargetCount}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                weeklyTargetCount: parseInt(e.target.value, 10) || 1,
              }))
            }
            error={!!errors.weeklyTargetCount}
          />
        </FormField>
      )}

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
