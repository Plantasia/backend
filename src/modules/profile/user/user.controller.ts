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
  HttpException,
  Query,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import {  DeleteModel } from './dto/delete-user.dto';
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
import {FindAllModel} from './api-model/find-all-model';
import { User } from '@entities/user.entity';
import { UpdateUserDTO } from './dto/update-user-dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The users has been succesfull returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Get()
  async findAll(@Request() req, @Query() query: QueryPage): Promise<FindAllModel> {
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
    return this.userService.findByToken(token);
  }

  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'The user has been succesfull created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserModel> {
    const userAlreadyExists = await this.userService.checkIfAlreadyExists(
      data.email,
    );
    if (userAlreadyExists === undefined || !userAlreadyExists) {
      const createdUser = await this.userService.create(data);

      const { name, email, bio, id } = createdUser;

      return {
        name,
        email,
        bio,
        id,
      };
    } else {
      throw new ForbiddenException({
        error: `O email : ${data.email} já esta sendo usado!`,
      });
    }
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
      throw new NotFoundException(`Error: usuário com o  ID: ${idUser} não existe`);
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<DeleteModel> {
    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    const requestedUser = await this.findOneByToken(token);
    const userRequestedToDelete = await this.userService.findById(id);

    console.log(userRequestedToDelete);

    if (
      (userRequestedToDelete.id === requestedUser.id &&
        userRequestedToDelete.email === requestedUser.email) ||
      requestedUser.isAdmin === true
    ) {
      const deletedIten = this.userService.delete(id);
      if (!deletedIten) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Erro ao deletear esse usuário, por favor, verifique os dados!',
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

  // REFATORAR E DIVIDIR

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async update(
    @Param('id') idUser: string,
    @Body() data: UpdateUserDTO,
    @Request() req,
  ): Promise<UserModel> {
    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    const requestedUser = await await this.userService.findByToken(token);
    const userRequestedToUpdate = await this.userService.findById(idUser);

    if (!userRequestedToUpdate || userRequestedToUpdate === undefined) {
      throw new NotFoundException({ error: 'Esse usuário não existe' });
    }

    if (
      (userRequestedToUpdate.id === requestedUser.id &&
        userRequestedToUpdate.email === requestedUser.email) ||
      requestedUser.isAdmin === true
    ) {
      /**NOTE: Only these values below 'll be updated */
      userRequestedToUpdate.name = data.name;
      userRequestedToUpdate.bio = data.bio;
      userRequestedToUpdate.password = data.password;

      const user = await this.userService.update(
        userRequestedToUpdate.id,
        userRequestedToUpdate,
      );

      const { name, email, bio, id } = user;

      return user;
    }else{
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a atualizar essse usuário!',
      });
    }
  }

  @Get('admin')
  async adminFindAll(@Request() req, @Query() query: QueryPage):Promise<User[]> {
    const page = query.page;
    return this.userService.adminFindAll();
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Request() request,
    @UploadedFile() file: Express.Multer.File,
  ):Promise<string> {
    return this.userService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }
}
