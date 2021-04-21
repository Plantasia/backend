import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Request,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  ParseIntPipe,
  Query,
  Header
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { User } from '@entities/user.entity';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'The users has been succesfull returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Get()
  async findAllIfLogged(@Request() req, @Query('page') page: number) {
    console.log(req.headers.authorization);

    const thisUser = await this.userService.findByEmail(req.user.email);

    console.log(`\n\n\n:::::::This user (logged)::::::: \n`);
    console.log(thisUser);

    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
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
 
 @Get("/findme")
 async findOneByToken(@Request() req){

  const token =  req.headers.authorization;
  console.log("$$$$$")
  console.log(req);
  return this.userService.findByToken(token);
 }

  @Get()
  async findAll(@Request() req, @Query('page') page: number) {
    console.log(req.headers.authorization);

   
    const thisUser = await this.userService.findByEmail(req.user.email);

    console.log(`\n\n\n:::::::This user (logged)::::::: \n`);
    console.log(thisUser);

    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
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

  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'The user has been succesfull created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<Partial<User>> {
    const userAlreadyExists = await this.userService.checkIfAlreadyExists(
      createUserDTO.email,
    );
    console.log('****User already exists?****\n');
    console.log(userAlreadyExists);
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
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
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
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async remove(@Request() req, @Param('id') id: string): Promise<void> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    console.log('thisUser\n\n');
    console.log(thisUser);
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );

    console.log(req.user.email);
    console.log(req.user.id);

    /**
     * For authentication we 'll receive data for request
     * and confirm user's identity for allow deleting
     **/
    const userRequestedToDelete = await this.userService.findById(id);

    console.log(userRequestedToDelete);

    if (
      userRequestedToDelete.id === req.user.id &&
      userRequestedToDelete.email === req.user.email
    ) {
      /**Soft delete applied */
      const now = new Date();
      userRequestedToDelete.deleted_at = now;
    } else {
      throw new UnauthorizedException({
        error: 'You are not permitted to remove this user!',
      });
    }
  }

  @Put(':id')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'The user has been succesfull deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async update(
    @Param('id') idUser: string,
    @Body() createUserDTO: CreateUserDTO,
    @Request() req,
  ): Promise<Partial<User>> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );

    console.log('\n\n\n****This User\n\n');
    console.log(thisUser);

    console.log('\n\n\n*****req.user.email*****\n');
    console.log(req.user.email);
    console.log('\n\n\n*****req.user.id*****\n');
    console.log(req.user.id);

    const userRequestedToUpdate = await this.userService.findById(idUser);

    if (!userRequestedToUpdate || userRequestedToUpdate === undefined) {
      throw new NotFoundException({ error: 'This user does not exists' });
    }

    if (
      userRequestedToUpdate.id === req.user.id &&
      userRequestedToUpdate.email === req.user.email
    ) {
      /**NOTE: Only these values below 'll be updated */
      userRequestedToUpdate.name = createUserDTO.name;
      userRequestedToUpdate.bio = createUserDTO.bio;
      userRequestedToUpdate.password = createUserDTO.password;

      console.log(userRequestedToUpdate);

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
