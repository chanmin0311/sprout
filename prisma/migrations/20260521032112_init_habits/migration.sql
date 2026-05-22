-- CreateEnum
CREATE TYPE "HabitFrequencyType" AS ENUM ('DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "frequencyType" "HabitFrequencyType" NOT NULL,
    "weeklyTargetCount" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitRecord" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" "HabitStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HabitRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Habit_ownerId_idx" ON "Habit"("ownerId");

-- CreateIndex
CREATE INDEX "Habit_ownerId_createdAt_idx" ON "Habit"("ownerId", "createdAt");

-- CreateIndex
CREATE INDEX "HabitRecord_habitId_idx" ON "HabitRecord"("habitId");

-- CreateIndex
CREATE INDEX "HabitRecord_habitId_date_idx" ON "HabitRecord"("habitId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "HabitRecord_habitId_date_key" ON "HabitRecord"("habitId", "date");

-- AddForeignKey
ALTER TABLE "HabitRecord" ADD CONSTRAINT "HabitRecord_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
