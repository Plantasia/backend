import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '@entities/user.entity';
import { TopicsService } from '../../forum/topics/topics.service';
import { Topic } from '@entities/topic.entity';
import { CategoryService } from '../../forum/categories/categories.service';
import { Category } from '../../../entities/category.entity';

//import {} falta o user service

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([Category]),
  ],
  //por causa do topic ele pede o category
  providers: [UserService, TopicsService, CategoryService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
