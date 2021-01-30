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
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@ApiTags("topics")
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

 
  @ApiOkResponse({description:"topic succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicsService.findAll();
  }




  @UseGuards(JwtAuthGuard)
 
  @ApiOkResponse({description:"topic succesfully updated"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createTopicDTO: CreateTopicDTO,
  ): Promise<Topic> {
    return this.topicsService.update(id, createTopicDTO);
  }




  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
 
  @ApiCreatedResponse({description:"topic succesfully created"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Post()
  async create(@Body() createTopicDTO: CreateTopicDTO): Promise<Topic> {
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


  @Get('date')
  async getTopicsByDate(){
    return this.topicsService.findWithOrderBy();
  }
/* Função para trazer os topicos sem respostas. Comentado porque ainda não tem o campo Response no banco
  @Get('responseo')
  async getTopicsWithNoResponse(){
    return this.topicsService.findNoResponse();
  }*/



  
  @ApiOkResponse({description:"topic succesfully returned"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(id);
  }



  @UseGuards(JwtAuthGuard)

  @ApiOkResponse({description:"topic succesfully deleted"})
  @ApiForbiddenResponse({ description:"Forbidden" })

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.topicsService.findOne(id);
    return;
  }
}
