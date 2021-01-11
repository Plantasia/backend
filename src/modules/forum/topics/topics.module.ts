import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../../../entities/topic.entity';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { CategoryModule } from '../categories/categories.module';
import { CategoryService } from '../categories/categories.service';
import { Category } from '@entities/category.entity';
import { UserService } from '../../profile/user/user.service';
import { User } from '@entities/user.entity';
@Module({
  imports: [User, TypeOrmModule.forFeature([Topic, User, Category])],
  providers: [TopicsService, CategoryService, UserService],
  controllers: [TopicsController],
  exports: [TypeOrmModule.forFeature([Topic])],
})
export class TopicModule {}
