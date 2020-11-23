import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '../comments/comments.service';
import { CommentController  } from '../comments/comments.controller'
import { Comment } from '../comments/comments.entity';
import {TopicsService} from '../topics/topics.service';
import { Topic } from '../topics/topic.entity';
import { User } from '../user/user.entity';
import { UserService} from '../user/user.service'
import { Category } from '../category/category.entity';
import { CategoryModule } from '../category/module/category.module';
import { CategoryService } from '../category/category.service';

//import {} falta o user service


@Module({
  imports:[
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Category]),
    ],

  providers: [CommentService, TopicsService, UserService, CategoryService ],
  controllers:[CommentController ],
  exports:[]
})
export class CommentsModule {}
