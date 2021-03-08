import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getConnection, getRepository, Repository } from 'typeorm';

import { Topic } from '../../../entities/topic.entity';
import { Comment } from '../../../entities/comments.entity';
import { User } from '@entities/user.entity';
import { CreateTopicDTO } from './create-topic.dto';
import { CategoryService } from '../categories/categories.service';
import { UserService } from '../../profile/user/user.service';
import { Category } from '../../../entities/category.entity';
import { PaginatedTopicsDTO } from './paginated-topics.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {
    this.CategoryRepository = CategoryRepository;
    this.UserRepository = UserRepository;
    this.topicRepository = topicRepository;
  }

  async create(createTopicDTO: CreateTopicDTO): Promise<Topic> {
    const topic = new Topic();

    topic.name = createTopicDTO.name;
    topic.textBody = createTopicDTO.textBody;
    topic.imageStorage = createTopicDTO.imageStorage;
    const user_id = createTopicDTO.user_id;
    const category_id = createTopicDTO.category_id;

    topic.user = await this.UserRepository.findOne(user_id);

    topic.category = await this.CategoryRepository.findOne(category_id);

   
    /** this creates an entity instance */
    const t = await this.topicRepository.create(topic);

    /**now, we're  saving into DB */
    return this.topicRepository.save(t);
  }

  async findAll(page): Promise<PaginatedTopicsDTO> {
    const skip =10 * (page-1)
    const take =10
    if(!page){
      page=1
    }
    else page = parseInt(page)

    const [result, total]= await this.topicRepository.findAndCount({
      take:take ,
      skip: skip
    });

   
   return{ 
    results:result,
    currentPage:page,      
    totalRegisters: total,
    prevPage: page > 1? (page-1): null,
    nextPage: total > (skip + take) ? page+1 : null,


    }
  
  }
 


  async findOne(userId: string): Promise<Topic> {
    return  this.topicRepository.findOne({
      where: {
        id: userId,
      },
    });

    /*titulo do topico, todas as palavras chave relacionada ao topico
     e todos os comentários => (
       usuario => avatar, nome, created_at, bio, id
     )
      comentarios by asc

    */
   
    
  
  }

  async takeTopicData(topicId: string){

  
    console.log("__________start_____________")
    const thisTopic = await getRepository(Topic)
    .createQueryBuilder("t")
    .innerJoin("t.category","cat",'cat.id = t.categoryId')
    .innerJoin("t.comments","com", "com.topicId = t.id")
    .innerJoinAndSelect("t.user","user","t.userId = user.id")
    .innerJoinAndSelect("com.user","userComment","com.userId = userComment.id")
    .orderBy({
      "com.created_at":"ASC"
    })
    .where("t.id = :id", { id: topicId })

   .select([
    "userComment.id", "userComment.name","userComment.avatar",
    "userComment.email","userComment.created_at",

    "user.id", "user.name","user.avatar",
    "user.email","user.created_at",
    

    "t.id","t.name","t.textBody","t.imageStorage",
    "t.reaction","t.created_at","t.updated_at",

    "cat.id","cat.name","cat.authorSlug","cat.description","cat.imageStorage",
    "cat.created_at","cat.updated_at",

    "com.id","com.userId","com.text","com.reaction","com.created_at", "com.updated_at",
  ])
    .getMany()
    console.log("__________end_______________") 

    return {thisTopic}
   
    /*titulo do topico, todas as palavras chave (categorias) relacionada ao topico
     e todos os comentários => (
       usuario => avatar, nome, created_at, bio, id
     )
      comentarios by asc
     }*/
  
  }

   
  


  async findWithOrderBy(){
    const qb = this.topicRepository.createQueryBuilder("Topic");
     qb.orderBy("Topic.created_at", "DESC")
      console.log(qb.getQuery());
      return await qb.getMany();
  }

  async findNoResponse(id: string){
    const qb = this.topicRepository.createQueryBuilder("Topic");
     qb.where("Topic.response = 0")
      console.log(qb.getQuery());
      return await qb.getMany();
  }

  async findByCategory(idCategory: string){
    const qb = this.topicRepository.createQueryBuilder("topic");
      qb.where("topic.categoryId = :categoryId", { categoryId: idCategory })
      console.log(qb.getQuery());
      return await qb.getMany();
  }

  async findById(id: string): Promise<Topic> {
    return this.topicRepository.findOne({
      where: {
        id: id,
      },
    });
  }


  async update(id: string, data): Promise<Topic> {
    await this.topicRepository.update(id, data);

    return await this.topicRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.topicRepository.delete(id);
  }
}


