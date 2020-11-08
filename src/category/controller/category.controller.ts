import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../service/category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
