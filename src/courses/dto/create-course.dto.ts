import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
