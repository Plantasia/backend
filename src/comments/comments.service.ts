import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from './create-comment.dto';
import { Comment } from './comments.entity';
import { Topic } from '../topics/topic.entity';
import {TopicsService} from '../topics/topics.service';
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service';

//import  User  from '../user/user.entity';


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private topicService: TopicsService,
    private userService:UserService

  ) {}

  async findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findOne({
      where :{
        id,
      },
    });
  }

  async findAll():Promise<Comment[]>{
    return this.commentsRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }

  async create(data: CreateCommentDTO): Promise<Comment> {
    /**
     * Instantiating dependencies
     */
    const comment = new Comment();
    const topic = new Topic;
    const user = new User;

    /**Abstracting specified data to store into db */
    comment.text = data.text;
    comment.reaction = data.reaction;
    comment.disable = data.disable;
    comment.hasParentComment = data.hasParenteComment;
    comment.idParentComment = data.idParentComment;
    const topic_id = data.topic_id;
    const user_id = data.user_id;


    /**To associating this comment to its "topic" and "user" */
    this.topicService.findOne(topic_id);
    this.userService.findOne(user_id);


    //comment.user = await this.userService.findOne(user_id);
    //comment.topic = await this.topicService.findOne(topic_id);


    const com = await this.commentsRepository.create(comment)
    this.commentsRepository.save(com);
    return this.commentsRepository.findOne({
        where:{}
      })
  }

  async update(id: string, data: CreateCommentDTO ):
  Promise<Comment> {

      await this.commentsRepository.update(id, data);
      return this.commentsRepository.findOne(id);
  }


}
