import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [//ConfigModule.forRoot(),


    TypeOrmModule.forRoot({
    }),CategoryModule, CommentsModule],

})
export class AppModule {
  constructor() {};
}
