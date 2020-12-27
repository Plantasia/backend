import { Body, Controller, Delete, Get, Param, Post, Put, Render, UseGuards} from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDTO} from '../category/create-category.dto'
import { Category } from '../category/category.entity';
import {uuid} from 'uuidv4';
import {ApiResponse} from '@nestjs/swagger'
import {JwtAuthGuard} from '../auth/jwt-auth.guard'




@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post()
  create( @Body() createCategoryDTO:CreateCategoryDTO):Promise<Category>{
    return this.categoryService.create(createCategoryDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Category[]>{

    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
   findOne(@Param('id') id:string): Promise<Category>{

    return this.categoryService.findOne(id);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')

   @ApiResponse({
    status:400,
    description:"Error: Id is incorrect or category not exists" })
   remove(@Param('id') id:string): Promise<void>{
    return this.categoryService.remove(id)
   }

  @UseGuards(JwtAuthGuard) 
  @Put(':id')
  update(@Param('id') id:string, @Body() createCategoryDTO: CreateCategoryDTO ): Promise<Category>{
    return this.categoryService.update(id,createCategoryDTO);

  }

}
