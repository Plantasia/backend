import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cors from 'cors';
import { CallingSeeders } from './database/seeders/calling-seeders';

async function bootstrap() {
  const PORT = process.env.PORT || 3333;
  const HOST = process.env.HOST || '0.0.0.0';
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost',
  });
  const path = require('path');
  try {
    CallingSeeders();
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Plantasia Docs')
      .setDescription('Swagger API Documentation')
      .setVersion('2.0')
      .build();

    const doc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, doc);

    await app.listen(PORT, HOST);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
