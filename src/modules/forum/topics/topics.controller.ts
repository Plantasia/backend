import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from '../../../entities/topic.entity';
import { CreateTopicDTO } from './create-topic.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from '../../profile/user/user.service';

@ApiTags('topics')
@Controller('topics')
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
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('page/:page')
  async findAll(@Param('page') page: number) {
    return this.topicsService.findAll(page);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'topic succesfully updated' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createTopicDTO: CreateTopicDTO,
    @Request() req,
  ): Promise<Topic> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );
    return this.topicsService.update(id, createTopicDTO);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @ApiCreatedResponse({ description: 'topic succesfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post()
  async create(
    @Body() createTopicDTO: CreateTopicDTO,
    @Request() req,
  ): Promise<Topic> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );

    const response = this.topicsService.create(createTopicDTO);

    const category = this.topicsService.findOne(createTopicDTO.category_id);
    const user = this.topicsService.findOne(createTopicDTO.user_id);

    if (!category && !user) {
      const errors = { Error: 'User or Category not passed into' };
      throw new HttpException({ errors }, 401);
    }
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'topic succesfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiHeader({
    name: 'JWT',
    description: 'JWT token must to be passed to do this request',
  })
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    const thisUser = await this.userService.findByEmail(req.user.email);
    const check = await this.userService.authorizationCheck(
      req.headers.authorization,
    );
    this.topicsService.findOne(id);
    return;
  }
}
