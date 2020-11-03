import { NestFactory } from '@nestjs/core';
import { appendFile } from 'fs';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP_DIRECTORY =resolve(__dirname,'..');


  const app = await NestFactory.create(AppModule);

  //app.setViewEngine('hbs');
  //app.setBaseViewsDir(resolve(APP_DIRECTORY, 'views'));
  //app.useStaticAssets(resolve(APP_DIRECTORY, 'public'));

 
  await app.listen(3000);
}
bootstrap();
