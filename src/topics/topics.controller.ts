import { Controller, Get } from '@nestjs/common';
import { TopicsService } from './topics.service';
import {Topic} from './topic.entity'

@Controller('topics')
export class TopicsController {

  constructor(
    private readonly topicsService: TopicsService,
    private readonly 
  ){}

  @Get()
  findAll(): Promise<Topic[]>{
    return this.topicsService.findAll()

  }
}
