import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string | null;

  @IsDate()
  @IsNotEmpty()
  start: Date;

  @IsDate()
  @IsNotEmpty()
  end: Date;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  courseId: number | null;
}
