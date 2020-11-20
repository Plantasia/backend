import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '../comments/comments.service';
import { CommentController  } from '../comments/comments.controller'
import { Comments } from '../comments/comments.entity';
import {TopicsService} from '../topics/topics.service';
import { Topic } from '../topics/topic.entity';
import {CategoryService } from '../category/category.service'
import {Category } from '../category/category.entity'

//import {} falta o user service


@Module({
  imports:[TypeOrmModule.forFeature([Comments]), TypeOrmModule.forFeature([Topic]),TypeOrmModule.forFeature([Category]) ],
  //por causa do topic ele pede o category
  providers: [CommentService, TopicsService, CategoryService ],
  controllers:[CommentController ],
  exports:[]
})
export class CommentsModule {}
