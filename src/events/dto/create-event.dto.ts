import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
  end: Date;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsOptional()
  courseId: number | null;
}
