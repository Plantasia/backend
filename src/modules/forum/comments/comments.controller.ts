import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDTO } from './create-comment.dto';
import { Comment } from '../../../entities/comments.entity';
import { uuid } from 'uuidv4';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/profile/user/user.service';
import { TopicsService } from '../topics/topics.service';
@ApiTags('comments')
@Controller('forum/comments')
export class CommentController {
  constructor(
              private readonly commentService: CommentService,
              private readonly userService: UserService,
              private readonly topicsService: TopicsService
              ) {}

  
  @Get()
  @ApiCreatedResponse({description:"comment succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  findAll(@Query('page') page:number): Promise<Comment[]> {
    return this.commentService.findAll(page);
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({description:"comment succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  @UsePipes(ValidationPipe)
  async createComment(@Body() createCommentDTO: CreateCommentDTO, @Request() req): Promise<Comment> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    const user_id = createCommentDTO.user_id;
    const topic_id =createCommentDTO.topic_id;
   

  
    //NOTE: Checking both user and topic if they already exists
    const userAlreadyExists = await this.userService.findById(user_id)
    const topicAlreadyExists = await this.topicsService.findById(topic_id)

    console.log(` User Exists?  ==>${userAlreadyExists}`)

    console.log(` User Exists?  ==>${topicAlreadyExists}`)

    if(!userAlreadyExists || !topicAlreadyExists){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'User or Topic does not exists, please check data!',
      }, HttpStatus.FORBIDDEN);
    }

    else{
      return this.commentService.create(createCommentDTO);
    }

  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description:"The comments has been succesfful returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async findOne(@Param('id') id: string, @Request() req): Promise<Comment> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    return this.commentService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description:"The comment has been successful deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(req.headers.authorization)
    return this.commentService.delete(id);
  }
}
