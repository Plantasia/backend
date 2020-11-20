import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDTO} from '../category/create-category.dto'
import { Category } from '../category/category.entity';
import {uuid} from 'uuidv4';
import { UpdateDateColumn } from 'typeorm';
//import {MappingRegistryService} from '../../common/mapping-registry-service';



@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ){}

  @Post()
  create( @Body() createCategoryDTO:CreateCategoryDTO):Promise<Category>{
    return this.categoryService.create(createCategoryDTO);
  }

  @Get()
  findAll(): Promise<Category[]>{

    return this.categoryService.findAll();
  }

  @Get(':id')
   findOne(@Param('id') id:string): Promise<Category>{

    return this.categoryService.findOne(id);
   }

   @Delete(':id')
   remove(@Param('id') id:string): Promise<void>{
    return this.categoryService.remove(id)
   }

  @Put(':id')
  update(@Param('id') id:string, @Body() createCategoryDTO: CreateCategoryDTO ): Promise<Category>{
    return this.categoryService.update(id,createCategoryDTO);

  }

}
