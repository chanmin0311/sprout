export type HabitFrequencyType = "daily" | "weekly";

export type HabitStatus = "not_started" | "in_progress" | "completed";

export interface User {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  frequencyType: HabitFrequencyType;
  weeklyTargetCount: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  currentStreak: number;
  todayStatus: HabitStatus;
}

export interface HabitRecord {
  id: string;
  habitId: string;
  date: Date;
  status: HabitStatus;
}

export interface CalendarDay {
  date: Date;
  status: HabitStatus | null;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export interface WeeklyProgress {
  completed: number;
  target: number;
}

export interface DashboardSummary {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  totalCompletions: number;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
