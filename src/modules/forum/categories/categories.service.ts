import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from '../../../entities/category.entity';
import { Repository, getManager } from 'typeorm';
import { FindAllModel } from './api-model/find-all.model';
import { Topic } from '@entities/topic.entity';
import UpdateModel from './api-model/update-model';
import { FilesService } from '../../image/imageS3.service';
import FindAllComboboxModel from './api-model/find-all-combobox-model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,

    private filesService: FilesService,
  ) {}

  async findAll(page): Promise<FindAllModel> {
    console.log('PAGE:\n');
    console.log(page);

    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);

    const take = 5;
    const skip = 5 * (page - 1);

    let categories: any;

    const { total } = (
      await this.categoryRepository.query(
        `SELECT count(distinct(categories.id)) as total
        FROM categories 
        LEFT JOIN topics 
        ON categories.id = topics.categoryId 
        inner join comments 
        on comments.topicId = topics.id
        WHERE topics.id is not null`,
      )
    )[0];

    const entityManager = getManager();
    const query = await entityManager.query(`
    select c.name, c.id, c.imageStorage, c.description, 
    (select topics.id from topics where categoryId = c.id order by created_at asc limit 1) as lastTopicId, 
    (select topics.name from topics where categoryId = c.id order by created_at asc limit 1) as lastTopicName, 
    (select max(topics.created_at) from topics where categoryId = c.id order by created_at asc limit 1) as lastTopicActivity, 
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
      perPage: take,
      totalRegisters: total,
    };
  }

  async adminFindAll(page): Promise<Category[]> {
    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);
    const take = 10;
    const skip = 10 * (page - 1);

    const categories = await this.categoryRepository.find({
      withDeleted: true,
    });
    return categories;
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

  async adminFindOne(id: string): Promise<Category> {
    return this.categoryRepository.find({
      where: {
        id,
      },
      withDeleted: true,
    })[0];
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
    console.log('has been deleted?  ', resp);
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
    const cat = await this.categoryRepository.create(category);

    return this.categoryRepository.save(cat);
  }

  async update(
    categoryId: string,
    data: CreateCategoryDTO,
  ): Promise<UpdateModel> {
    await this.categoryRepository.update(categoryId, data);

    const {
      name,
      id,
      updated_at,
      description,
      created_at,
      imageStorage,
      authorEmail,
    } = await this.categoryRepository.findOne(categoryId);

    return {
      name,
      id,
      updated_at,
      description,
      created_at,
    };
  }

  async addImage(categoryId: string, imageBuffer: Buffer, filename: string) {
    const imageStorage = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const category = await this.findById(categoryId);
    await this.topicRepository.update(categoryId, {
      ...category,
      imageStorage,
    });
    return imageStorage;
  }

  async findCombobox(): Promise<FindAllComboboxModel> {
    const query = await this.categoryRepository.query(
      `SELECT categories.id, categories.name
      FROM categories WHERE categories.deleted_at is null`,
    )
    return query;
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
