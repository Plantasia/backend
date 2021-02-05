import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { TopicsService } from '../../forum/topics/topics.service';
import { CategoryService } from '../../forum/categories/categories.service';
import { User } from '@entities/user.entity';
import { Topic } from '@entities/topic.entity';
import { Category } from '@entities/category.entity';
import { UserController } from './user.controller';
import { AuthService } from '../../../auth/auth.service';
import {AuthModule} from '../../../auth/auth.module'



//import {} falta o user service

@Module({
  imports: [TypeOrmModule.forFeature([User, Topic, Category])],
  //por causa do topic ele pede o category
  providers: [UserService, TopicsService, CategoryService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
