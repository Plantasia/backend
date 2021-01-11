import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { Comment } from '../../../entities/comments.entity';
import { TopicsService } from '../topics/topics.service';
import { Topic } from '../../../entities/topic.entity';
import { User } from '../../../entities/user.entity';
import { UserService } from '../../profile/user/user.service';
import { Category } from '../../../entities/category.entity';
import { CategoryModule } from '../categories/categories.module';
import { CategoryService } from '../categories/categories.service';

//import {} falta o user service

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Topic, User, Category])],
  providers: [CommentService, TopicsService, UserService, CategoryService],
  controllers: [CommentController],
  exports: [],
})
export class CommentsModule {}
