import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import {TopicsService} from './topics.service';
import {TopicsController} from './topics.controller'
import { CategoryModule } from '../category/module/category.module';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Topic]), TypeOrmModule.forFeature([Category])],
  providers:[TopicsService, CategoryService],
  controllers:[TopicsController],
  exports:[TypeOrmModule.forFeature([Topic])],
})
export class TopicModule {

}
