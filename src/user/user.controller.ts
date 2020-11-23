import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res,Response, UseGuards, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import {User} from './user.entity';
import {uuid} from 'uuidv4';
import {JwtAuthGuard} from '../auth/jwt-auth.guard'



@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]>{
    return this.userService.findAll()

  }

  @Post()
  create(@Res() res:Response, @Body() createUserDTO:CreateUserDTO):Promise<User>{
    //res.status(HttpStatus.OK).json([this.userService.create(createUserDTO)]); 
    return null
  }

  @Get(':id')
   findOne(@Param('id') id:string): Promise<User>{

    return this.userService.findOne(id);
   }

   @Delete(':id')
   remove(@Param('id') id:string): Promise<void>{
    return this.userService.remove(id)
   }

   @Put(':id')
   update(@Param('id') id:string, @Body() createUserDTO:CreateUserDTO): Promise<User>{
    return this.userService.update(id, createUserDTO);
   }


}