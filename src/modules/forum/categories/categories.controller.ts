import {
  Body,
  Controller,
  Delete,
  Request,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiHeader, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { UserService } from 'src/modules/profile/user/user.service';
import { identity } from 'rxjs';


@ApiTags('categories')


@Controller('categories')
export class CategoryController {
  constructor( private readonly categoryService: CategoryService,
               private readonly userService: UserService ) {}
  
  @ApiHeader({
    name: 'Bearer Token',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({description:"Category succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDTO: CreateCategoryDTO, @Request() req ): Promise<Partial<Category>> {
  const thisUser = await this.userService.findByEmail(req.user.email);
  const check = await this.userService.authorizationCheck(req.headers.authorization)
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
     const newCategory = await this.categoryService.create(createCategoryDTO);

     const{id,name,imageStorage}= newCategory
      
      return {
        id,name,imageStorage
      }
    }

     else{
       throw new HttpException(`There is a category with this name, please choose another`
       , HttpStatus.FORBIDDEN);
     }
   
  }

  @Get()
  @ApiOkResponse({description:"The categories has been succesfful returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async findAll(): Promise<Partial<Category[]>> {
    const allCategories = await  this.categoryService.findAll();

    const [id,name]= allCategories
  
    return allCategories;
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
  async findOne(@Param('id') categoryId: string, @Request() req): Promise<Partial<Category>> {
    
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    const  selectedCategory = await this.categoryService.findOne(categoryId);
    const {id,name,imageStorage,description,authorSlug, authorLogin} = selectedCategory

    return {id,name,imageStorage,description}

  }

  /*@UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({description:"The category has been successful deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async remove(@Param('id') id: string, @Request() req): Promise<void> {

    //NOTE: Verifying if this user is authorized 
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    
    if(thisUser && check){
      const categoryToDelete = await this.categoryService.findOne(id)

      categoryToDelete.deleted = true
    }

    else{
      throw new UnauthorizedException("You are not authorized to delete this category!")
    }
  } */
  
  

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({description:"The category has beenn successful updated"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async update(
    @Param('id') id: string,
    @Body() createCategoryDTO: CreateCategoryDTO ,@Request() req:any): Promise<Category> {
      const email =req.headers;
    
    /** 
     *  Verifying if the category
     *  requested to update
     *  really exists
     **/

    const categoryExists = await (await this.categoryService.findById(id))
      const thisUser = await this.userService.findByEmail(req.user.email);
      const check = await this.userService.authorizationCheck(req.headers.authorization)
    const authorLogin = await (await this.categoryService.findById(id)).authorLogin

    console.log(email)
    if(!categoryExists){
      throw new  NotFoundException({error:'This category does not exists'})
    }

    /** 
     *  Verifying if the users
     *  is authorized to update;
     * 
     *  That is, if he is the author
     **/

    const authorSlug = (await this.categoryService.findById(id)).authorSlug;
    /* authorSlug is the id of author (related to users table) */

    const userIsAuthorized = this.userService.findById(authorSlug);

    if(!userIsAuthorized){
      throw new  UnauthorizedException({error:"You are not authorized to update this category!"})
      
    }

    return this.categoryService.update(id, createCategoryDTO);
  }
}
