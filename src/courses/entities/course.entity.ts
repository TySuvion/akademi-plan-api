import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';
export class CourseEntity implements Course {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, nullable: true })
  userID: number | null;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
