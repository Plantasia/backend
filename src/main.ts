import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3333;
  const HOST = process.env.HOST || '0.0.0.0';

  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
