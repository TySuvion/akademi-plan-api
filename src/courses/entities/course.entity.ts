import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';
export class CourseEntity implements Course {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, nullable: true })
  userID: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date | null;
  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  constructor({ user, ...data }: Partial<CourseEntity>) {
    Object.assign(this, data);
    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
