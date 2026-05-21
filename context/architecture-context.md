# Architecture Context

## Stack

| Layer            | Technology               | Role                                                         |
| ---------------- | ------------------------ | ------------------------------------------------------------ |
| Framework        | Next.js 16 + TypeScript  | Full-stack application with server and client components     |
| UI               | Tailwind CSS + shadcn/ui | Component composition and design system implementation       |
| Authentication   | Clerk                    | User identity, session management, and route protection      |
| Database         | Prisma + PostgreSQL      | Persistent storage for users, habits, and completion records |
| State Management | React Server Components  | Server-first data loading and UI composition                 |
| Validation       | Zod                      | Input validation and schema enforcement                      |
| Date Utilities   | date-fns                 | Date calculations for streaks and calendar views             |
| Deployment       | Vercel                   | Hosting and serverless deployment                            |

---

## System Boundaries

- `app` — Application routes, layouts, pages, and server actions.
- `app/api` — Authenticated API handlers for mutations and data access.
- `components` — Reusable UI components such as habit cards, calendars, and dashboards.
- `lib` — Shared infrastructure including Prisma client, validation schemas, and utility functions.
- `lib/auth` — Authentication helpers and ownership checks.
- `lib/streaks` — Streak calculation logic for daily and weekly habits.
- `lib/calendar` — Data aggregation utilities for monthly views.
- `prisma` — Database schema and generated Prisma client.
- `types` — Shared TypeScript domain types and enums.

---

## Storage Model

- **PostgreSQL** stores all application data.
- **User records** are synchronized with authenticated identities.
- **Habit records** store user-defined habit configurations.
- **Habit completion records** store the status of each habit for a given date.
- Streak values are derived from completion records and frequency settings rather than treated as the primary source of truth.

### Primary Entities

#### User

- Authentication identity.
- Owns habits and all associated completion records.

#### Habit

- Belongs to one user.
- Stores:
  - Name
  - Description
  - Frequency Type (`daily`, `weekly`)
  - Weekly Target Count
  - Active Status
  - Created and updated timestamps

#### Habit Record

- Belongs to one habit.
- Stores:
  - Date
  - Status (`not_started`, `in_progress`, `completed`)

---

## Authentication and Authorization Model

- Only authenticated users can access protected application routes.
- Each habit is owned by a single user.
- Users can create, update, and delete only their own habits.
- All mutation endpoints must verify ownership before writing to the database.

---

## Tracking Model

### Daily Habits

- A habit is expected to be completed every calendar day.
- The streak increases when the habit is completed on consecutive days.
- Missing a day resets the streak.

### Weekly Habits

- A habit defines a weekly target count (for example, three times per week).
- The streak increases when the target count is met within a calendar week.
- Failing to meet the target resets the streak.

### Daily Check-In States

Each habit record can have one of three statuses:

1. `not_started`
2. `in_progress`
3. `completed`

---

## Calendar and Dashboard Model

### Dashboard

- Displays all active habits for the signed-in user.
- Shows today's status and current streak for each habit.
- Provides quick actions for updating progress.

### Monthly Calendar

- Aggregates completion records by month.
- Displays completion history and activity patterns.
- Supports viewing progress for individual habits.

---

## Business Logic Model

### Habit Creation

- Validates input with Zod.
- Persists habit metadata and frequency settings.
- Initializes with no completion records.

### Habit Check-In

- Creates or updates a habit record for the current date.
- Recalculates the current streak.

### Streak Calculation

- Reads completion history in chronological order.
- Applies daily or weekly rules based on habit frequency.
- Returns the current streak value as derived data.

---

## Invariants

1. Every habit belongs to exactly one authenticated user.
2. Users can never access or modify another user's habits.
3. A habit has at most one completion record per date.
4. Streaks are derived from completion history and frequency settings.
5. Weekly habits must have a valid target count greater than zero.
6. All dates are normalized consistently to avoid duplicate records.
7. Database state is the single source of truth for all habit and progress data.
8. Only active habits are shown in the default dashboard.
