import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';
export class CourseEntity implements Course {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
