import { QueryPage } from './../../../utils/page';
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
  HttpStatus
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { DeletedItenUserDTO } from './delete-user.dto';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'  //' ' auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  async findAll(@Request() req, @Query('page') page: number) {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
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
 @Get("/findme")
 async findOneByToken(@Request() req){

  const token =  req.headers.authorization;
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
  async create(@Body() createUserDTO: CreateUserDTO): Promise<Partial<User>> {
    const userAlreadyExists = await this.userService.checkIfAlreadyExists(
      createUserDTO.email,
    );
    if (userAlreadyExists === undefined || !userAlreadyExists) {
      const createdUser = await this.userService.create(createUserDTO);

      const { name, email, bio, id } = createdUser;

      return {
        name,
        email,
        bio,
        id,
      };
    } else {
      throw new ForbiddenException({
        error: `The email : ${createUserDTO.email}    is already used!`,
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
  async findOne(@Param('id') idUser: string): Promise<Partial<User>> {
    const foundUser = await this.userService.findById(idUser);

    if (!foundUser) {
      throw new NotFoundException(`Error: user with ID: ${idUser} not exists`);
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
  async remove(@Request() req, @Param('id') id: string): Promise<DeletedItenUserDTO> {
    const token =  req.headers.authorization
    const check = await this.userService.authorizationCheck(
     token,
    );
    const requesterUser =  await this.findOneByToken(token)
    const userRequestedToDelete = await this.userService.findById(id);

    console.log(userRequestedToDelete);

    if (
      userRequestedToDelete.id === requesterUser.id &&
      userRequestedToDelete.email === requesterUser.email ||
      requesterUser.isAdmin === true
    ) {
      const deletedIten = this.userService.delete(id)
      if (!deletedIten){
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Error to delete comment, please check data!',
          },
          HttpStatus.BAD_REQUEST,
        );
      }else{
        const mesage = 'Iten '+ id +' deleted'
        return {
          mesage: mesage
        };
      }
    } else {
      throw new UnauthorizedException({
        error: 'You are not permitted to remove this user!',
      });
    }
  }

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
    @Body() createUserDTO: CreateUserDTO,
    @Request() req,
  ): Promise<Partial<User>> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const requesterUser = await this.findOneByToken(token)
    const userRequestedToUpdate = await this.userService.findById(idUser);

    if (!userRequestedToUpdate || userRequestedToUpdate === undefined) {
      throw new NotFoundException({ error: 'This user does not exists' });
    }

    if (
      userRequestedToUpdate.id === requesterUser.id &&
      userRequestedToUpdate.email === requesterUser.email ||
      requesterUser.isAdmin === true
    ) {
      /**NOTE: Only these values below 'll be updated */
      userRequestedToUpdate.name = createUserDTO.name;
      userRequestedToUpdate.bio = createUserDTO.bio;
      userRequestedToUpdate.password = createUserDTO.password;
      const { name, email, bio, id } = userRequestedToUpdate;

      return {
        name,
        email,
        bio,
        id,
      };
    } else {
      throw new UnauthorizedException({
        error: 'You are not permitted to update this user!',
      });
    }
  }
}
