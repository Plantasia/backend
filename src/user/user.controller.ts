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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { User } from './user.entity';
import { uuid } from 'uuidv4';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
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
