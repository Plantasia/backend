import { LocalAuthGuard } from './../../../auth/local-auth.guard';
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
  HttpStatus,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import {  DeletedItemUserDTO } from './delete-user.dto';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'  //' ' auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
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
    async findAll(@Request() req, @Query() query:QueryPage) {
      console.log(req.headers.authorization);
    
      const userAlreadyExists = await this.userService.findByEmail(req.user.email);
      
      const check = await this.userService.authorizationCheck(
        req.headers.authorization,
        );
        if (userAlreadyExists === undefined || !userAlreadyExists) {
          //const createdUser = await this.userService.create(createUserDTO);
          
          //const { name, email, bio, id } = createdUser;
          
          return {
           /* name,
            email,
            bio,
            id, */
          };
        } else {
          throw new ForbiddenException({
          error: `The email : ${/*createUserDTO.email*/}    is already used!`,
          });
        }
      }
 
    
    
    @UseGuards(JwtAuthGuard)
    @Get("/findme")
    @UseGuards(LocalAuthGuard)
    @Get("findme")
    async findOneByToken(@Request() req){
      
      const token =  req.headers.authorization;
      return this.userService.findByToken(token);
      
    }
    
    
    /*@UsePipes(ValidationPipe)
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
    @UseGuards(JwtAuthGuard)
    @UseGuards(LocalAuthGuard)

    }*/

    
      
      
      /*@Delete(':id')
      @UseGuards(JwtAuthGuard)
      @ApiOkResponse({ description: 'The user has been succesfull deleted' })
      @ApiBadRequestResponse({ description: 'Bad request' })
      @ApiHeader({
        name: 'JWT',
        description: 'JWT token must to be passed to do this request',
      })
      async remove(@Request() req, @Param('id') id: string): Promise<DeletedItemUserDTO> {
        const token =  req.headers.authorization
        const check = await this.userService.authorizationCheck(
          token,
          );
          const requestedUser =  await this.findOneByToken(token)
          const userRequestedToDelete = await this.userService.findById(id);
        
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
        } */
        
        /*@Get(':id')
        @UseGuards(JwtAuthGuard)
        @ApiOkResponse({ description: 'The user has been succesfull returned' })
        @ApiForbiddenResponse({ description: 'Forbidden' })
        @ApiHeader({
          name: 'JWT',
          description: 'JWT token must to be passed to do this request',
        })
        async findOne(@Param('id') idUser: string): Promise<Partial<User>> {
          const foundUser = await this.userService.findById(idUser);
          
          console.log(userRequestedToDelete);
          
          if (
            userRequestedToDelete.id === requestedUser.id &&
            userRequestedToDelete.email === requestedUser.email ||
            requestedUser.isAdmin === true) {
              const deletedItem = this.userService.delete(id)

              if (!deletedItem){
                throw new HttpException({

                    status: HttpStatus.BAD_REQUEST,
                    error: 'Error when deleting comment, please check data!',
                    
                  },
                  HttpStatus.BAD_REQUEST);

                }else{
                  const message = 'Item '+ id +' deleted'
                  return {
                    message
                  };
                }

            } else {
                throw new UnauthorizedException({
                  error: 'You are not permitted to remove this user!',
                });
            }
          }*/
            
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
                  const requestedUser = await this.findOneByToken(token)
                  const userRequestedToUpdate = await this.userService.findById(idUser);
                  
                if (!userRequestedToUpdate || userRequestedToUpdate === undefined) {
                    throw new NotFoundException({ error: 'This user does not exists' });
                  }
                  
                if (userRequestedToUpdate.id === requestedUser.id &&
                    userRequestedToUpdate.email === requestedUser.email ||
                    requestedUser.isAdmin === true) {
                     
                      userRequestedToUpdate.name = createUserDTO.name;
                      userRequestedToUpdate.bio = createUserDTO.bio;
                      userRequestedToUpdate.password = createUserDTO.password;
                      const { name, email, bio, id } = userRequestedToUpdate;
                      
                      return this.userService.update(id,userRequestedToUpdate)
                      
                    }
                  }
                  
                  @Get('admin')
                  async adminFindAll(@Request() req, @Query() query:QueryPage) {
                    const page = query.page;
                    return this.userService.adminFindAll(); //passamos a variavel page como parametro do metodo FindAll
                    
                  }
                  
                  
                  
                  
                  
                  
                  
                }
                