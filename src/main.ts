import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { AppModule } from './app.module';


  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
  bootstrap();



