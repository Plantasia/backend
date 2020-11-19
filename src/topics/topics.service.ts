import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity'

@Injectable()
export class TopicsService {

  constructor(

    @InjectRepository(Topic)
    private categoryRepository: Repository<Topic>

  ){}

  async findAll():Promise<Topic[]>{
    return this.categoryRepository.find();
  }

  async findOne(id:string): Promise<Topic>{
    return this.categoryRepository.findOne({
      where:{
        id:id
      },
    })
  }

  async update(id:string, data): Promise<Topic>{
    await this.categoryRepository.update(id,data);

    return await this.categoryRepository.findOne(id)
  }

}
