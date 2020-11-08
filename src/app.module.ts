import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CategoryModule } from './category/module/category.module';
import {CategoryController} from './category/controller/category.controller';
import { CategoryService } from './category/service/category.service';
import { Connection} from 'typeorm';
import {Category} from './category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'porangaba2305',
      database:'plantasia',
      entities:[Category],
      synchronize: true,
    }),
  ,CategoryModule],
})
export class AppModule {}
