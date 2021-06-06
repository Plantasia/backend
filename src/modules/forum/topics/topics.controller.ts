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
  UploadedFile
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from '@entities/topic.entity';
import { CreateTopicDTO } from './dto/create-topic.dto';
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

@ApiTags('topics')
@Controller('forum/topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly userService: UserService,
  ) { }

  // @Get('byCategory/:categoryId')
  // async getTopicsByCategory(@Param('categoryId') categoryId: string):Promise<Topic[]> {
  //   return this.topicsService.findByCategory(categoryId);
  // }

  /*@Get('admin/:topicId')
  async adminGetTopicById(@Param('topicId') topicId: string) {
    return this.topicsService.adminFindOne(topicId)
  } */

  @Get(':topicId')
  async getTopicById(@Param('topicId') topicId: string): Promise<FindOneModel> {
    return this.topicsService.takeTopicData(topicId);
  }

  @ApiOkResponse({ description: 'topic succesfully returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  /*async findAll(@Query() query: QueryPage):Promise<FindAllModel> {
    const page = query.page;
    return this.topicsService.findAll(page);
  }*/
  async findAll(@Query() query: QueryPage & { category: string | null }): Promise<FindAllModel> {
    const { page, category } = query;
    return this.topicsService.findAll(page, category);
  }

  /*async findAll(@Query() query: QueryPage & { category: string | null }):Promise<FindAllModel> {
    const { page, category } = query;
    return this.topicsService.findAll(page, category);
  }*/

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
  async update(
    @Param('id') id: string,
    @Body() createTopicDTO: CreateTopicDTO,
    @Request() req,
  ): Promise<TopicModel> {

    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    const user = await this.userService.findByToken(token);
    const topic = await (this.topicsService.findOneAndFetchUser(id));

    console.log("topic id")
    console.log(id)
    console.log("user id")
    console.log(topic.user.id)

    if (user.id === topic.user.id ||
        user.isAdmin === true) {
      return this.topicsService.update(topic.id, createTopicDTO);
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
  async create(
    @Body() createTopicDTO: CreateTopicDTO,
    @Request() req,
  ): Promise<TopicModel> {
    const token = req.headers.authorization;
    const userAlreadyExists = await this.userService.authorizationCheck(token);
    if (!userAlreadyExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Esse usuário não existe, por favor, verifique os dados',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const response = this.topicsService.create(createTopicDTO);
      const category = this.topicsService.findOne(createTopicDTO.category_id);
      const user = this.topicsService.findOne(createTopicDTO.user_id);

      if (!category && !user) {
        const errors = { Error: 'Campos obrigatórios, user e category, não foram passados' };
        throw new HttpException({ errors }, 401);
      }
      return response;
    }
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
    const check = await this.userService.authorizationCheck(token);
    const author = this.topicsService.findOne(id);
    const user = this.userService.findByToken(token);

    if (
      (await author).user.id === (await user).id ||
      (await user).isAdmin === true
    ) {

      this.topicsService.delete(id);

      const deletedIten = this.topicsService.findOne(id);
      if (!deletedIten) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Error ao deletar o topico, por favor verifique os dados!',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const message = 'Item ' + id + ' deletado';
        return {
          message,
        };
      }
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta autorizado a deletar esse tópico!',
      });
    }
  }

  @Post('image/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addImage(@Request() req, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const token = req.headers.authorization;
    const check = await this.userService.authorizationCheck(token);
    const author = this.topicsService.findOne(id);
    const user = this.userService.findByToken(token);
    if (
      (await author).user.id === (await user).id ||
      (await user).isAdmin === true
    ) {
      return this.topicsService.addImage(id, file.buffer, file.originalname);
    } else {
      throw new UnauthorizedException({
        error: 'Você não esta permitido a atualizar esse tópico!',
      });
    }
  }
}
