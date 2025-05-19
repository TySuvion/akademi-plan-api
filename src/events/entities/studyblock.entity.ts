import { ApiProperty } from '@nestjs/swagger';
import { EventEntity } from './event.entity';

export class StudyBlockEntity extends EventEntity {
  @ApiProperty()
  plannedSessions: number;
  @ApiProperty()
  completedSessions: number;

  constructor(partial: Partial<StudyBlockEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
