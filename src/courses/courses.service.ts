import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeeklyGoalDto } from './dto/create-weeklygoal.dto';
import { UpdateWeeklyGoalDto } from './dto/update-weeklygoal.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.prisma.course.create({
      data: {
        name: createCourseDto.name,
        user: {
          connect: { id: createCourseDto.userId },
        },
      },
    });
    if (createCourseDto.sessionGoal && createCourseDto.sessionGoal > 0) {
      await this.addWeeklyGoal({
        courseId: course.id,
        goalSessions: createCourseDto.sessionGoal,
        completedSessions: 0,
      });
    }

    return course;
  }

  findAll() {
    return this.prisma.course.findMany({
      include: { events: true, weeklyGoals: true },
    });
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
        weeklyGoals: true,
      },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.prisma.course.update({
      where: { id },
      data: {
        name: updateCourseDto.name,
      },
    });

    if (updateCourseDto.sessionGoal && updateCourseDto.sessionGoal > 0) {
      const today = new Date();
      const currentMonday = new Date(today);
      currentMonday.setDate(today.getDate() - today.getDay() + 1);
      currentMonday.setHours(0, 0, 0, 0);
      const existingGoal = await this.prisma.weeklyGoal.findFirst({
        where: { courseId: id, weekStart: currentMonday },
      });
      if (existingGoal) {
        await this.updateWeeklyGoal(existingGoal.id, {
          goalSessions: updateCourseDto.sessionGoal,
        });
      } else {
        await this.addWeeklyGoal({
          courseId: id,
          goalSessions: updateCourseDto.sessionGoal,
          completedSessions: 0,
        });
      }
    }
    return course;
  }

  async updateWeeklyGoal(id: number, updateWeeklyGoalDto: UpdateWeeklyGoalDto) {
    const weeklyGoal = await this.prisma.weeklyGoal.findUnique({
      where: { id },
    });

    const completedSessions = await this.getCompletedSessions(
      weeklyGoal!.courseId,
      weeklyGoal!.weekStart,
      weeklyGoal!.weekEnd,
    );

    return this.prisma.weeklyGoal.update({
      where: { id },
      data: {
        ...updateWeeklyGoalDto,
        completedSessions,
      },
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }

  removeGoal(id: number) {
    return this.prisma.weeklyGoal.delete({
      where: { id },
    });
  }

  async addWeeklyGoal(createWeeklyGoalDto: CreateWeeklyGoalDto) {
    const today = new Date();
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() - today.getDay() + 1);
    currentMonday.setHours(0, 0, 0, 0);
    const currentSundday = new Date(currentMonday);
    currentSundday.setDate(currentMonday.getDate() + 6);
    currentSundday.setHours(23, 59, 59, 999);
    let sessions = await this.getCompletedSessions(
      createWeeklyGoalDto.courseId,
      currentMonday,
      currentSundday,
    );

    return this.prisma.weeklyGoal.create({
      data: {
        course: { connect: { id: createWeeklyGoalDto.courseId } },
        weekStart: currentMonday,
        weekEnd: currentSundday,
        goalSessions: createWeeklyGoalDto.goalSessions,
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
