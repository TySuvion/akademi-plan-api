/*
  Warnings:

  - You are about to drop the column `goalSessios` on the `WeeklyGoal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[weekStart]` on the table `WeeklyGoal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[weekEnd]` on the table `WeeklyGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WeeklyGoal" DROP COLUMN "goalSessios",
ADD COLUMN     "goalSessions" INTEGER NOT NULL DEFAULT 16;

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyGoal_weekStart_key" ON "WeeklyGoal"("weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyGoal_weekEnd_key" ON "WeeklyGoal"("weekEnd");
