import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDTO } from './create-comment.dto';
import { Comment } from '../../../entities/comments.entity';
import { uuid } from 'uuidv4';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {
    return this.commentService.create(createCommentDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(id);
  }
}
