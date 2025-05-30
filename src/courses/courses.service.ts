import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeeklyGoalDto } from './dto/create-weeklygoal.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        name: createCourseDto.name,
        user: {
          connect: { id: createCourseDto.userId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findByUser(userId: number) {
    return this.prisma.course.findMany({
      where: { userID: userId },
      include: {
        events: true,
        weeklyGoals: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }

  addWeeklyGoal(createWeeklyGoalDto: CreateWeeklyGoalDto) {
    const today = new Date();
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() - today.getDay() + 1);
    const currentSundday = new Date(currentMonday + '6 days');
    let sessions = 0;
    this.getCompletedSessions(
      createWeeklyGoalDto.courseId,
      currentMonday,
      currentSundday,
    ).then((completedSessions) => {
      sessions = completedSessions;
    });

    return this.prisma.weeklyGoal.create({
      data: {
        courseId: createWeeklyGoalDto.courseId,
        weekStart: currentMonday.toISOString(),
        weekEnd: currentSundday.toISOString(),
        goalSessios: createWeeklyGoalDto.goalSessions,
        completedSessions: sessions,
      },
    });
  }

  async getCompletedSessions(
    courseId: number,
    weekStart: Date,
    weekEnd: Date,
  ): Promise<number> {
    let completedSessions = 0;
    const relevantEvents = await this.prisma.event.findMany({
      where: {
        courseId: courseId,
        start: {
          gte: weekStart.toISOString(),
          lte: weekEnd.toISOString(),
        },
      },
      include: {
        studyBlock: true,
      },
    });

    relevantEvents.forEach((event) => {
      if (this.eventDateIswithingRange(event.start, weekStart, weekEnd)) {
        completedSessions += event.studyBlock?.completedSessions || 0;
      }
    });
    return completedSessions;
  }

  eventDateIswithingRange(date: Date, weekStart: Date, weekEnd: Date): boolean {
    return date >= weekStart && date <= weekEnd;
  }
}
