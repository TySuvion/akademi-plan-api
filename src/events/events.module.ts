import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [PrismaModule],
})
export class EventsModule {}
