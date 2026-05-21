'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarCell } from '@/components/features/calendar/calendar-cell';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CalendarDay } from '@/types';

interface HabitCalendarProps {
  calendarDays: CalendarDay[];
  year: number;
  month: number;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  className?: string;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function HabitCalendar({
  calendarDays,
  year,
  month,
  onPrevMonth,
  onNextMonth,
  className,
}: HabitCalendarProps) {
  const completedCount = calendarDays.filter(
    (d) => d.isCurrentMonth && d.status === 'completed',
  ).length;

  const currentMonthDays = calendarDays.filter((d) => d.isCurrentMonth).length;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            {MONTHS[month]} {year}
          </h3>
          <Badge variant="muted" className="text-xs">
            {completedCount} / {currentMonthDays}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="size-8"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            aria-label="Next month"
            className="size-8"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day labels */}
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="aspect-square flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {/* Cells */}
        {calendarDays.map((day, i) => (
          <CalendarCell
            key={i}
            day={day.isCurrentMonth ? day.date.getDate() : null}
            status={day.status}
            isToday={day.isToday}
            isCurrentMonth={day.isCurrentMonth}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded bg-success" />
          Completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded bg-accent" />
          In progress
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded bg-muted" />
          Not started
        </span>
      </div>
    </div>
  );
}

export function HabitCalendarSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-36 rounded-lg bg-muted animate-pulse" />
        <div className="h-8 w-20 rounded-xl bg-muted animate-pulse" />
      </div>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse opacity-50" />
        ))}
      </div>
    </div>
  );
}
