import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@entities/category.entity';
import { CategoryService } from './categories.service';
import { TopicModule } from '../topics/topics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), TopicModule],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
