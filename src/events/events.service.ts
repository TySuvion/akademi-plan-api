import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventType, Prisma } from '@prisma/client';
import { CreateStudyBlockDto } from './dto/create-studyblock.dto';
import { updateStudyBlockDto } from './dto/update-studyblock.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        start: createEventDto.start,
        end: createEventDto.end,
        user: {
          connect: { id: createEventDto.userId },
        },
        ...(createEventDto.courseId && {
          course: {
            connect: { id: createEventDto.courseId },
          },
        }),
      },
    });
  }

  findAll(where?: Prisma.EventWhereInput) {
    return this.prisma.event.findMany({
      where: where,
    });
  }

  findAllUntilToday(userId?: number) {
    const today = new Date();
    return this.prisma.event.findMany({
      where: {
        type: EventType.STUDY_BLOCK,
        start: {
          lte: today,
        },
        ...(userId && { userId }),
      },
      include: {
        course: true,
        studyBlock: true,
      },
      orderBy: {
        start: 'asc',
      },
    });
  }

  async findEventsForDateByUser(userID: number, date: string) {
    return this.prisma.event.findMany({
      where: {
        userId: userID,
        start: {
          gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
      },
      include: {
        course: true,
        studyBlock: true,
      },
    });
  }

  findByUser(userId: number) {
    return this.prisma.event.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: {
        type: EventType.CALENDAR_EVENT,
        name: updateEventDto.name,
        description: updateEventDto.description,
        start: updateEventDto.start,
        end: updateEventDto.end,
        ...(updateEventDto.courseId && {
          course: { connect: { id: updateEventDto.courseId } },
        }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async createStudyBlock(createStudyBlockDto: CreateStudyBlockDto) {
    return this.prisma.event.create({
      data: {
        name: createStudyBlockDto.name,
        description: createStudyBlockDto.description,
        start: createStudyBlockDto.start,
        end: createStudyBlockDto.end,
        type: EventType.STUDY_BLOCK,
        user: {
          connect: { id: createStudyBlockDto.userId },
        },
        ...(createStudyBlockDto.courseId && {
          course: {
            connect: { id: createStudyBlockDto.courseId },
          },
        }),
        studyBlock: {
          create: {
            plannedSessions: createStudyBlockDto.plannedSessions,
            completedSessions: createStudyBlockDto.completedSessions,
          },
        },
      },
      include: { studyBlock: true },
    });
  }

  async updateStudyBlock(id: number, updateStudyBlockDto: updateStudyBlockDto) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { studyBlock: true },
    });

    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        name: updateStudyBlockDto.name,
        description: updateStudyBlockDto.description,
        start: updateStudyBlockDto.start,
        end: updateStudyBlockDto.end,
        type: EventType.STUDY_BLOCK,
        ...(updateStudyBlockDto.courseId && {
          course: {
            connect: { id: updateStudyBlockDto.courseId },
          },
        }),
        studyBlock: event.studyBlock
          ? {
              update: {
                plannedSessions: updateStudyBlockDto.plannedSessions ?? 0,
                completedSessions: updateStudyBlockDto.completedSessions ?? 0,
              },
            }
          : {
              create: {
                plannedSessions: updateStudyBlockDto.plannedSessions ?? 0,
                completedSessions: updateStudyBlockDto.completedSessions ?? 0,
              },
            },
      },
      include: { studyBlock: true },
    });
  }
}
