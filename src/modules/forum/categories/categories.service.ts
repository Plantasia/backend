import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import { getRepository, Repository, createQueryBuilder } from 'typeorm';
import { PaginatedCategoriesResultDTO } from './paginated-categories.dto';
import { Topic } from '@entities/topic.entity';
import { Comment } from '@entities/comments.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
    
  ) {}

  async findAll(page): Promise<PaginatedCategoriesResultDTO> {
   console.log("PAGE:\n")
    console.log(page)
    
    if(!page|| page<=0){
      page=1
    }
    else page = parseInt(page)
    
   
    const take =10
    const skip =10 * (page-1)

    console.log("____START____")
    const categories =await getRepository(Category)
    .createQueryBuilder("cat")
    .leftJoinAndSelect("cat.topics", "t"," cat.id  = t.categoryId")
    .leftJoinAndSelect("t.comments","com","com.topicId = t.Id")
    .loadRelationCountAndMap("cat.countTopics","cat.topics")
    .loadRelationCountAndMap("t.countComments","t.comments")
    .take(take)
    .skip(skip)
    .select([
        'cat.id', 'cat.name', 
        'cat.description', 'cat.authorId',

        't.id','t.name',
        't.textBody','t.imageStorage',
    ])
    /*.addSelect( subQuery=>{
      return  subQuery
              .loadRelationCountAndMap()
              .limit(1)

    })*/
    .orderBy("")
    .getMany();
    console.log("____END____")

    for (let category of categories){
      
    }
   
    return{
      categories,
      currentPage:page,      
      prevPage:  page > 1? (page-1): null,
      nextPage:  take >= (skip + take) ? page+1 : null,
      perPage: take
    }
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

  async findByAuthorSlug(id: string ,authorId: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        authorId,
        id
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
    if (resp.affected !== 0) {
      console.log(`deleted category ${id} `);
    }
  }

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const category = new Category();
     
    category.authorId= createCategoryDTO.authorId
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
