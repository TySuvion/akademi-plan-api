import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter<T> extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);


  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    this.logger.error(exception.message);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002':
        const conflictStatus = HttpStatus.CONFLICT;
        response.status(conflictStatus).json({
          statusCode: conflictStatus,
          message: message,
        });
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
