import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import {TopicsService} from './topics.service';
import {TopicsController} from './topics.controller'
@Module({
  imports:[TypeOrmModule.forFeature([Topic])],
  providers:[TopicsService],
  controllers:[TopicsController],
  exports:[TypeOrmModule.forFeature([Topic])],
})
export class TopicModule {

}
