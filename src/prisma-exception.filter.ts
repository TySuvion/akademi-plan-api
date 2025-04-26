import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let message = 'Database error';
    let statusCode = 500;

    if (exception.code === 'P2002') {
      //Unique constraint failed (e.g. username already exists)
      message = `Unique contraint failed: ${exception.meta?.target}`;
      statusCode = 409; //Conflict
    } else if (exception.code === 'P2025') {
      //Record not found
      message = `Record not found.`;
      statusCode = 404;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.code,
    });
  }
}
