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

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiCreatedResponse({ type: CourseEntity })
  async create(@Body() createCourseDto: CreateCourseDto) {
    return new CourseEntity(await this.coursesService.create(createCourseDto));
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

  @Delete(':id')
  @ApiOkResponse({ type: CourseEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new CourseEntity(await this.coursesService.remove(id));
  }
}
