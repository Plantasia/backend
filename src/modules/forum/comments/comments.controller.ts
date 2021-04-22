import { QueryPage } from './../../../utils/page';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDTO } from './create-comment.dto';
import { DeletedItenCommentDTO } from './delete-comment.dto';
import { Comment } from '../../../entities/comments.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/modules/profile/user/user.service';
import { TopicsService } from '../topics/topics.service';
@ApiTags('comments')
@Controller('forum/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly topicsService: TopicsService,
  ) {}

  @Get()
  @ApiCreatedResponse({ description: 'comment succesfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll(@Query() query: QueryPage ) {
  
    const page = query.page;
    return this.commentService.findAll(page);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'comment succesfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO,
    @Request() req,
  ): Promise<Comment> {
    const token =  req.headers.authorization
    const userAlreadyExists = await this.userService.authorizationCheck(
      token,
    );
    const topic_id = createCommentDTO.topic_id;
    const topicAlreadyExists = await this.topicsService.findById(topic_id);
    //We do not use the userID, but the token, is this   if (!userAlreadyExists) necessary?
    if (!userAlreadyExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User does not exists, please check data!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    else if (!topicAlreadyExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Topic does not exists, please check data!',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      return this.commentService.create(createCommentDTO, token);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The comments has been succesfful returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async findOne(@Param('id') id: string, @Request() req): Promise<Comment> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    return this.commentService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The comment has been successful deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async remove(@Param('id') id: string, @Request() req): Promise<DeletedItenCommentDTO> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const deletedIten = this.commentService.delete(id);
    if (!deletedIten){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error to delete comment, please check data!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }else{
      const mesage = 'Iten '+ id +' deleted'
      return {
        mesage: mesage
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The comment has beenn successful updated' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id') id: string,
    @Body() createCommentDTO: CreateCommentDTO,
    @Request() req: any,
  ): Promise<Comment> {
    const categoryExists = await await this.commentService.findOne(id);
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );
    if (!categoryExists) {
      throw new NotFoundException({ error: 'This Comment does not exists' });
    }

    return this.commentService.update(id, createCommentDTO);
  }
}
