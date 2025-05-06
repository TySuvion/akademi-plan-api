import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@prisma/client';

export class EventEntity implements Event {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty({ required: false, nullable: true })
  courseId: number | null;

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);
  }
}
