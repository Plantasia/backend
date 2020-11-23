import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { CommentService } from '../comments/comments.service';
import { CreateCommentDTO } from '../comments/create-comment.dto'
import { Comment } from '../comments/comments.entity';
import {uuid} from 'uuidv4';



@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ){}

  @Get()
  findAll(): Promise<Comment[]>{
    return this.commentService.findAll()

  }


  @Post()
  create( @Body() createCommentDTO:CreateCommentDTO):Promise<Comment>{
    return this.commentService.create(createCommentDTO);
  }

  @Get(':id')
   findOne(@Param('id') id:string): Promise<Comment>{

    return this.commentService.findOne(id);
   }

   @Delete(':id')
   remove(@Param('id') id:string): Promise<void>{
    return this.commentService.remove(id)
   }



}
