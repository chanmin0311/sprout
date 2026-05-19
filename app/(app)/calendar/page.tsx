"use client";

import { useState } from "react";
import { HabitCalendar } from "@/components/features/calendar/habit-calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalendarDay, HabitStatus } from "@/types";

function buildMockCalendar(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  // Pad start
  for (let i = 0; i < firstDay; i++) {
    const d = new Date(year, month, -firstDay + i + 1);
    days.push({ date: d, status: null, isToday: false, isCurrentMonth: false });
  }

  // Current month
  const statuses: HabitStatus[] = ["completed", "completed", "not_started", "in_progress", "completed"];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    const isPast = date < today && !isToday;
    days.push({
      date,
      status: isPast ? statuses[d % statuses.length] : isToday ? "completed" : null,
      isToday,
      isCurrentMonth: true,
    });
  }

  // Pad end
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    days.push({ date: next, status: null, isToday: false, isCurrentMonth: false });
  }

  return days;
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const calendarDays = buildMockCalendar(year, month);

  function prevMonth() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground mt-1">Your habit history at a glance.</p>
      </div>

      <Card>
        <CardContent className="p-6">
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
