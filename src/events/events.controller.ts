import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { EventEntity } from './entities/event.entity';
import { StudyBlockEntity } from './entities/studyblock.entity';
import { CreateStudyBlockDto } from './dto/create-studyblock.dto';
import { updateStudyBlockDto } from './dto/update-studyblock.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({ type: EventEntity })
  async create(@Body() createEventDto: CreateEventDto) {
    return new EventEntity(await this.eventsService.create(createEventDto));
  }

  @Post('studyblock')
  @ApiCreatedResponse({ type: StudyBlockEntity })
  async createStudyBlock(@Body() createStudyBlockDto: CreateStudyBlockDto) {
    return new StudyBlockEntity(
      await this.eventsService.createStudyBlock(createStudyBlockDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: EventEntity, isArray: true })
  async findAll() {
    const events = await this.eventsService.findAll();
    return events.map((event) => new EventEntity(event));
  }
  @Get('user/:id')
  @ApiOkResponse({ type: EventEntity, isArray: true })
  async findByUser(@Param('id', ParseIntPipe) id: number) {
    const Events = await this.eventsService.findByUser(id);
    if (!Events) {
      throw new NotFoundException(`Events for user with ID ${id} not found`);
    }
    return Events.map((Event) => new EventEntity(Event));
  }

  @Get('user/:id/:date')
  @ApiOkResponse({ type: EventEntity, isArray: true })
  async findEventsForDateByUser(
    @Param('id', ParseIntPipe) userID: number,
    @Param('date') date: string,
  ) {
    const events = await this.eventsService.findEventsForDateByUser(
      userID,
      date,
    );
    if (!events || events.length === 0) {
      throw new NotFoundException(
        `No events found for user ${userID} on date ${date}`,
      );
    }
    return events.map((event) => new EventEntity(event));
  }

  @Get('/untilToday/:userId')
  @ApiOkResponse({ type: EventEntity, isArray: true })
  async findAllUntilToday(@Param('userId', ParseIntPipe) userId: number) {
    const events = await this.eventsService.findAllUntilToday(userId);
    if (!events || events.length === 0) {
      throw new NotFoundException(
        `No events found for user ${userId} until today`,
      );
    }
    return events.map((event) => new EventEntity(event));
  }
  @Get(':id')
  @ApiOkResponse({ type: EventEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return new EventEntity(event);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EventEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return new EventEntity(await this.eventsService.update(id, updateEventDto));
  }

  @Patch('studyblock/:id')
  @ApiOkResponse({ type: StudyBlockEntity })
  async updateStudyBlock(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudyBlockDto: updateStudyBlockDto,
  ) {
    return new StudyBlockEntity(
      await this.eventsService.updateStudyBlock(id, updateStudyBlockDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: EventEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new EventEntity(await this.eventsService.remove(id));
  }
}
