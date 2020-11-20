import { Body, Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { TopicsService } from './topics.service';
import {Topic} from './topic.entity'
import { CreateTopicDTO } from './create-topic.dto';


@Controller('topics')
export class TopicsController {

  constructor(
    private readonly topicsService: TopicsService,
  ){}

  @Get()
  findAll(): Promise<Topic[]>{
    return this.topicsService.findAll()

  }
  @Put(':id')
    update(@Param('id') id:string, @Body() createTopicDTO:CreateTopicDTO ): Promise<Topic>{
      return this.topicsService.update(id,createTopicDTO);
    }

  @Post(':id')
  create(@Param('id') category_id:string,   @Body() createTopicDTO:CreateTopicDTO  ): Promise<Topic>{
    /** This assures us integrity references into DB */
    createTopicDTO.category_id = category_id


    return this.topicsService.create(createTopicDTO);
  }

  @Get(':id')
  findOne(@Param('id') id:string): Promise<Topic>{
    return this.topicsService.findOne(id)
  }

  @Delete(':id')
  delete(@Param('id') id:string ):Promise<void>{
     this.topicsService.findOne(id);
      return
  }
}
