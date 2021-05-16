
import { QueryPage } from '@utils/page';
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
  UnauthorizedException
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDTO } from './create-comment.dto';
import { UpdateCommentDTO } from './update-comment.dto'
import { DeletedItemCommentDTO } from './delete-comment.dto';
import { Comment } from '../../../entities/comments.entity';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiForbiddenResponse,
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
  @ApiBadRequestResponse({ description: 'Bad request' })
  findAll(@Query() query: QueryPage ) {
  
    const page = query.page;
    return this.commentService.findAll(page);
  }

  @Get('admin')
  @ApiCreatedResponse({ description: 'comment succesfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  adminFindAll(@Query() query: QueryPage ) {
  
    const page = query.page;
    return this.commentService.adminFindAll(page);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'comment succesfully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UsePipes(ValidationPipe)
  async createComment(
    @Body() data: CreateCommentDTO,
    @Request() req,
  ): Promise<Comment> {
    const token =  req.headers.authorization
    const userAlreadyExists = await this.userService.authorizationCheck(
      token,
    );
    const topic_id = data.topic_id;
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
      return this.commentService.create(data, token);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The comments has been succesfful returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
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
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async remove(@Param('id') id: string, @Request() req): Promise<DeletedItemCommentDTO> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const author = this.commentService.findOne(id)
    const requesterUser = this.userService.findByToken(token)
    if ((await author).user.id === (await requesterUser).id ||
    (await requesterUser).isAdmin === true
    ){
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
          const message = 'Item '+ id +' deleted'

          return {message};
      
        }
      }else{
        throw new UnauthorizedException({
          error: 'You are not permitted to remove this comment!',
        });
      }
    
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'The comment has beenn successful updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCommentDTO,
    @Request() req: any,
  ): Promise<Comment> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const author = this.commentService.findOne(id)
    const requesterUser = this.userService.findByToken(token)
    if ((await author).user.id === (await requesterUser).id ||
    (await requesterUser).isAdmin === true
    ){
        return this.commentService.update(id, data);
    }else{
      throw new UnauthorizedException({
        error: 'You are not permitted to update this comment!',
      });
    }
  }
}
