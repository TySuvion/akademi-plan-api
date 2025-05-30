import { PartialType } from '@nestjs/swagger';
import { CreateWeeklyGoalDto } from './create-weeklygoal.dto';

export class UpdateWeeklyGoalDto extends PartialType(CreateWeeklyGoalDto) {}
