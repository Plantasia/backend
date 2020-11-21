import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from './create-comment.dto';
import { Comments } from './comments.entity';
import { Topic } from '../topics/topic.entity';
import {TopicsService} from '../topics/topics.service';

//import  User  from '../user/user.entity';


@Injectable()
export class CommentService {
  constructor(
    //@Inject('CATEGORIES_REPOSITORY')
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    private topicService: TopicsService
    //private userRepository: Repository<User>


  ) {}

  async findOne(id: string): Promise<Comments> {
    return this.commentsRepository.findOne({
      where :{
        id,
      },
    });
  }

  async findAll():Promise<Comments[]>{
    return this.commentsRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }

  async create(createcommentsDTO: CreateCommentDTO): Promise<Comments> {
    const comment = new Comments();
    const topic = new Topic;
    //const user = new User;
    comment.text = createcommentsDTO.text;
    comment.reaction = createcommentsDTO.reaction;
    comment.disable = createcommentsDTO.disable;
    comment.hasParentComment = createcommentsDTO.hasParenteComment;
    comment.idParentComment = createcommentsDTO.idParentComment;
    const topic_id = createcommentsDTO.topic_id;
    comment.topic = await this.topicService.findOne(topic_id);
    //const user_id = createCategoryDTO.user_id;
    //comment.user = await this.userRepository.findOne(user.id);
    const com = await this.commentsRepository.create(comment)
    this.commentsRepository.save(com);
    return this.commentsRepository.findOne({
        where:{}
      })
  }

  async update(id: string, data: CreateCommentDTO ):
  Promise<Comments> {

      await this.commentsRepository.update(id, data);
      return this.commentsRepository.findOne(id);
  }


}
