import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

  async findEventsForDateByUser(userID: number, date: string) {
    return this.prisma.event.findMany({
      where: {
        userId: userID,
        start: {
          gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
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
}
