import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import { uuid } from 'uuidv4';
import { Repository } from 'typeorm';
import { ApiBadGatewayResponse } from '@nestjs/swagger';
import { PaginatedCategoriesResultDTO } from './paginated-categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    
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


    return{
      results:result,
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

  async findByAuthorSlug(id: string ,authorSlug: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        authorSlug,
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
     
    category.authorSlug= createCategoryDTO.authorSlug
    category.name = createCategoryDTO.name;
    category.authorLogin = createCategoryDTO.authorLogin;
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
