import { FindAllModel } from './use-cases/find-all-model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from './create-comment.dto';
import { Comment } from '../../../entities/comments.entity';
import { Topic } from '../../../entities/topic.entity';
import { TopicsService } from '../topics/topics.service';
import { UserService } from '../../profile/user/user.service';
import PaginatedCommentsModel from './paginated-comments-dtio';


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

  async adminFindAll(page): Promise<Comment[]> {
    
    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);

    return this.commentsRepository.find();
  }

  async findAll(page): Promise<FindAllModel> {
    
    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);
      const take=10 
      const skip= 10 * (page-1)


    const[result, total]= await this.commentsRepository.findAndCount();

    const comments =await  this.commentsRepository.find({
      take,
      skip
    });

     return{
        comments,
        currentPage: page,
        perPage: take,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: take >= skip + take ? page + 1 : null,
        totalRegisters:total
     }
  }

  async delete(id: string): Promise<void> {
    await this.commentsRepository.softDelete(id);
  }

  async create(data: CreateCommentDTO, req: any): Promise<Comment> {
    
    const comment = new Comment();
    const topic = new Topic();
    comment.textBody = data.textBody
    const topic_id = data.topic_id;
    const token = req;
    this.topicService.findOne(topic_id);
    const user = await this.userService.findByToken(token);
    comment.user = await this.userService.findOne(user.id);
    comment.topic = await this.topicService.findOne(topic_id);
    const newComment = await this.commentsRepository.create(comment);
    this.commentsRepository.save(newComment);

    return newComment
     
  }

  async update(id: string, data: CreateCommentDTO): Promise<Comment> {
    await this.commentsRepository.update(id, data);
    return this.commentsRepository.findOne(id);
  }
}
