-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CALENDAR_EVENT', 'STUDY_BLOCK');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'CALENDAR_EVENT';

-- CreateTable
CREATE TABLE "StudyBlock" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "plannedSessions" INTEGER NOT NULL,
    "completedSessions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StudyBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyBlock_eventId_key" ON "StudyBlock"("eventId");

-- AddForeignKey
ALTER TABLE "StudyBlock" ADD CONSTRAINT "StudyBlock_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
