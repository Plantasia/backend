import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from '@entities/topic.entity';
import { CreateTopicDTO } from './create-topic.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createTopicDTO: CreateTopicDTO,
  ): Promise<Topic> {
    return this.topicsService.update(id, createTopicDTO);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Creating Topic' })
  @ApiResponse({ status: 400, description: 'Bad request!' })
  @ApiResponse({
    status: 401,
    description: 'Category and User must be specified! Please, check this',
  })
  @ApiResponse({ status: 201, description: 'Topic sucessfully created' })
  @ApiResponse({ status: 403, description: 'Operation not permitted' })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createTopicDTO: CreateTopicDTO): Promise<Topic> {
    /** This assures us integrity references into DB */

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
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    this.topicsService.findOne(id);
    return;
  }
}
