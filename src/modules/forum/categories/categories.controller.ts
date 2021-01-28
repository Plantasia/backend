import {
  Body,
  Controller,
  Delete,
  Request,
  Get,
  Param,
  Post,
  Put,
  Render,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { UserService } from 'src/modules/profile/user/user.service';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor( private readonly categoryService: CategoryService,
               private readonly userService: UserService ) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({description:"Category succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDTO: CreateCategoryDTO, @Request() req ): Promise<Category> {
    
   const id = req.user.id
   const email = req.user.email
   
    const authorSlug =(await this.userService.findByEmail(req.user.email)).id
    
    console.log("authorSlug:",authorSlug)
    createCategoryDTO.authorLogin =  email
    createCategoryDTO.authorSlug =authorSlug

       
     const requestedName = createCategoryDTO.name 
     const exists =  await  this.categoryService.findByName(requestedName)

     if(!exists){
     console.log(`result***: ${exists}`)
     console.log(createCategoryDTO)
     return this.categoryService.create(createCategoryDTO);
     
     }
     else{
       throw new HttpException(`There is a category with this name, please choose another`
       , HttpStatus.FORBIDDEN);
     }
   
  }

  @Get()
  @ApiOkResponse({description:"The categories has been succesfful returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get()
  @ApiOkResponse({description:"The categories has been succesfful returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async findByName(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category>{
    const requestedName= createCategoryDTO.name
    
    return this.categoryService.findByName(requestedName)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({description:"The category has been successful deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({description:"The category has been successful deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({description:"The category has beenn successful updated"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async update(
    @Param('id') id: string,
    @Body() createCategoryDTO: CreateCategoryDTO ,@Request() req:any): Promise<Category> {
      const email =req.headers;

    const authorLogin = await (await this.categoryService.findById(id)).authorLogin

    console.log(email)
    if(authorLogin!==email){
      throw new UnauthorizedException({
        error: 'Forbidden: you are not permitted'
      });
    }

    return this.categoryService.update(id, createCategoryDTO);
  }
}
