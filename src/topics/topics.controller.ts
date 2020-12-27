import { Body, Controller, Get, Post, Param, Delete, Put,UseGuards } from '@nestjs/common';
import { TopicsService } from './topics.service';
import {Topic} from './topic.entity'
import { CreateTopicDTO } from './create-topic.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard'



@Controller('topics')
export class TopicsController {

  constructor(
    private readonly topicsService: TopicsService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Topic[]>{
    return this.topicsService.findAll()

  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
    update(@Param('id') id:string, @Body() createTopicDTO:CreateTopicDTO ): Promise<Topic>{
      return this.topicsService.update(id,createTopicDTO);
    }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTopicDTO:CreateTopicDTO  ): Promise<Topic>{
    /** This assures us integrity references into DB */
    console.log('123')

    return this.topicsService.create(createTopicDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id:string): Promise<Topic>{
    return this.topicsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id:string ):Promise<void>{
     this.topicsService.findOne(id);
      return
  }
}
