import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import { getRepository, Repository } from 'typeorm';
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
    
    if(!page){
      page=1
    }
    else page = parseInt(page)
    
    const take =10
    const skip =10 * (page-1)

    const [result, total] = await this.categoryRepository.findAndCount({
      take:skip ,
      skip: skip

    });

    const categories = result


    const allCategories =[]
    var x=0;
    /**Formatting each category register for API */
    for(let i=0; i<categories.length;i++){
      const category = new CreateCategoryDTO()
     
      category.name= categories[i].name
      category.id= categories[i].id
      category.description= categories[i].description
      category.authorId= categories[i].authorId


      /**NOTE: Each category
       * 'll have many topics
       *  and we need  to know
       *  info about them
       */
      const topicsThatBelongsThisCategory = await getRepository(Topic)
      .createQueryBuilder("topic")
      .orderBy("topic.updated_at","DESC")
      .where("categoryId = :id", { id: category.id })
      .getMany();


      // Sweeping away each topic
     for( let topic of  topicsThatBelongsThisCategory){
      
      
      if(topic!== undefined){

        var topicId = topic.id
         console.log("Topic")
         console.log(topic)

       
         /**This instance of Topic has any comments? */
         const comments = await getRepository(Comment)
        .createQueryBuilder("comment")
        .orderBy("comment.created_at","DESC")
        .where("topicId = :id",{id:topicId})
        .getMany();

        

        /** Which is the last comments for this topic? */
        const lastComment = await getRepository(Comment)
        .createQueryBuilder("comment")
        .select("comment.created_at")
        .orderBy("created_at","ASC")
        .where("comment.topicId =:topicId",{topicId })
        .getOne();



         /** The first value ( [0] ) 'll be the last,
          *  due to SQL order by DESC
          **/
        const lastTopic =  topicsThatBelongsThisCategory[0];
        
        category.lastComment = lastComment
        category.qtdeComments = comments.length
        category.qtdeTopics =  topicsThatBelongsThisCategory.length
        category.lastTopic = lastTopic
       
      }

    }  
   
    allCategories.push(category)
      
  }
  

  
    return{
      categories:allCategories,
      currentPage:page,      
      prevPage:  page > 1? (page-1): null,
      nextPage:  total > (skip + take) ? page+1 : null,
      perPage: take,
      totalRegisters: total
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

  async remove(id: string): Promise<void> {
    const resp = await this.categoryRepository.delete(id);

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
