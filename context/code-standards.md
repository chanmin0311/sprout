# Code Standards

## General

- Keep modules small, focused, and single-purpose.
- Prefer simple, explicit implementations over unnecessary abstraction.
- Fix root causes rather than adding temporary workarounds.
- Do not mix UI rendering, business logic, and data access in the same module.
- Respect the boundaries defined in `architecture-context.md`.
- Follow the visual and interaction rules defined in `ui-context.md`.
- Write code that is easy for both humans and AI agents to understand and extend.

---

## TypeScript

- Enable strict mode across the entire project.
- Avoid `any`; use explicit interfaces, unions, and utility types.
- Use `interface` for object contracts and domain models.
- Use `type` for unions, mapped types, and utility compositions.
- Validate unknown input before narrowing types.
- Prefer descriptive names over generic names like `data`, `item`, or `result`.
- Use string literal unions or enums for constrained values such as habit frequency and status.

### Example Domain Types

- `HabitFrequencyType = "daily" | "weekly"`
- `HabitStatus = "not_started" | "in_progress" | "completed"`

---

## Next.js

- Default to React Server Components.
- Add `"use client"` only when the component requires:
  - Browser APIs
  - React hooks such as `useState` or `useEffect`
  - Event handlers
  - Optimistic updates

- Fetch data on the server whenever possible.
- Keep route handlers focused on a single responsibility.
- Prefer Server Actions for simple authenticated mutations.
- Use API routes when integration boundaries or custom HTTP behavior are required.
- Do not place business logic directly in pages or layouts.

---

## React

- Keep components presentational whenever possible.
- Extract reusable UI patterns into dedicated components.
- Move business logic into `lib/` modules.
- Keep component props explicit and narrowly scoped.
- Avoid deeply nested JSX by composing smaller components.
- Use controlled forms with schema validation.

---

## Styling

- Use CSS custom property tokens defined in `globals.css`.
- Access colors and spacing through semantic Tailwind utilities.
- Do not use raw Tailwind palette classes such as `gray-*`, `slate-*`, or `green-*`.
- Do not hardcode hex values in components.
- Follow the radius scale defined in `ui-context.md`:
  - `rounded-xl` for small controls
  - `rounded-2xl` for buttons and form fields
  - `rounded-3xl` for cards and panels
  - `rounded-[2rem]` for modals and drawers

- Preserve the calm, spacious visual style.
- Use consistent spacing and typography tokens.

---

## Component Design

- Components in `components/ui` should remain generic and reusable.
- Components in `components/features` should encapsulate habit-specific UI.
- Components should not query the database directly.
- Components should receive fully prepared data via props.
- Avoid prop drilling by using composition when practical.

### Recommended Structure

- `components/ui` — shared design primitives
- `components/layout` — app shell and navigation
- `components/features/habits` — habit cards, forms, and progress controls
- `components/features/calendar` — calendar-specific components
- `components/features/dashboard` — summary and metric cards

---

## Forms and Validation

- Define Zod schemas close to the domain they validate.
- Share schemas between client and server when appropriate.
- Validate all external input before executing business logic.
- Surface user-friendly validation messages.
- Keep form state isolated to the form component.

---

## Server Actions and API Routes

- Authenticate before accessing protected data.
- Verify resource ownership before mutations.
- Validate request input before processing.
- Return predictable response shapes.
- Keep handlers thin and delegate logic to service modules.

### Preferred Response Shape

```ts
interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## Database and Prisma

- Use Prisma as the single ORM layer.
- Keep database access inside `lib/db` or domain service modules.
- Never access Prisma directly from UI components.
- Use transactions when multiple writes must succeed together.
- Enforce unique constraints at the schema level.

### Required Constraints

- One habit belongs to one user.
- One habit can have only one record per date.
- Weekly habits must store a target count greater than zero.

---

## Business Logic

- Place domain rules in dedicated modules under `lib/`.
- Treat streaks as derived values rather than stored source-of-truth data.
- Centralize date normalization and timezone handling.
- Keep frequency logic (`daily`, `weekly`) in one cohesive module.

### Suggested Modules

- `lib/habits`
- `lib/habit-records`
- `lib/streaks`
- `lib/calendar`
- `lib/auth`

---

## Error Handling

- Fail early when validation or authorization fails.
- Return actionable error messages to the UI.
- Do not silently swallow exceptions.
- Log unexpected server errors in a centralized way.

---

## Date Handling

- Use `date-fns` for all date calculations.
- Normalize dates consistently before persistence.
- Treat all streak and calendar calculations using the same timezone strategy.
- Avoid manual string-based date manipulation.

---

## State Management

- Prefer server-rendered state and URL-driven state.
- Use local component state only for temporary UI interactions.
- Avoid introducing global client state unless there is a clear need.
- Keep derived values computed close to where they are used.

---

## File Organization

- `app/` — routes, layouts, and server actions
- `app/api/` — HTTP route handlers
- `components/` — UI components only
- `lib/` — business logic and infrastructure
- `lib/db/` — Prisma client
- `lib/auth/` — authentication and ownership helpers
- `lib/streaks/` — streak calculation logic
- `prisma/` — schema and migrations
- `types/` — shared TypeScript definitions

Name files after their responsibility, not the technology used.

Examples:

- `calculate-streak.ts`
- `create-habit.ts`
- `normalize-date.ts`
- `habit-card.tsx`

---

## Naming Conventions

### Files

- Use kebab-case for file names.

### Components

- Use PascalCase component names.

### Functions

- Use verb-based camelCase names.

### Interfaces

- Use descriptive singular nouns.

### Constants

- Use UPPER_SNAKE_CASE for static constants.

---

## Testing Principles

- Test business logic independently from UI.
- Prioritize streak calculations, ownership checks, and validation.
- Cover both successful and failure scenarios.
- Keep tests deterministic and timezone-safe.

---

## Performance

- Fetch only the data required for each page.
- Avoid unnecessary client components.
- Memoize expensive derived calculations when appropriate.
- Use database indexes and unique constraints for critical queries.

---

## Accessibility

- Use semantic HTML whenever possible.
- Provide labels for all form controls.
- Ensure keyboard navigation works throughout the application.
- Preserve visible focus states.
- Maintain WCAG AA contrast in both themes.

---

## Documentation

- Keep `project-overview.md`, `architecture-context.md`, and `ui-context.md` aligned with implementation changes.
- Document non-obvious business rules near the relevant modules.
- Update schemas and type definitions when domain rules change.

---

## Invariants

1. Every habit belongs to exactly one authenticated user.
2. Users can modify only their own habits and records.
3. Each habit has at most one completion record per date.
4. Streaks are always derived from completion history.
5. All external input is validated before use.
6. UI components never contain database access logic.
7. Styling uses semantic design tokens only.
8. The default experience should remain simple enough for a user to complete check-ins in a few seconds.
