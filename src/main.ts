import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Course API')
    .setDescription('The course API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  // This filter will catch all PrismaClientKnownRequestError exceptions and return a custom response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // This interceptor will serialize the response using the class-transformer library
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //whitelist: true means all properties that are not marked with validation decorators will be removed from the object

  app.useGlobalFilters();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
