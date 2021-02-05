import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/profile/user/user.service';
import { TopicsService } from '../topics/topics.service';
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
              private readonly commentService: CommentService,
              private readonly usersService: UserService,
              private readonly topicsService: TopicsService
              ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCreatedResponse({description:"comment succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({description:"comment succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  @UsePipes(ValidationPipe)
  async create(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {

    const user_id = createCommentDTO.user_id;
    const topic_id =createCommentDTO.topic_id;
   
    /**
     * NOTE: Checking both user and topic if they already exists
     * 
     */
    const userAlreadyExists = await this.usersService.findById(user_id)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({description:"The comments has been succesfful returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({description:"The comment has been successful deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(id);
  }
}
