import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { TopicModule } from './topics/topic.module';
@Module({
  imports: [//ConfigModule.forRoot(),


    TypeOrmModule.forRoot({
    }),CategoryModule, CommentsModule, TopicModule],

})
export class AppModule {
  constructor() {};
}
