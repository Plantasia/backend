import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDTO} from '../category/create-category.dto'
import { Category } from '../category/category.entity';
import {uuid} from 'uuidv4';
//import {MappingRegistryService} from '../../common/mapping-registry-service';



@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ){}

  @Get()
  getHello(): string {
   return ('Hello World');
  }

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

}
