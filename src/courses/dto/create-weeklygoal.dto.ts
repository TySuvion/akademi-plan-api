import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWeeklyGoalDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  goalSessions: number;

  @ApiProperty()
  @IsInt()
  completedSessions: number;
}
