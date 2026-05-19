# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 02: Authentication — Complete

## Current Goal

- Feature 03: Data Layer (database, server actions, replace mock data)

## Completed

- **Feature 01: Design System**
  - Installed UI dependencies: lucide-react, clsx, tailwind-merge, class-variance-authority, @radix-ui/react-dialog, @radix-ui/react-label, @radix-ui/react-slot, @radix-ui/react-select, @radix-ui/react-dropdown-menu, @radix-ui/react-separator
  - `app/globals.css` — Tailwind v4 `@theme inline` with all semantic color tokens, radius, font variables; light + dark CSS custom properties on `:root` and `.dark`; base animations (fade-in, check-pop)
  - `app/layout.tsx` — Inter + JetBrains Mono via `next/font/google`; correct Sprout metadata
  - `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
  - `types/index.ts` — All domain types: `HabitFrequencyType`, `HabitStatus`, `Habit`, `HabitRecord`, `CalendarDay`, `WeeklyProgress`, `DashboardSummary`, `ActionResult`
  - `components/ui/` — Button (CVA variants), Card, Input, Label, Textarea, Badge, Dialog, Select, Skeleton, FormField, Separator
  - `components/layout/` — AppShell (sidebar + mobile nav), Nav, MobileNav
  - `components/features/habits/` — HabitCard + skeleton, CheckInControl (3-state cycle), WeeklyProgress bar, HabitForm (controlled + validation), CreateHabitDialog, EditHabitDialog (with delete confirmation), HabitList, HabitEmptyState
  - `components/features/calendar/` — CalendarCell (status-colored), HabitCalendar + skeleton
  - `components/features/dashboard/` — SummaryCard + skeleton
  - Pages: Landing (`/`), Sign-in (`/sign-in`), Sign-up (`/sign-up`), Dashboard (`/dashboard`), Calendar (`/calendar`), Habit detail (`/habits/[id]`), Settings (`/settings`)
  - All pages use placeholder/mock data until the data layer is added
  - TypeScript strict mode — zero type errors

- **Feature 02: Authentication**
  - Installed `@clerk/ui`; `@clerk/nextjs` was already present
  - `proxy.ts` at root — protected-first `clerkMiddleware`; public routes read from `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars
  - `.env.local` — added `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`, `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`
  - `app/layout.tsx` — `ClerkProvider` wraps root layout with CSS-variable appearance (no hardcoded colors)
  - `app/page.tsx` — server component that redirects authenticated users → `/dashboard`, unauthenticated → `/sign-in`
  - `app/(auth)/sign-in/[[...rest]]/page.tsx` — replaced placeholder form with Clerk `<SignIn />`
  - `app/(auth)/sign-up/[[...rest]]/page.tsx` — replaced placeholder form with Clerk `<SignUp />`
  - `components/layout/nav.tsx` — `UserButton` added to sidebar bottom and mobile nav right slot

## In Progress

- None

## Next Up

- Feature 03: Data Layer — database setup, server actions, replace all mock data with real queries

## Open Questions

- None at this stage.

## Architecture Decisions

- Tailwind v4 `@theme inline` maps CSS custom property tokens to Tailwind utility names (e.g., `bg-background`, `text-primary`). Never use raw palette classes.
- Route groups: `(auth)` for public auth pages, `(app)` for authenticated app routes. The `(app)/layout.tsx` wraps `AppShell`.
- shadcn/ui-style components built from Radix UI primitives directly (no CLI). `components/ui/` is the design system primitive layer — do not modify for feature work.
- All pages currently use inline mock data. These will be replaced by server components + data fetching in the data layer feature.
- Clerk route protection uses `proxy.ts` (Next.js 16+ middleware filename), not `middleware.ts`.
- Clerk appearance is set once on `ClerkProvider` in the root layout using CSS custom properties — individual Clerk components inherit it automatically.

## Session Notes

- Stack: Next.js 16.2.6, React 19.2.4, Tailwind CSS v4, TypeScript strict mode, Clerk v7.
- `npx tsc --noEmit` passes with zero errors.
- Dark mode is implemented via the `.dark` class on `<html>` — theme toggle is a placeholder in Settings until the theme provider is added.
