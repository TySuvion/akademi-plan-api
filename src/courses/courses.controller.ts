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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseEntity } from './entities/course.entity';
import { WeeklyGoalEntity } from './entities/weeklygoals.enitity';
import { CreateWeeklyGoalDto } from './dto/create-weeklygoal.dto';
import { UpdateWeeklyGoalDto } from './dto/update-weeklygoal.dto';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiCreatedResponse({ type: CourseEntity })
  async create(@Body() createCourseDto: CreateCourseDto) {
    return new CourseEntity(await this.coursesService.create(createCourseDto));
  }

  @Post('weeklygoal')
  @ApiCreatedResponse({ type: WeeklyGoalEntity })
  async createGoal(@Body() createWeeklyGoalDto: CreateWeeklyGoalDto) {
    return new WeeklyGoalEntity(
      await this.coursesService.addWeeklyGoal(createWeeklyGoalDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  async findAll() {
    const courses = await this.coursesService.findAll();
    return courses.map((course) => new CourseEntity(course));
  }

  @Get(':id')
  @ApiOkResponse({ type: CourseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const course = await this.coursesService.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return new CourseEntity(course);
  }

  @Get('user/:id')
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  async findByUser(@Param('id', ParseIntPipe) id: number) {
    const courses = await this.coursesService.findByUser(id);
    if (!courses) {
      throw new NotFoundException(`Courses for user with ID ${id} not found`);
    }
    return courses.map((course) => new CourseEntity(course));
  }

  @Patch(':id')
  @ApiOkResponse({ type: CourseEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return new CourseEntity(
      await this.coursesService.update(id, updateCourseDto),
    );
  }

  @Patch('weeklygoal/:id')
  @ApiOkResponse({ type: WeeklyGoalEntity })
  async updateGoal(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWeeklyGoalDto: UpdateWeeklyGoalDto,
  ) {
    return new WeeklyGoalEntity(
      await this.coursesService.updateWeeklyGoal(id, updateWeeklyGoalDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: CourseEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new CourseEntity(await this.coursesService.remove(id));
  }

  @Delete('weeklygoal/:id')
  @ApiOkResponse({ type: WeeklyGoalEntity })
  async removeGoal(@Param('id', ParseIntPipe) id: number) {
    return new WeeklyGoalEntity(await this.coursesService.removeGoal(id));
  }
}
