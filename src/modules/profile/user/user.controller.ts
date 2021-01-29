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
  HttpException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)

  @ApiOkResponse({description:"user succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiCreatedResponse({description:"user succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @UsePipes(ValidationPipe)

  @Post()
 async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    
   const email = createUserDTO.email
   
    const userAlreadyExists = await this.userService.checkIfAlreadyExists(email)
    console.log(userAlreadyExists);

    if(!userAlreadyExists){ 
      return this.userService.create(createUserDTO);
    }
    else{
       throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This user already exists, please choose another email',
      }, HttpStatus.FORBIDDEN);
    }
  }





  @ApiOkResponse({description:"user succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {

   const foundUser = await this.userService.findById(id);

   if(!foundUser){

     throw new NotFoundException(`Error: user with ID: ${id} not exists`)
   }

    return this.userService.findOne(id);
  }



  @ApiOkResponse({description:"user succesfully deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string): Promise<void> {

      console.log(req.user.email)
      console.log(req.user.id)
      
      const userRequestedToDelete =  await this.userService.findById(id);
      
      console.log(userRequestedToDelete)

      if((userRequestedToDelete.id === req.user.id) &&(userRequestedToDelete.email ===  req.user.email) ){
        return  this.userService.remove(id)
      }
      else{
        
        throw new UnauthorizedException({error:"You are not permitted to remove this user!"})
        
      }
  }



  @ApiOkResponse({description:"user succesfully updated"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
  @Param('id') id: string,
  @Body() data: CreateUserDTO,
  @Request() req ): Promise<User> {

      /**
       * NOTE: Remember to ask user send password to
       * do this action (sooner)
       */
      console.log(req.user.email)
      console.log(req.user.id)
      
      const userRequestedToUpdate =  await this.userService.findById(id);
      
      console.log(userRequestedToUpdate)


      if((userRequestedToUpdate.id === req.user.id) &&(userRequestedToUpdate.email ===  req.user.email) ){
        return  this.userService.update(id, data)
      }
      else{
        throw new UnauthorizedException({error:"You are not permitted to update this user!"})
      }
  }
}
