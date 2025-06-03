-- DropForeignKey
ALTER TABLE "WeeklyGoal" DROP CONSTRAINT "WeeklyGoal_courseId_fkey";

-- AddForeignKey
ALTER TABLE "WeeklyGoal" ADD CONSTRAINT "WeeklyGoal_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
