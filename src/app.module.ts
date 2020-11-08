import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CategoryModule } from './category/module/category.module';
import {CategoryController} from './category/controller/category.controller';
import { Connection} from 'typeorm';
import {Category} from './category/entities/category.entity';
import { TopicsController } from './topics/controllers/topics.controller';
import {CategoryService } from './category/service/category.service';

import { UserController } from './user/user.controller';

@Module({
  imports: [TypeOrmModule.forRoot()
  ,CategoryModule],
  controllers: [TopicsController, UserController],
  providers: [CategoryService],
})
export class AppModule {
  constructor( private connection: Connection){}
}
