Add the core habit-tracking data models, Prisma client singleton, and first migration.

## Models

Create `prisma/models/habit.prisma`.

### HabitFrequencyType Enum

Add `HabitFrequencyType`:

- `DAILY`
- `WEEKLY`

### HabitStatus Enum

Add `HabitStatus`:

- `NOT_STARTED`
- `IN_PROGRESS`
- `COMPLETED`

### Habit

Represents a user-owned habit.

Fields:

- `id`
- `ownerId` mapped to the authenticated Clerk user ID
- `name`
- optional `description`
- `frequencyType` using `HabitFrequencyType`
- optional `weeklyTargetCount`
- `isActive` with default `true`
- relation to `HabitRecord`
- timestamps

Constraints and indexes:

- index on `ownerId`
- index on `[ownerId, createdAt]`

Validation rules:

- `weeklyTargetCount` is nullable for daily habits
- weekly habits must store a value greater than zero (application-level validation)

### HabitRecord

Represents the completion state of a habit for a specific date.

Fields:

- `id`
- `habitId`
- relation to `Habit` with cascade delete
- `date`
- `status` using `HabitStatus`
- timestamps

Constraints and indexes:

- unique constraint on `[habitId, date]`
- index on `habitId`
- index on `[habitId, date]`

Do not add extra fields unless required by Prisma.

---

## Prisma Client

Create `lib/prisma.ts` as a cached singleton.

Branch by `DATABASE_URL`:

- If it starts with `prisma+postgres://`, use Accelerate.
- Otherwise, use direct [@prisma/adapter-pg](https://www.npmjs.com/package/@prisma/adapter-pg?utm_source=chatgpt.com) with [pg](https://www.npmjs.com/package/pg?utm_source=chatgpt.com).

Cache the Prisma client on `globalThis` in development to prevent duplicate connections during hot reloads.

Export a single `prisma` instance.

---

## Migration

Run the initial migration and generate the Prisma client.

Suggested migration name:

- `init-habits`

Commands:

- `npx prisma migrate dev --name init-habits`
- `npx prisma generate`

---

## Dependencies

Already installed:

- [prisma](https://www.npmjs.com/package/prisma?utm_source=chatgpt.com)
- [@prisma/client](https://www.npmjs.com/package/@prisma/client?utm_source=chatgpt.com)
- [@prisma/adapter-pg](https://www.npmjs.com/package/@prisma/adapter-pg?utm_source=chatgpt.com)
- [pg](https://www.npmjs.com/package/pg?utm_source=chatgpt.com)

If Accelerate support is used, install:

- [@prisma/extension-accelerate](https://www.npmjs.com/package/@prisma/extension-accelerate?utm_source=chatgpt.com)

---

## Check When Done

- `HabitFrequencyType` and `HabitStatus` enums are defined.
- `Habit` and `HabitRecord` models exist with the correct relations.
- Cascade delete is configured from `Habit` to `HabitRecord`.
- The unique constraint on `[habitId, date]` prevents duplicate daily records.
- Indexes are defined for ownership and date-based queries.
- `lib/prisma.ts` exports one cached Prisma instance.
- The migration runs successfully.
- `npx prisma studio` shows both models.
- `npm run build` passes.
