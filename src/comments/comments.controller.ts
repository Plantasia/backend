import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { CommentService } from '../comments/comments.service';
import { CreateCommentDTO } from '../comments/create-comment.dto'
import { Comments } from '../comments/comments.entity';
import {uuid} from 'uuidv4';



@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ){}

  /*@Get()
  getHello(): string {
   return ('Hello World');
  }*/

  @Post()
  create( @Body() CreateCommentDTO:CreateCommentDTO):Promise<Comments>{
    return this.commentService.create(CreateCommentDTO);
  }

  //@Get()
  //findAll(): Promise<Comments>{

  //  return this.categoryService.findAll();
  //}



}
