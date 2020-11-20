import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [//ConfigModule.forRoot(),


    TypeOrmModule.forRoot({
    }),CategoryModule],

})
export class AppModule {
  constructor() {};
}
