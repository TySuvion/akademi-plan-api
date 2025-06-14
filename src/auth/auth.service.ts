import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!user || !user.password) {
      throw new NotFoundException(`No user found with username ${username}`);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid password for user ${username}`);
    }

    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }

  async signUp(username: string, password: string) {
    const user = await this.usersService.create({ username, password });

    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
