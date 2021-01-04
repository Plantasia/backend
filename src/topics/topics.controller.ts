import { Body, Controller, Get, Post, Param, Delete, Put, HttpException } from '@nestjs/common';
import { TopicsService } from './topics.service';
import {Topic} from './topic.entity'
import { CreateTopicDTO } from './create-topic.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { use } from 'passport';


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

  @ApiOperation({summary: 'Creating Topic'})
  @ApiResponse({status:400, description:'Bad request! '})
  @ApiResponse({status:401, description:'Category and User must be specified! Please, check this'})
  @ApiResponse({status:201, description:'Topic sucessfully created'})
  @ApiResponse({status:403, description: 'Operation not permitted'})
  @Post()
  create(@Body() createTopicDTO:CreateTopicDTO  ): Promise<Topic>{
    /** This assures us integrity references into DB */

    const response =this.topicsService.create(createTopicDTO);

    const category = this.topicsService.findOne(createTopicDTO.category_id);
    const user = this.topicsService.findOne(createTopicDTO.user_id);

    if(!category && !user){
      const errors ={Error:"User or Category not passed into"};
      throw new HttpException({errors},401)

    }
    return response;
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
