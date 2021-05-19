import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@entities/category.entity';
import { CategoryService } from './categories.service';
import { TopicModule } from '../topics/topics.module';
import { UserService } from 'src/modules/profile/user/user.service';
import { User } from '@entities/user.entity';
import { UserModule } from 'src/modules/profile/user/user.module';
import { TopicsService } from '../topics/topics.service';
import { Topic } from '@entities/topic.entity';
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Topic]),SharedModule,
    TopicModule,
    UserModule,
  ],
  providers: [CategoryService, UserService, TopicsService],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
