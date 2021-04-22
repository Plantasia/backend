import { QueryPage } from './../../../utils/page';
import {
  Body,
  Controller,
  Delete,
  Request,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './create-category.dto';
import { DeletedItenCategoryDTO } from './delete-categories.dto';
import { Category } from '../../../entities/category.entity';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { UserService } from 'src/modules/profile/user/user.service';

@ApiTags('categories')
@Controller('forum/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  @ApiHeader({
    name: 'Bearer Token',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Category succesfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Request() req,
  ): Promise<Partial<Category>> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const author = (await this.userService.findByToken(token));

    console.log('authorId:', author.id);
    createCategoryDTO.authorEmail = author.email;
    createCategoryDTO.authorId = author.id;

    const requestedName = createCategoryDTO.name;
    const exists = await this.categoryService.findByName(requestedName);
    if (!exists) {
      console.log(createCategoryDTO);
      const newCategory = await this.categoryService.create(createCategoryDTO);

      const { id, name, imageStorage } = newCategory;

      return {
        id,
        name,
        imageStorage,
      };
    } else {
      throw new HttpException(
        `There is a category with this name, please choose another`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOkResponse({ description: 'The categories has been succesfful returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findAll(@Query() query: QueryPage) {
  
    const page = query.page;
    console.log(page)
    return this.categoryService.findAll(page);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findOne(
    @Param('id') categoryId: string,
    @Request() req,
  ): Promise<Partial<Category>> {
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );
    const selectedCategory = await this.categoryService.findOne(categoryId);
    const {
      id,
      name,
      imageStorage,
      description,
      authorId,
      authorEmail,
    } = selectedCategory;

    return { id, name, imageStorage, description };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async remove(@Param('id') id: string, @Request() req): Promise<DeletedItenCategoryDTO> {
    //NOTE: Verifying if this user is authorized
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );

    if (check) {
      const itenDeletedCategory = this.categoryService.delete(id);
      if (!itenDeletedCategory){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error to delete comment, please check data!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }else{
      const mesage = 'Iten '+ id +' deleted'
      return {mesage} 
    }
    } else {
      throw new UnauthorizedException(
        'You are not authorized to delete this category!',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The category has beenn successful updated' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Request() req: any,
  ): Promise<Category> {
    const categoryExists = await await this.categoryService.findById(id);
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    if (!categoryExists) {
      throw new NotFoundException({ error: 'This category does not exists' });
    }
    const authorId = (await this.categoryService.findById(id)).authorId;
    const userIsAuthorized = this.userService.findById(authorId);

    if (!userIsAuthorized) {
      throw new UnauthorizedException({
        error: 'You are not authorized to update this category!',
      });
    }

    return this.categoryService.update(id, createCategoryDTO);
  }
}
