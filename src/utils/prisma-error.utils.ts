import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class PrismaErrorUtils {
  static isPrismaError(
    error: any,
  ): error is Prisma.PrismaClientKnownRequestError {
    return error instanceof Prisma.PrismaClientKnownRequestError;
  }

  static isPrismaErrorWithCode(
    error: any,
    code: string,
  ): error is Prisma.PrismaClientKnownRequestError {
    return this.isPrismaError(error) && error.code === code;
  }

  static getErrorCode(error: any): string | null {
    if (this.isPrismaError(error)) {
      return error.code;
    }
    return null;
  }

  static mapErrorToException(error: any): Error {
    if (!this.isPrismaError(error)) {
      return new InternalServerErrorException('An unexpected error occurred');
    }

    switch (error.code) {
      case 'P2002': // Unique constraint failed
        return new ConflictException(
          `Unique constraint failed on ${error.meta?.target}`,
        );
      case 'P2025': // Record not found
        return new NotFoundException(`Requested record was not found`);
      case 'P2003': // Foreign key constraint failed
        return new BadRequestException(`Foreign key constraint failed`);
      default:
        return new InternalServerErrorException(
          `Database error: ${error.code}`,
        );
    }
  }
}
