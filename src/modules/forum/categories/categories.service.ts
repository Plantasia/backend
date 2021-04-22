import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import {
  getRepository,
  Repository,
  EntityManager,
  createQueryBuilder,
  getManager,
  getConnectionManager,
} from 'typeorm';
import { PaginatedCategoriesResultDTO } from './paginated-categories.dto';
import { Topic } from '@entities/topic.entity';
import { Comment } from '@entities/comments.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async findAll(page): Promise<PaginatedCategoriesResultDTO> {
    console.log('PAGE:\n');
    console.log(page);

    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);

    
    const take = 10;
    const skip = 10 * (page - 1);

    let categories: any;

    console.log('____START____');

    const entityManager = getManager();
    const query = await entityManager.query(`

    select c.name, c.id, c.imageStorage, c.description, 
    (select topics.id from topics where categoryId = c.id order by created_at asc limit 1) as lastTopicId, 
    (select topics.name from topics where categoryId = c.id order by created_at asc limit 1) as lastTopicName, 
    max(c2.updated_at) as lastActivity, count(c2.id) as countComments, count(distinct(t.id)) as countTopics from categories c 
    left join topics t 
    on t.categoryId = c.id
    left join comments c2 
    on c2.topicId = t.id
    where t.id is not null and c.deleted_at is null 
    group by c.id
    LIMIT ${take} 
    OFFSET ${skip}

  `);

    return {
      categories: query,
      currentPage: page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: take >= skip + take ? page + 1 : null,
      perPage: query.length,
    };
  }

  async find(argument: any): Promise<Category[]> {
    return this.categoryRepository.find(argument);
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByAuthorSlug(id: string, authorId: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        authorId,
        id,
      },
    });
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const resp = await this.categoryRepository.softDelete(id);

    /*affected property == 1 (deleted) */
    console.log("has been deleted?  ",resp)
    if (resp.affected !== 0) {
      console.log(`deleted category ${id} `);
    }
  }

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.authorId = createCategoryDTO.authorId;
    category.name = createCategoryDTO.name;
    category.authorEmail = createCategoryDTO.authorEmail;
    category.description = createCategoryDTO.description;
    category.imageStorage = createCategoryDTO.imageStorage;
    const cat = await this.categoryRepository.create(category);

    return this.categoryRepository.save(cat);
  }

  async update(id: string, data: CreateCategoryDTO): Promise<Category> {
    await this.categoryRepository.update(id, data);
    return this.categoryRepository.findOne(id);
  }
}


/** DON'T REMOVE, PLEASE
 * 
 *    categories =await getRepository(Category)
      .createQueryBuilder("cat")
      .leftJoinAndSelect("cat.topics","topic","cat.id = topic.categoryId")
      .select('cat.name')
      .leftJoinAndSelect("cat.comments",'com','com.categoryId = cat.id')
      .loadRelationCountAndMap("cat.countTopics","cat.topics")
      .loadRelationCountAndMap("cat.countComments","cat.comments")
      .take(take)
      .skip(skip)
      .select([
          'cat.id', 'cat.name', 
          
          'cat.description', 'cat.authorId',

          'topic.id','topic.name','topic.updated_at',
          'topic.textBody','topic.imageStorage',
      ])
      .orderBy("lastTopic.updated_at")
      .orderBy("cat.id","ASC")


      .getMany();
      console.log("____END____") 
 *
 **/

