import { Body, Controller, Delete, Get, Param, Post, Render, UseGuards } from '@nestjs/common';
import { CommentService } from '../comments/comments.service';
import { CreateCommentDTO } from '../comments/create-comment.dto'
import { Comment } from '../comments/comments.entity';
import {uuid} from 'uuidv4';
import {JwtAuthGuard} from '../auth/jwt-auth.guard'




@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Comment[]>{
    return this.commentService.findAll()

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create( @Body() createCommentDTO:CreateCommentDTO):Promise<Comment>{
    return this.commentService.create(createCommentDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
   findOne(@Param('id') id:string): Promise<Comment>{

    return this.commentService.findOne(id);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   remove(@Param('id') id:string): Promise<void>{
    return this.commentService.remove(id)
   }



}
