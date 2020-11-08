import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../service/category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getHello(): string {
   return ('Hello World');
  }
  
  @Post()
  create():void{
    return null
  }
}
