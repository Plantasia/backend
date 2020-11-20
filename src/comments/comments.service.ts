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

  async create(createCategoryDTO: CreateCommentDTO): Promise<Comments> {
    const comment = new Comments();
    const topic = new Topic;
    //const user = new User;
    comment.text = createCategoryDTO.text;
    comment.reaction = createCategoryDTO.reaction;
    comment.disable = createCategoryDTO.disable;
    comment.hasParentComment = createCategoryDTO.hasParenteComment;
    comment.idParentComment = createCategoryDTO.idParentComment;
    const topic_id = createCategoryDTO.topic_id;
    comment.topic = await this.topicService.findOne(topic_id);
    //const user_id = createCategoryDTO.user_id;
    //comment.user = await this.userRepository.findOne(user.id);
    const com = await this.commentsRepository.create(comment)
    this.commentsRepository.save(com);
    return this.commentsRepository.findOne({
        where:{}
      })
  }


}
