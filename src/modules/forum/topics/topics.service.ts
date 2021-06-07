import { FindOneModel } from './api-model/find-one-model';
import { TopicModel } from './api-model/topic-default-model';
import { FindAllModel } from './api-model/find-all-model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Topic } from '@entities/topic.entity';
import { User } from '@entities/user.entity';
import { Category } from '@entities/category.entity';
import { CreateTopicDTO } from './dto';
import { FilesService } from '@image/imageS3.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,

    private filesService: FilesService,
  ) {
    this.CategoryRepository = CategoryRepository;
    this.UserRepository = UserRepository;
    this.topicRepository = topicRepository;
  }

  async create(data: CreateTopicDTO): Promise<TopicModel> {
    const { user_id, category_id } = data;
    const topic = new Topic();

    topic.name = data.name;
    topic.textBody = data.textBody;
    topic.imageStorage = data.imageStorage;

    topic.user = await this.UserRepository.findOne(user_id);
    topic.category = await this.CategoryRepository.findOne(category_id);

    const newTopic = await this.topicRepository.create(topic);

    const {
      id,
      name,
      textBody,
      imageStorage,
      isActive,
      created_at,
      updated_at,
      deleted_at,
    } = await this.topicRepository.save(newTopic);

    return {
      id,
      name,
      textBody,
      imageStorage,
      isActive,
      created_at,
      updated_at,
      deleted_at,
    };
  }

  async adminFindAll(): Promise<Topic[]> {
    return this.topicRepository.find({ withDeleted: true });
  }

  async adminFindOne(topicId: string): Promise<TopicModel> {
    const {
      id,
      name,
      textBody,
      imageStorage,
      isActive,
      created_at,
      updated_at,
      deleted_at,
    } = await this.topicRepository.findOne(topicId, { withDeleted: true });

    return {
      id,
      name,
      textBody,
      imageStorage,
      isActive,
      created_at,
      updated_at,
      deleted_at,
    };
  }

  async findAll(page, category = null): Promise<FindAllModel> {
    if (!page || page <= 0) {
      page = 1;
    } else page = parseInt(page);

    const [result, total] = category
      ? await this.topicRepository.findAndCount({
          where: { category: { id: category } },
        })
      : await this.topicRepository.findAndCount();

    const skip = 10 * (page - 1);
    const take = 10;

    const query = await getRepository(Topic)
      .createQueryBuilder('t')
      .leftJoin('t.category', 'cat', 'cat.id = t.categoryId')
      .leftJoin('t.comments', 'com', 'com.topicId = t.id')
      .leftJoin('t.user', 'topicOwner', 't.userId = topicOwner.id')
      .leftJoin('com.user', 'ownerComment', 'com.userId = ownerComment.id')
      .addSelect('SUM(comments.id)', 'totalComments')
      .select([
        't.id',
        't.name',
        't.textBody',
        't.imageStorage',
        't.created_at',
        't.updated_at',
        'topicOwner.id',
        'topicOwner.avatar',
        'topicOwner.name',

        'com.id',
        'com.updated_at',
        'com.created_at',
        'ownerComment.id',
        'ownerComment.name',
        'ownerComment.avatar',
      ])
      .orderBy({
        'com.created_at': 'ASC',
      })
      .take(take)
      .skip(skip);

    const topics = category
      ? await query.where(`t.categoryId = '${category}'`).getMany()
      : await query.getMany();

    return {
      topics,
      currentPage: page,
      perPage: take,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: take >= skip + take ? page + 1 : null,
      totalRegisters: total,
    };
  }

  async findOne(topicId: string): Promise<Topic> {
    return this.topicRepository.findOne({
      where: {
        id: topicId,
      },
      withDeleted: true,
    });
  }

  async findOneAndFetchUser(topicId: string): Promise<Topic> {
    return this.topicRepository.findOne({
      where: {
        id: topicId,
      },
      relations: ['user'],
      withDeleted: true,
    });
  }

  async takeTopicData(topicId: string): Promise<Topic> {
    const topic = await getRepository(Topic)
      .createQueryBuilder('t')
      .leftJoin('t.category', 'cat', 'cat.id = t.categoryId')
      .leftJoin('t.comments', 'com', 'com.topicId = t.id')
      .leftJoinAndSelect('t.user', 'user', 't.userId = user.id')
      .leftJoinAndSelect(
        'com.user',
        'userComment',
        'com.userId = userComment.id',
      )
      .where('t.id = :id', { id: topicId })
      .select([
        'userComment.id',
        'userComment.name',
        'userComment.avatar',
        'userComment.email',
        'userComment.created_at',

        'user.id',
        'user.name',
        'user.avatar',
        'user.email',
        'user.created_at',

        't.id',
        't.name',
        't.textBody',
        't.imageStorage',
        't.created_at',
        't.updated_at',

        'cat.id',
        'cat.name',
        'cat.authorId',
        'cat.description',
        'cat.imageStorage',
        'cat.created_at',
        'cat.updated_at',

        'com.id',
        'com.userId',
        'com.textBody',
        'com.created_at',
        'com.updated_at',
      ])

      .orderBy({
        'com.created_at': 'ASC', // Getting the last comment
      })
      .getOne();

    console.log('__________end_______________');

    return topic;
  }

  async findWithOrderBy(): Promise<Topic[]> {
    const qb = this.topicRepository.createQueryBuilder('Topic');
    qb.orderBy('Topic.created_at', 'DESC');
    console.log(qb.getQuery());
    return await qb.getMany();
  }

  async findNoResponse(id: string): Promise<Topic[]> {
    const qb = this.topicRepository.createQueryBuilder('Topic');
    qb.where('Topic.response = 0');
    console.log(qb.getQuery());
    return await qb.getMany();
  }

  async findByCategory(categoryId: string): Promise<Topic[]> {
    const qb = this.topicRepository.createQueryBuilder('topic');
    qb.where('topic.categoryId = :categoryId', { categoryId });

    qb.select([
      'topic.id',
      'topic.name',
      'topic.textBody',
      'topic.imageStorage',
      'topic.created_at',
      'topic.updated_at',
    ]);

    console.log(qb.getQuery());
    const topic = await qb.getMany();

    return topic;
  }

  async findById(id: string): Promise<Topic> {
    return this.topicRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(topicId: string, data): Promise<TopicModel> {
    await this.topicRepository.update(topicId, data);

    const {
      id,
      name,
      textBody,
      category,
      created_at,
      imageStorage,
      user,
      updated_at,
      deleted_at,
    } = await this.topicRepository.findOne(topicId);

    return {
      id,
      name,
      textBody,
      category,
      created_at,
      imageStorage,
      user,
      updated_at,
      deleted_at,
    };
  }

  async delete(id: string): Promise<void> {
    await this.topicRepository.softDelete(id);
  }

  async addImage(
    topicId: string,
    imageBuffer: Buffer,
    filename: string,
  ): Promise<{ path: string; url: string }> {
    const { path, url } = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const topic = await this.findById(topicId);
    await this.topicRepository.update(topicId, {
      ...topic,
      imageStorage: path,
    });
    await this.topicRepository.save(topic);
    return { path, url };
  }
}
