import { Module } from '@nestjs/common';
import { CategoryService } from '../service/category.service';

@Module({
  providers: [CategoryService]
})
export class CategoryModule {}
