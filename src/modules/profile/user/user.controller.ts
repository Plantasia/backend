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
  NotFoundException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
 async create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
 async findOne(@Param('id') id: string): Promise<User> {

   const foundUser = await this.userService.findById(id);

   if(!foundUser){

     throw new NotFoundException(`Error: user with ID: ${id} not exists`)
   }

    return this.userService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
 async remove(@Request() req, @Param('id') id: string): Promise<void> {
      /**
       * NOTE: Remember to ask user send password to
       * do this action (sooner)
       */
      console.log(req.user.email)
      console.log(req.user.id)
      
      /**
       * 
       * To authentication we 'll receive data for request
       * and confirm identity for the user who requests deleting
       *  
       */
      const userRequestedToDelete =  await this.userService.findById(id);
      
      console.log(userRequestedToDelete)

      if((userRequestedToDelete.id === req.user.id) &&(userRequestedToDelete.email ===  req.user.email) ){
        return  this.userService.remove(id)
      }
      else{
        
        throw new UnauthorizedException({error:"You are not permitted to remove this user!"})
        
      }
       
   
  }

  
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
