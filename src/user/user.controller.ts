import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUpUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(createUserDto);
  }

  @Get('user-by-name/:username')
  async getUserByName(@Param('username') username: string): Promise<UserModel> {
    const user = await this.userService.findUser({ username: username });

    if (!user) {
      throw new NotFoundException(`User with name ${username} was not found`);
    }

    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.findUser({ id: Number(id) });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return user;
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.users({ orderBy: { username: 'asc' } });
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
