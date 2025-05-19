import { ApiProperty } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsInt, Min } from 'class-validator';

export class CreateStudyBlockDto extends CreateEventDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  completedSessions: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  plannedSessions: number;
}
