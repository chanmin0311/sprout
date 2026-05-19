"use client";

import { Circle, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HabitStatus } from "@/types";

interface CheckInControlProps {
  status: HabitStatus;
  onStatusChange?: (status: HabitStatus) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

const STATUS_CYCLE: HabitStatus[] = ["not_started", "in_progress", "completed"];

function nextStatus(current: HabitStatus): HabitStatus {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

const statusConfig = {
  not_started: {
    icon: Circle,
    label: "Not started",
    className: "text-muted-foreground hover:text-foreground",
    ariaLabel: "Mark as in progress",
  },
  in_progress: {
    icon: Clock,
    label: "In progress",
    className: "text-accent-foreground",
    ariaLabel: "Mark as completed",
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    className: "text-success animate-check-pop",
    ariaLabel: "Reset to not started",
  },
};

export function CheckInControl({
  status,
  onStatusChange,
  disabled,
  size = "md",
}: CheckInControlProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onStatusChange?.(nextStatus(status))}
      disabled={disabled}
      aria-label={config.ariaLabel}
      className={cn(
        "flex items-center gap-2 rounded-xl font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "text-sm" : "text-base",
        config.className
      )}
    >
      <Icon
        className={cn(
          "shrink-0",
          size === "sm" ? "size-5" : "size-6",
          status === "completed" && "fill-success text-success"
        )}
      />
      <span className="sr-only">{config.label}</span>
    </button>
  );
}
