/*
  Warnings:

  - A unique constraint covering the columns `[courseId,weekStart,weekEnd]` on the table `WeeklyGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WeeklyGoal_weekEnd_key";

-- DropIndex
DROP INDEX "WeeklyGoal_weekStart_key";

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyGoal_courseId_weekStart_weekEnd_key" ON "WeeklyGoal"("courseId", "weekStart", "weekEnd");
