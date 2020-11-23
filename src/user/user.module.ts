import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController  } from './user.controller'
import {User}  from './user.entity';
import {TopicsService} from '../topics/topics.service';
import { Topic } from '../topics/topic.entity';
import {CategoryService } from '../category/category.service'
import {Category } from '../category/category.entity'

//import {} falta o user service


@Module({
  imports:[TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Topic]),TypeOrmModule.forFeature([Category]) ],
  //por causa do topic ele pede o category
  providers: [UserService, TopicsService, CategoryService ],
  controllers:[UserController ],
  exports:[UserService],
})
export class UserModule {}
