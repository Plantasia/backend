import { Module } from '@nestjs/common';
import { CategoryController } from '../category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports:[TypeOrmModule.forFeature([Category]) ],
  providers: [CategoryService],
  controllers:[CategoryController],
  exports:[]
})
export class CategoryModule {}
