import { Module } from '@nestjs/common';

import { CategoryModule } from './category/module/category.module';

import { TopicsController } from './topics/controllers/topics.controller';
import { CategoryService } from './category/service/category.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TopicsController, UserController],
  providers: [CategoryService],
})
export class AppModule {
  constructor() {}
}
