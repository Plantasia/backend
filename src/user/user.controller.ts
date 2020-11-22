import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import  User  from './user.entity';
import {uuid} from 'uuidv4';
import {JwtAuthGuard} from '../auth/jwt-auth.guard'



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @UseGuards(JwtAuthGuard) 
  @Get()
  findAll(): Promise<User[]>{
    return this.userService.findAll()

  }

  @Post()
  create( @Body() createUserDTO:CreateUserDTO):Promise<User>{
    return this.userService.create(createUserDTO);
  }

  @Get(':id')
   findOne(@Param('id') id:string): Promise<User>{

    return this.userService.findOne(id);
   }

   @Delete(':id')
   remove(@Param('id') id:string): Promise<void>{
    return this.userService.remove(id)
   }



}