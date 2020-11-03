import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../service/category.service';

@Controller()
export class AppController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
