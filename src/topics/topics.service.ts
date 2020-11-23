import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDTO } from './create-topic.dto';
import { Topic } from './topic.entity'
import {CategoryService } from '../category/category.service'

@Injectable()
export class TopicsService {

  constructor(

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    private categoryService: CategoryService

  ){}

  async create( createTopicDTO: CreateTopicDTO): Promise<Topic>{
    const topic = new Topic;

    topic.name = createTopicDTO.name
    topic.textBody = createTopicDTO.textBody;
    topic.imageStorage = createTopicDTO.imageStorage;
    const category_id = createTopicDTO.category_id;
    const user_id =createTopicDTO.user_id;

    /**
     * #########################//
     *
     * ERROR: Type '{ code: status.NOT_FOUND; details: string; }' is missing the following properties from type 'ServiceError': name, message.
     *
     * ##########################
     * Possible solutions:
     *
     * https://stackoverflow.com/questions/55790897/type-is-missing-the-following-properties
     *
     * https://github.com/grpc/grpc-node/issues/858
     *
     *

     //*Resolve this:
    /*topic.category =  await this.categoryService.findOne(category_id);
     topic.user =  await this.categoryService.findOne(user_id); */

    /** this creates an entity instance */
    const t = await this.topicRepository.create(topic);

    /**now, we're  saving into DB */
    return this.topicRepository.save(t);


  }

  async findAll():Promise<Topic[]>{
    return this.topicRepository.find();
  }

  async findOne(id:string): Promise<Topic>{
    return this.topicRepository.findOne({
      where:{
        id:id
      },
    })
  }

  async update(id:string, data): Promise<Topic>{
    await this.topicRepository.update(id,data);

    return await this.topicRepository.findOne(id)
  }

  async delete(id:string ): Promise<void>{
    await this.topicRepository.delete(id)
  }

}
