import { PartialType } from '@nestjs/swagger';
import { CreateStudyBlockDto } from './create-studyblock.dto';

export class updateStudyBlockDto extends PartialType(CreateStudyBlockDto) {}
