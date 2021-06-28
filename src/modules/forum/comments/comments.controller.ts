import { FindAllModel } from './api-model/find-all-model';
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
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { Comment } from '@entities/comments.entity';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
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
import { CommentModel } from './dto/paginated-comments-dtio';
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
  findAll(@Query() query: QueryPage): Promise<FindAllModel> {
    const page = query.page;
    return this.commentService.findAll(page);
  }

  @Get('admin/list')
  @ApiCreatedResponse({ description: 'comment succesfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  adminFindAll(@Query() query: QueryPage): Promise<Comment[]> {
    const page = query.page;
    return this.commentService.adminFindAll(page);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'comment succesfully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UsePipes(ValidationPipe)
  async create(
    @Body() data: CreateCommentDTO,
    @Request() req,
  ): Promise<CommentModel> {
    const { authorization: token } = req.headers;
    await this.userService.authorizationCheck(token);
    const topic_id = data.topic_id;
    const topicAlreadyExists = await this.topicsService.findById(topic_id);

    if (!topicAlreadyExists) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Tópico não existe',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const { id, textBody, updated_at } = await this.commentService.create(
        data,
        token,
      );

      return {
        id,
        textBody,
        updated_at,
      };
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
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<CommentModel> {
    const token = req.headers.authorization;

    await this.userService.authorizationCheck(token);

    return this.commentService.findOneAndFetchUserAndTopic(id);
  }

  @Get(':id/admin')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The comments has been succesfful returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async AdminFindOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<CommentModel> {
    const token = req.headers.authorization;
    console.log(id)
    await this.userService.authorizationCheck(token);

    var resp = await this.commentService.adminFindOneAndFetchUserAndTopic(id);
    console.log(resp);
    return resp;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The comment has been successful deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    const token = req.headers.authorization;
    this.userService.authorizationCheck(token);

    const comment = await this.commentService.findOneAndFetchUserAndTopic(id);
    if (!comment) throw new BadRequestException('Comentário não existe');
    const user = await this.userService.findByToken(token);

    if (user.id === comment.userId || user.isAdmin) {
      await this.commentService.delete(id);
    } else {
      throw new UnauthorizedException({
        error: 'Você não está autorizado a deletar esse comentário!',
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
  ): Promise<CommentModel> {
    const token = req.headers.authorization;
    this.userService.authorizationCheck(token);
   

    const comment = await this.commentService.findOneAndFetchUserAndTopic(id);
    if (!comment) throw new BadRequestException('Comentário não existe');
    const user = await this.userService.findByToken(token);


    if (user.id === comment.userId || user.isAdmin) {
      return this.commentService.update(id, data);
    } else {
      throw new UnauthorizedException({
        error: 'Você não está autorizado a atualizar esse comentário!',
      });
    }
  }
}
