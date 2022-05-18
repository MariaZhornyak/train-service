import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { config } from './config';
import { AppModule } from './app.module';

import axios from 'axios';
axios.defaults.validateStatus = () => true;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Trains Service')
    .setDescription(
      'Booking tickets, getting information about trains, routes and schedule',
    )
    .setVersion('1.0')
    .addTag('trains')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}

bootstrap();
