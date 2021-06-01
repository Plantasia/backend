import { FindAllModel } from './api-model/find-all.model';
import { CreateModel } from './api-model/create-model';
import { QueryPage } from '@utils/page';
import { FileInterceptor } from '@nestjs/platform-express';
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from '../../../entities/category.entity';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { UserService } from 'src/modules/profile/user/user.service';
import FindOneModel from './api-model/find-one-model';
import { DeleteModel } from './dto/delete-model.dto';
import UpdateModel from './api-model/update-model';
<<<<<<< HEAD
import { UpdateCategoryDTO } from './dto/update-category.dto';
=======
import FindAllComboboxModel from './api-model/find-all-combobox-model';
>>>>>>> 07fdefea9f446ca5ea1ead5d04d995da5f46cacc

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
  @ApiCreatedResponse({ description: 'Categoria criada com sucesso!' })
  @ApiForbiddenResponse({
    description:
      'Ação não autorizada: Somente um admin pode criar uma categoria',
  })
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Request() req,
  ): Promise<CreateModel> {
    const token = req.headers.authorization;

    const check = await this.userService.authorizationCheck(token);

    const author = await this.userService.findByToken(token);
    createCategoryDTO.authorEmail = author.email;
    createCategoryDTO.authorId = author.id;
    const requestedName = createCategoryDTO.name;
    const exists = await this.categoryService.findByName(requestedName);
    if (author.isAdmin === true) {
      if (!exists) {
        const newCategory = await this.categoryService.create(
          createCategoryDTO,
        );
        const { id, name, imageStorage } = newCategory;

        return {
          id,
          name,
          imageStorage,
        };
      } else {
        throw new HttpException(
          `Já existe uma categoria cadastrada com esse nome!`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new UnauthorizedException({
        error: 'Somente um administrador pode criar categorias!',
      });
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Categp' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findAll(@Query() query: QueryPage): Promise<FindAllModel> {
    const page = query.page;
    console.log(page);
    return this.categoryService.findAll(page);
  }

  @Get('admin')
  @ApiOkResponse({ description: 'The categories has been succesfful returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async adminFindAll(@Query() query: QueryPage): Promise<Category[]> {
    const page = query.page;
    console.log(page);
    return this.categoryService.adminFindAll();
  }

  @Get('/combobox')
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async find(
    @Request() req,
  ): Promise<FindAllComboboxModel> {
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );

    return this.categoryService.findCombobox();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOne(
    @Param('id') categoryId: string,
    @Request() req,
  ): Promise<FindOneModel> {
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );

    const {
      id,
      name,
      imageStorage,
      description,
      authorId,
      authorEmail,
    } = await this.categoryService.findOne(categoryId);

    return { id, name, imageStorage, description, authorEmail, authorId };
  }

 

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async remove(@Param('id') id: string, @Request() req): Promise<DeleteModel> {
    //NOTE: Verifying if this user is authorized
    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    const author = await this.userService.findByToken(token);
    if (author.isAdmin === true) {
      const deletedItem = this.categoryService.delete(id);
      if (!deletedItem) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Erro ao deletar categoria',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const message = 'Categoria ' + id + ' foi  deletada';
        return { message };
      }
    } else {
      throw new UnauthorizedException(
        'Você não está autorizado a deletar essa categoria',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('admin/:id')
  async adminFindOne(
    @Param('id') categoryId: string,
    @Request() req,
  ): Promise<Category> {
    return this.categoryService.findOne(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The category has beenn successful updated' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDTO,
    @Request() req: any,
  ): Promise<UpdateModel> {
    const categoryExists = await await this.categoryService.findById(id);
    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    if (!categoryExists) {
      throw new NotFoundException({ error: 'Essa categoria não existe ' });
    }
    const authorId = (await this.categoryService.findById(id)).authorId;
    const userIsAuthorized = this.userService.findById(authorId);

    if (!userIsAuthorized) {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a ataualizar essa categoria!',
      });
    }

    return this.categoryService.update(id, data);
  }
  @Post('image/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Request() req,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    const requesterUser = this.userService.findByToken(token);
    if ((await requesterUser).isAdmin === true) {
      return this.categoryService.addImage(id, file.buffer, file.originalname);
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a ataualizar essa categoria!',
      });
    }
  }
}
