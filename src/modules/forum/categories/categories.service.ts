import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDTO } from './create-category.dto';
import { Category } from '../../../entities/category.entity';
import { uuid } from 'uuidv4';
import { getConnection, getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { ApiBadGatewayResponse } from '@nestjs/swagger';
import { User } from '@entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll():  Promise<Category[]>{

    
    const paginatedRawCategories = await getRepository(Category)
    .createQueryBuilder("category")
    .limit(10)
    .getMany()
     
    return paginatedRawCategories
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
