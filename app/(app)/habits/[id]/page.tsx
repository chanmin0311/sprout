"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Flame, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckInControl } from "@/components/features/habits/check-in-control";
import { WeeklyProgress } from "@/components/features/habits/weekly-progress";
import { HabitCalendar } from "@/components/features/calendar/habit-calendar";
import type { Habit, HabitStatus, CalendarDay } from "@/types";

// Placeholder data — replaced by server fetch in data layer feature
const MOCK_HABIT: Habit = {
  id: "1",
  userId: "user_1",
  name: "Morning walk",
  description: "15 minutes outside before coffee. Rain or shine.",
  frequencyType: "daily",
  weeklyTargetCount: null,
  isActive: true,
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
  currentStreak: 7,
  todayStatus: "completed",
};

function buildCalendar(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push({ date: new Date(year, month, -firstDay + i + 1), status: null, isToday: false, isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isToday = date.toDateString() === today.toDateString();
    const isPast = date < today && !isToday;
    days.push({ date, status: isPast ? "completed" : isToday ? "completed" : null, isToday, isCurrentMonth: true });
  }
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1].date;
    const next = new Date(last); next.setDate(last.getDate() + 1);
    days.push({ date: next, status: null, isToday: false, isCurrentMonth: false });
  }
  return days;
}

export default function HabitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [habit, setHabit] = useState<Habit>(MOCK_HABIT);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const calendarDays = buildCalendar(year, month);

  function prevMonth() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); } else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); } else setMonth((m) => m + 1);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back */}
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard">
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{habit.name}</h1>
          {habit.description && (
            <p className="text-muted-foreground">{habit.description}</p>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="muted">
              {habit.frequencyType === "daily"
                ? "Daily"
                : `${habit.weeklyTargetCount}× per week`}
            </Badge>
            {habit.currentStreak > 0 && (
              <span className="flex items-center gap-1 text-sm font-medium text-warning">
                <Flame className="size-4 fill-warning" />
                {habit.currentStreak} day streak
              </span>
            )}
          </div>
        </div>

        {/* Today's check-in */}
        <div className="flex flex-col items-center gap-1.5">
          <CheckInControl
            status={habit.todayStatus}
            onStatusChange={(s) => setHabit((h) => ({ ...h, todayStatus: s }))}
            size="md"
          />
          <span className="text-xs text-muted-foreground">Today</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Current streak" value={`${habit.currentStreak} days`} />
        <StatCard label="Started" value={habit.createdAt.toLocaleDateString()} />
        <StatCard
          label="Today's status"
          value={
            habit.todayStatus === "completed"
              ? "Done"
              : habit.todayStatus === "in_progress"
              ? "In progress"
              : "Not started"
          }
        />
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HabitCalendar
            calendarDays={calendarDays}
            year={year}
            month={month}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-lg font-semibold text-foreground mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}
