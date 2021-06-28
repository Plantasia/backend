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
import { UpdateCategoryDTO } from './dto/update-category.dto';
import FindAllComboboxModel from './api-model/find-all-combobox-model';
import { FilesService } from '@src/modules/image/imageS3.service';

@ApiTags('categories')
@Controller('forum/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly fileService: FilesService,
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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: CreateCategoryDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateModel> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const { id: authorId, isAdmin } = await this.userService.findByToken(token);
    const { name, description } = data;

    const { path } = await this.fileService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );

    const exists = await this.categoryService.findByName(name);
    if (isAdmin === true) {
      if (!exists) {
        return await this.categoryService.create({
          name,
          authorId,
          description,
          imageStorage: path,
        });
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

  @ApiHeader({
    name: 'Bearer Token',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/admin')
  @ApiCreatedResponse({ description: 'Categoria criada com sucesso!' })
  @ApiForbiddenResponse({
    description:
      'Ação não autorizada: Somente um admin pode criar uma categoria',
  })
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async createWithoutUpload(
    @Body() data: CreateCategoryDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateModel> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const { id: authorId, isAdmin } = await this.userService.findByToken(token);
    const { name, description } = data;

    const exists = await this.categoryService.findByName(name);

    if (isAdmin === true) {
      if (!exists) {
        return await this.categoryService.create({
          name,
          authorId,
          description,
        });
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
  @ApiOkResponse({ description: 'Listar todas as categorias' })
  @ApiBadRequestResponse({ description: 'Erro! revise os dados enviados' })
  async findAll(@Query() query: QueryPage): Promise<FindAllModel> {
    const page = query.page;
    console.log(page);
    return this.categoryService.findAll(page);
  }

  @Get('admin/list')
  @ApiOkResponse({ description: 'The categories has been succesfful returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async adminFindAll(): Promise<Category[]> {
    console.log('list admin');
    return this.categoryService.adminFindAll();
  }

  @Get('/combobox')
  @ApiOkResponse({ description: 'The category has been successful deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async find(@Request() req): Promise<FindAllComboboxModel> {
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
    await this.userService.authorizationCheck(req.headers.authorization);

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
    await this.userService.authorizationCheck(token);
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
    this.userService.authorizationCheck(req.headers.authorization);
    return this.categoryService.AdminFindOne(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'The category has beenn successful updated' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDTO,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateModel> {
    const categoryExists = await this.categoryService.adminFindById(id);
    console.log('category');
    console.log(categoryExists);

    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    if (!categoryExists) {
      throw new NotFoundException({ error: 'Essa categoria não existe ' });
    }
    const user = await this.userService.findByToken(token);
    console.log('data');
    console.log(data);
    const { description, name, imageStorage, deleted_at, isActive } = data;
    if (user.isAdmin == false) {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a atualizar essa categoria!',
      });
    }

    return this.categoryService.updateAdmin(id, {
      description,
      deleted_at,
      isActive,
      name,
      imageStorage,
    });
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
    await this.userService.authorizationCheck(token);
    const requesterUser = await this.userService.findByToken(token);
    const { path, url } = await this.fileService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );
    console.log("url")
    console.log(url)
    if (requesterUser.isAdmin === true) {
      return this.categoryService.update(id, {
        imageStorage: url,
      });
    } else {
      throw new UnauthorizedException({
        error: 'Você não está autorizado a atualizar essa categoria!',
      });
    }
  }
}
