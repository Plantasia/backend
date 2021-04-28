import { QueryPage } from './../../../utils/page';
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
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from '../../../entities/topic.entity';
import { CreateTopicDTO } from './create-topic.dto';
import { DeletedItenTopicDTO } from './delete-topic.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from '../../profile/user/user.service';

@ApiTags('topics')
@Controller('/forum/topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly userService: UserService,
  ) {}

  @Get('byCategory/:categoryId')
  async getTopicsByCategory(@Param('categoryId') categoryId: string) {
    return this.topicsService.findByCategory(categoryId);
  }

  @Get(':topicId')
  async getTopicById(@Param('topicId') topicId: string) {
    return this.topicsService.takeTopicData(topicId);
  }

  @ApiOkResponse({ description: 'topic succesfully returned' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  async findAll(@Query() query:QueryPage) {

    const page = query.page;
    return this.topicsService.findAll(page);

  }

  @ApiOkResponse({ description: 'topic succesfully returned' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('admin/list')
  async adminFindAll(@Query() query:QueryPage) {
    const page = query.page;
    console.log(page)
    return this.topicsService.adminFindAll(page);

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
  ): Promise<Topic> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const author = this.topicsService.findOne(id)
    const requesterUser = this.userService.findByToken(token)
    if ((await author).user.id === (await requesterUser).id ||
    (await requesterUser).isAdmin === true
    ){
      return this.topicsService.update(id, createTopicDTO);
    }else{
      throw new UnauthorizedException({
        error: 'You are not permitted to update this Topic!',
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
  ): Promise<Topic> {
    const token =req.headers.authorization
    const userAlreadyExists = await this.userService.authorizationCheck(
      token ,
    );
    if (!userAlreadyExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User does not exists, please check data!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }else{
      const response = this.topicsService.create(createTopicDTO);
      const category = this.topicsService.findOne(createTopicDTO.category_id);
      const user = this.topicsService.findOne(createTopicDTO.user_id);

      if (!category && !user) {
        const errors = { Error: 'User or Category not passed into' };
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
  async delete(@Param('id') id: string, @Request() req): Promise<DeletedItenTopicDTO> {
    const token = req.headers.authorization
    const check = await this.userService.authorizationCheck(
      token,
    );
    const author = this.topicsService.findOne(id)
    const requesterUser = this.userService.findByToken(token)
    if ((await author).user.id === (await requesterUser).id ||
    (await requesterUser).isAdmin === true
    ){
      const deletedIten = this.topicsService.findOne(id);
      if (!deletedIten){
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Error to delete topic, please check data!',
          },
          HttpStatus.BAD_REQUEST,
        );
      }else{
        const mesage = 'Iten '+ id +' deleted'
        return {
          mesage: mesage
        };
      }
    }else{
      throw new UnauthorizedException({
        error: 'You are not permitted to update this Topic!',
      });
    }
  }
}
