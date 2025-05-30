import { ApiProperty } from '@nestjs/swagger';
import { WeeklyGoal } from '@prisma/client';

export class WeeklyGoalEntity implements WeeklyGoal {
  @ApiProperty()
  id: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  weekStart: Date;

  @ApiProperty()
  weekEnd: Date;

  @ApiProperty()
  goalSessios: number;

  @ApiProperty()
  completedSessions: number;

  constructor(partial: Partial<WeeklyGoalEntity>) {
    Object.assign(this, partial);
  }
}
