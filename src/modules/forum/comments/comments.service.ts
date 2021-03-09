import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from './create-comment.dto';
import { Comment } from '../../../entities/comments.entity';
import { Topic } from '../../../entities/topic.entity';
import { TopicsService } from '../topics/topics.service';
import { User } from '../../../entities/user.entity';
import { UserService } from '../../profile/user/user.service';

//import  User  from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private topicService: TopicsService,
    private userService: UserService,
  ) {
    this.commentsRepository = commentsRepository;
    this.topicService = topicService;
    this.userService = userService;
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(page: number = 1): Promise<Comment[]> {
    return this.commentsRepository.find({
      take:10 ,
      skip: 10 * (page-1)
    });
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }

  async create(data: CreateCommentDTO): Promise<Comment> {
    
    const comment = new Comment();
    const topic = new Topic();
    const user = new User();

  
    comment.text = data.text;
    const topic_id = data.topic_id;
    const user_id = data.user_id;

    this.topicService.findOne(topic_id);
    this.userService.findOne(user_id);

    comment.user = await this.userService.findOne(user_id);
    comment.topic = await this.topicService.findOne(topic_id);

    console.log("User")
    console.log(user)

    console.log("Topic")
    console.log(topic)

    const newComment = await this.commentsRepository.create(comment);
    this.commentsRepository.save(newComment);

    return newComment
     
  }

  async update(id: string, data: CreateCommentDTO): Promise<Comment> {
    await this.commentsRepository.update(id, data);
    return this.commentsRepository.findOne(id);
  }
}
