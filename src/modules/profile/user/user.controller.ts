import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  Response,
  UseGuards,
  HttpStatus,
  UsePipes,
  Request,
  UnauthorizedException
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
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string): Promise<void> {
    const userIdSession = req.session.userId ;
     console.log(userIdSession)
    if(userIdSession ===id){
      return this.userService.remove(id);
    }
    else{
      throw new UnauthorizedException({error:"Unauthorized user!"});
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, createUserDTO);
  }
}
