# Sprout

## Overview

Sprout is a personal habit tracking web application that helps users build consistency through simple daily check-ins and progress visualization. Users can create habits they want to maintain, mark their completion status each day, and review streaks and monthly activity patterns.

The core purpose of Sprout is to make habit formation visible and motivating by showing how consistently each habit is maintained over time.

---

## Goals

1. Allow authenticated users to create and manage their own habits.
2. Track daily or weekly habit completion.
3. Automatically calculate streaks based on each habit's frequency.
4. Visualize progress through calendars and summary views.
5. Provide a simple and motivating experience focused on consistency.

---

## Core User Flow

1. User signs in.
2. User creates one or more habits.
3. User chooses a tracking frequency (`Daily` or `Weekly N Times`).
4. User checks off habit progress each day.
5. The system updates completion records and recalculates streaks.
6. User reviews progress in the dashboard and monthly calendar.

---

## Features

### Authentication

- User sign-in and route protection.
- Users can access and manage only their own habits and records.

### Habit Management

- Create, edit, and delete habits.
- Configure habit name, description, and tracking frequency.
- Supported frequency types:
    - Daily
    - Weekly N Times

### Daily Check-In

- Mark today's progress for each habit.
- Each habit has three possible states:
    - Not Started
    - In Progress
    - Completed

### Streak Tracking

- Automatically calculate streaks based on the habit frequency.
- Daily habits increase streaks when completed every day.
- Weekly habits increase streaks when the target count is achieved within a calendar week.

### Monthly Calendar

- Display habit completion history by month.
- Visualize:
    - Daily completion status
    - Current streak
    - Habit activity patterns

### Dashboard

- Show all active habits.
- Display today's progress and current streaks.
- Provide quick access to habit check-ins.

---

## Scope

### In Scope

- Authentication and route protection
- Habit creation, editing, and deletion
- Daily and weekly habit frequency tracking
- Daily completion check-ins
- Automatic streak calculation
- Monthly calendar visualization
- Dashboard summaries
- Persistent storage of habits and completion records

### Out of Scope

- Social sharing and community features
- Habit recommendations powered by AI
- Notifications and reminder systems
- Gamification systems (points, badges, levels)
- Native mobile applications
- Subscription and billing systems

---

## Data Model Summary

### User

Represents an authenticated account.

### Habit

Represents a trackable habit owned by a user.

**Key Fields**

- Name
- Description
- Frequency Type (`daily`, `weekly`)
- Weekly Target Count
- Active Status

### Habit Record

Represents a habit's completion state for a specific date.

**Key Fields**

- Date
- Status (`not_started`, `in_progress`, `completed`)

### Streak

Derived data calculated from habit records and frequency settings.

---

## Success Criteria

1. A signed-in user can create, edit, and delete habits.
2. Users can track habits with daily or weekly frequency rules.
3. Users can update today's habit status.
4. The application correctly calculates streaks for all supported frequencies.
5. Users can review progress in a monthly calendar view.
6. Habit and completion data are persisted between sessions.
7. The interface remains simple enough for users to complete daily check-ins within a few seconds.
