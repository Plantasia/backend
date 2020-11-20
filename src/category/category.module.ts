import { Module } from '@nestjs/common';
import { CategoryController } from '../category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { TopicModule } from '../topics/topic.module';

@Module({
  imports:[TypeOrmModule.forFeature([Category]),TopicModule ],
  providers: [CategoryService],
  controllers:[CategoryController],
  exports:[]
})
export class CategoryModule {}
