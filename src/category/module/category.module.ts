import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database-module/database-module.module';
import { CategoryController } from '../controller/category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Module({
  imports:[SequelizeModule.forFeature([Category]) ],
  providers: [CategoryService],
  controllers:[CategoryController],
  exports:[]
})
export class CategoryModule {}
