import { Module } from '@nestjs/common';
import { CategoryController } from './categories/categories.controller';
import { CategoryModule } from './categories/categories.module';
import { CategoryService } from './categories/categories.service';
import { CommentController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { CommentService } from './comments/comments.service';
import { TopicModule } from './topics/topics.module';
import { TopicsController } from './topics/topics.controller';
import { TopicsService } from './topics/topics.service';
import { Category } from '@entities/category.entity';
import { Comment } from '@entities/comments.entity';
import { Topic } from '@entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/profile/user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Comment, Topic]),
    CategoryModule,
    CommentsModule,
    TopicModule,
    UserModule,
    SharedModule
  ],
  controllers: [CategoryController, CommentController, TopicsController],
  providers: [CategoryService, CommentService, TopicsService],
  exports: [CategoryModule, CommentsModule, TopicModule],
})
export class ForumModule {}
