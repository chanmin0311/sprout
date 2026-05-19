"use client";

import { useState } from "react";
import { Flame, CheckCircle2, Sprout, TrendingUp } from "lucide-react";
import { SummaryCard } from "@/components/features/dashboard/summary-card";
import { HabitList } from "@/components/features/habits/habit-list";
import type { Habit, HabitStatus, WeeklyProgress } from "@/types";

// Placeholder data — replaced by server data in data layer feature
const MOCK_HABITS: Habit[] = [
  {
    id: "1",
    userId: "user_1",
    name: "Morning walk",
    description: "15 minutes outside before coffee.",
    frequencyType: "daily",
    weeklyTargetCount: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    currentStreak: 7,
    todayStatus: "completed",
  },
  {
    id: "2",
    userId: "user_1",
    name: "Read for 20 minutes",
    description: "Any book — fiction counts.",
    frequencyType: "daily",
    weeklyTargetCount: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    currentStreak: 3,
    todayStatus: "not_started",
  },
  {
    id: "3",
    userId: "user_1",
    name: "Strength training",
    description: null,
    frequencyType: "weekly",
    weeklyTargetCount: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    currentStreak: 4,
    todayStatus: "in_progress",
  },
];

const MOCK_WEEKLY: Record<string, WeeklyProgress> = {
  "3": { completed: 2, target: 3 },
};

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);

  const completedToday = habits.filter((h) => h.todayStatus === "completed").length;
  const longestStreak = Math.max(...habits.map((h) => h.currentStreak), 0);

  function handleStatusChange(habitId: string, status: HabitStatus) {
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, todayStatus: status } : h))
    );
  }

  const greeting = getGreeting();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">{greeting}</p>
        <h1 className="text-3xl font-bold text-foreground">Your habits</h1>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total habits"
          value={habits.length}
          icon={Sprout}
        />
        <SummaryCard
          label="Done today"
          value={`${completedToday} / ${habits.length}`}
          icon={CheckCircle2}
        />
        <SummaryCard
          label="Longest streak"
          value={longestStreak}
          icon={Flame}
        />
        <SummaryCard
          label="This week"
          value={completedToday}
          icon={TrendingUp}
          trend="completions"
        />
      </div>

      {/* Habit list */}
      <HabitList
        habits={habits}
        weeklyProgressMap={MOCK_WEEKLY}
        onStatusChange={handleStatusChange}
        onCreated={(h) =>
          setHabits((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              userId: "user_1",
              name: h.name ?? "",
              description: h.description ?? null,
              frequencyType: h.frequencyType ?? "daily",
              weeklyTargetCount: h.weeklyTargetCount ?? null,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              currentStreak: 0,
              todayStatus: "not_started",
            },
          ])
        }
        onUpdated={(id, updates) =>
          setHabits((prev) =>
            prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
          )
        }
        onDeleted={(id) => setHabits((prev) => prev.filter((h) => h.id !== id))}
      />
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
