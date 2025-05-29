-- CreateTable
CREATE TABLE "WeeklyGoal" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,
    "goalSessios" INTEGER NOT NULL,
    "completedSessions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WeeklyGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeeklyGoal" ADD CONSTRAINT "WeeklyGoal_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
