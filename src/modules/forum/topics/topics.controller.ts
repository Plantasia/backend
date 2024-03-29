import { FindOneModel } from './api-model/find-one-model';
import { TopicModel } from './api-model/topic-default-model';

import { QueryPage } from '@utils/page';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  UnauthorizedException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from '@entities/topic.entity';
import { CreateTopicDTO } from './dto/create-topic-dto';
import { UpdateTopicDTO } from './dto/update-topic.dto';
import { DeletedItemTopicDTO } from './dto/delete-topic.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from '../../profile/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindAllModel } from './api-model/find-all-model';
import { CreateTopicParams } from './api-model/create-model';
import { FilesService } from '@src/modules/image/imageS3.service';

@ApiTags('topics')
@Controller('forum/topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly userService: UserService,
    private readonly fileService: FilesService,
  ) {}

  @Get(':topicId')
  async getTopicById(@Param('topicId') topicId: string): Promise<FindOneModel> {
    return this.topicsService.takeTopicData(topicId);
  }

  @Get(':topicId/admin')
  async adminGetTopicById(
    @Param('topicId') topicId: string,
  ): Promise<FindOneModel> {
    return this.topicsService.adminTakeOnlyTopicData(topicId);
  }

  @ApiOkResponse({ description: 'topic succesfully returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  async findAll(
    @Query() query: QueryPage & { category: string | null },
  ): Promise<FindAllModel> {
    const { page, category } = query;
    return this.topicsService.findAll(page, category);
  }

  @ApiOkResponse({ description: 'topic succesfully returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('admin/list')
  async adminFindAll(): Promise<Topic[]> {
    return this.topicsService.adminFindAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'topic succesfully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTopicDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<TopicModel> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const user = await this.userService.findByToken(token);
    const topic = await this.topicsService.findOneAndFetchUser(id);
    const { textBody, name, imageStorage, deleted_at, isActive } = data;
    
    console.log("data received")
    console.log(data)

    if (user.isAdmin) {
      return this.topicsService.update(topic.id, {
        textBody,
        name,
        imageStorage,
        deleted_at,
        isActive
      });
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a atualizar esse tópico!',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'topic succesfully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Patch(':id/admin')
  @UseInterceptors(FileInterceptor('file'))
  async updateAdmin(
    @Param('id') id: string,
    @Body() data: UpdateTopicDTO,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<TopicModel> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const user = await this.userService.findByToken(token);
    const topic = await this.topicsService.findOneAndFetchUser(id);
    const { textBody, name, imageStorage, deleted_at, isActive } = data;

    console.log("data received")
    console.log(data)

    if (user.isAdmin) {
      return this.topicsService.adminUpdate(topic.id, {
        textBody,
        name,
        imageStorage,
        deleted_at,
        isActive
      });
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a atualizar esse tópico!',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @ApiCreatedResponse({ description: 'topic succesfully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: CreateTopicParams,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<TopicModel> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const { id: user_id } = await this.userService.findByToken(token);
    const { textBody, name, category_id } = data;

    if (file) {
      const { path } = await this.fileService.uploadPublicFile(
        file.buffer,
        file.originalname,
      );

      return await this.topicsService.create({
        category_id,
        name,
        textBody,
        user_id,
        imageStorage: path,
      });
    }
    return await this.topicsService.create({
      category_id,
      name,
      textBody,
      user_id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'topic succesfully deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Request() req,
  ): Promise<DeletedItemTopicDTO> {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const { user: author } = await this.topicsService.findOne(id);
    const user = await this.userService.findByToken(token);
    console.log('topic_author', author);

    if (author.id === user.id || user.isAdmin) {
      await this.topicsService.delete(id);
      return { message: 'Tópico deletado' };
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a deletar esse tópico!',
      });
    }
  }

  @Post('image/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addImage(
    @Request() req,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = req.headers.authorization;
    await this.userService.authorizationCheck(token);
    const author = await this.topicsService.findOne(id);
    const requesterUser = await this.userService.findByToken(token);
    const { path } = await this.fileService.uploadPublicFile(
      file.buffer,
      file.originalname,
    );
    if (requesterUser.isAdmin) {
      return this.topicsService.adminUpdate(id, {
        imageStorage: path,
      });
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta permitido a atualizar esse tópico!',
      });
    }
  }
}
