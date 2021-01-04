import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import {TopicsService} from './topics.service';
import {TopicsController} from './topics.controller'
import { CategoryModule } from '../category/module/category.module';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
@Module({
  imports:[User, TypeOrmModule.forFeature([Topic]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Category])],
  providers:[TopicsService, CategoryService, UserService],
  controllers:[TopicsController],
  exports:[TypeOrmModule.forFeature([Topic])],
})
export class TopicModule {

}
