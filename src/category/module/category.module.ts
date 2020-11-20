import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '../category.controller';

import { Category } from '../category.entity';
import { CategoryService } from '../category.service';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers:[CategoryController],
  exports:[TypeOrmModule]
   /*NOTE: The exports [TypeOrmModule]
     allow to use
     the same content
     that there are in appModule
     #in another modules#

   We can use 'category-module'
   inside others modules if we wanna

   /*(* * *
      See https://docs.nestjs.com/techniques/database
      Seek for Repository Pattern at last and penultimate
      board and its texts
      * * * )*/
})
export class CategoryModule {}
