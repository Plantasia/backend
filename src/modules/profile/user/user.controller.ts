import { QueryPage } from '@utils/page';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  UsePipes,
  Request,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
  HttpException,
  Query,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { DeleteModel } from './dto/delete-user.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard'; //' ' auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import UserModel from './api-model/user-default-model';
import { FindAllModel } from './api-model/find-all-model';
import { User } from '@entities/user.entity';
import { UpdateUserDTO } from './dto/update-user-dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { FilesService } from '@src/modules/image/imageS3.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly filesService: FilesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The users has been succesfull returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Get()
  async findAll(
    @Request() req,
    @Query() query: QueryPage,
  ): Promise<FindAllModel> {
    console.log(req.headers.authorization);

    const thisUser = await this.userService.findByEmail(req.user.email);

    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );

    const page = query.page;
    const paginatedUsers = await this.userService.findAll(page); //passamos a variavel page como parametro do metodo FindAll
    const {
      users,
      currentPage,
      prevPage,
      nextPage,
      perPage,
      totalRegisters,
    } = paginatedUsers;

    return {
      users,
      currentPage,
      prevPage,
      nextPage,
      perPage,
      totalRegisters,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('findme')
  async findOneByToken(@Request() req) {
    const token = req.headers.authorization;
    return this.userService.findMe(token);
  }

  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'O usuário foi criado com sucesso!' })
  @ApiBadRequestResponse({ description: 'Erro na requisição! Bad Request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserModel> {
    await this.userService.checkIfAlreadyExists(data.email);
    return await this.userService.create(data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async findOne(@Param('id') idUser: string): Promise<UserModel> {
    const foundUser = await this.userService.findById(idUser);

    if (!foundUser) {
      throw new NotFoundException(
        `Error: usuário com o  ID: ${idUser} não existe`,
      );
    }

    const selectedUser = await this.userService.findOne(idUser);
    const { name, email, bio, id } = selectedUser;

    return {
      name,
      email,
      bio,
      id,
    };
  }

  @Get(':id/admin')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  
  async AdminFindOne(@Param('id') idUser: string): Promise<UserModel> {
    const foundUser = await this.userService.AdminFindById(idUser);

    if (!foundUser) {
      throw new NotFoundException(
        `Error: usuário com o  ID: ${idUser} não existe`,
      );
    }

    return this.userService.adminFindOne(idUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async remove(@Request() req, @Param('id') id: string): Promise<DeleteModel> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const requestedUser = await this.userService.findByToken(token);
    const userRequestedToDelete = await this.userService.findById(id);

    console.log(userRequestedToDelete);

    if (
      (userRequestedToDelete.id === requestedUser.id &&
        userRequestedToDelete.email === requestedUser.email) ||
      requestedUser.isAdmin
    ) {
      const deletedIten = this.userService.delete(id);
      if (!deletedIten) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Erro ao deletear esse usuário, por favor, verifique os dados!',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const message = 'Item ' + id + ' deletado';
        return {
          message,
        };
      }
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a remover esse usuário!',
      });
    }
  }

  @Post('update')
 // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async updateUser(
    @Body() data: UpdateUserDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserModel> {
    console.log("aqui!!!")
    const { authorization: token } = req.headers;
    await this.userService.authorizationCheck(token);
    const user = await this.userService.findByToken(token);
    const { bio, name ,deleted_at,isActive, isAdmin  } = data;

    if (file) {
      const { path, url } = await this.filesService.uploadPublicFile(
        file.buffer,
        file.originalname,
      );
      return await this.userService.update(user.id, {
        avatar: path,
        bio,
        name,
        deleted_at,
        isActive,
        isAdmin
      });
    }

    return await this.userService.update(user.id, {
      bio,
      name,
    });
  }

  @Post('admin/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async adminUpdate(
    @Body() data: UpdateUserDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id:string,
  ): Promise<UserModel> {
    const { authorization: token } = req.headers;
    const check = await this.userService.adminAuthorizationCheck(token);

    console.log("auth")
    console.log(check)
    const user = await this.userService.adminFindByToken(token);
    
    console.log("aqui")
    console.log(data)

    if (file) {
      const { path, url } = await this.filesService.uploadPublicFile(
        file.buffer,
        file.originalname,
      );
      return await this.userService.adminUpdate(user.id, {
        avatar: path,
        name: data.name,
        bio:data.bio,
        isAdmin: data.isAdmin,
        deleted_at: data.deleted_at
      });
    }

    return await this.userService.adminUpdate(user.id, {
      bio: data.bio,
      isAdmin: data.isAdmin,
      name: data.name,
      deleted_at: data.deleted_at
    }
    );
  }

  @Patch('/changePassword')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async updatePassword(
    @Body() data: UpdatePasswordDTO,
    @Request() req,
  ): Promise<{ message: string }> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    await this.userService.updatePassword(token, data);

    return { message: 'Senha alterada com sucesso' };
  }


  @Get('admin/findall')
  async adminFindAll(
    @Request() req,
    @Query() query: QueryPage,
  ): Promise<User[]> {
    const page = query.page;
    return this.userService.adminFindAll();
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Request() request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    console.log(request.user)
    var url = await  this.userService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
    return url;
  }
}
