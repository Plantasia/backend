import { UpdateCategoryDTO } from './dto/update-category.dto';
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
    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);

    const take = 5;
    const skip = 5 * (page - 1);

    const { total } = (
      await this.categoryRepository.query(
        `SELECT count(distinct(categories.id)) as total
        FROM categories 
        LEFT JOIN topics 
        ON categories.id = topics.categoryId 
        LEFT join comments 
        on comments.topicId = topics.id
        WHERE topics.id is not null
        AND topics.deleted_at is null
        `,
      )
    )[0];

    const entityManager = getManager();

    const query = await entityManager.query(`
    select c.name, c.id, c.imageStorage, c.description, 
    (select topics.id from topics where categoryId = c.id and topics.deleted_at is null order by created_at desc limit 1) as lastTopicId, 
    (select topics.name from topics where categoryId = c.id and topics.deleted_at is null order by created_at desc limit 1) as lastTopicName, 
    (select max(topics.created_at) from topics where categoryId = c.id and topics.deleted_at is null order by created_at desc limit 1) as lastTopicActivity, 
    max(com.updated_at) as lastActivity, count(com.id) as countComments, count(distinct(t.id)) as countTopics from categories c 
    left join topics t 
    on t.categoryId = c.id
    left join comments com 
    on com.topicId = t.id
    where t.id is not null and c.deleted_at is null and t.deleted_at is null
    group by c.id
    ORDER BY 7 DESC
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

  async adminFindAll(): Promise<Category[]> {
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

  async adminFindById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        id,
      },withDeleted:true
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

  async AdminFindOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        id
      }, withDeleted:true
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
    console.log('has been deleted?  ', resp);
    if (resp.affected !== 0) {
      console.log(`deleted category ${id} `);
    }
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.authorId = data.authorId;
    category.name = data.name;
    category.description = data.description;
    category.imageStorage = data.imageStorage;
    category.authorEmail = "user@user.com"

    if (!category.imageStorage) {
      category.imageStorage='default-category-image.jpeg'
    }
    const cat = await this.categoryRepository.create(category);

    return this.categoryRepository.save(cat);
  }

  async update(
    categoryId: string,
    data: UpdateCategoryDTO,
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
    } = await this.categoryRepository.findOne({where:{id:categoryId},withDeleted:true},);

    return {
      name,
      id,
      updated_at,
      description,
      created_at,
      imageStorage,
      authorEmail,
    };
  }

  async updateAdmin(
    categoryId: string,
    data: UpdateCategoryDTO,
  ): Promise<any> {
    await this.categoryRepository.update(categoryId, data);
    return this.categoryRepository
      .findOne({ where: { id: categoryId }, withDeleted: true });
  }

  async addImage(categoryId: string, imageBuffer: Buffer, filename: string) {
    const {
      path: imageStorage,
      url,
    } = await this.filesService.uploadPublicFile(imageBuffer, filename);
    const category = await this.findById(categoryId);
    await this.topicRepository.update(categoryId, {
      ...category,
      imageStorage,
    });
    return url;
  }

  async findCombobox(): Promise<FindAllComboboxModel> {
    const query = await this.categoryRepository.query(
      `SELECT categories.id, categories.name
      FROM categories WHERE categories.deleted_at is null`,
    );
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
