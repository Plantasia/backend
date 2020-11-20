import {Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {CreateCategoryDTO} from './create-category.dto';
import { Category } from './category.entity';
import { uuid } from 'uuidv4';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    //@Inject('CATEGORIES_REPOSITORY')
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where :{
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    console.log('deleted!!')
    await this.categoryRepository.delete(id);
  }

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.name = createCategoryDTO.name;
    category.author = createCategoryDTO.author;
    category.description = createCategoryDTO.description;
    category.imageStorage = createCategoryDTO.imageStorage;
    const cat = await this.categoryRepository.create(category)

    return this.categoryRepository.save(cat);
  }

  async update(id: string, data: CreateCategoryDTO ):
  Promise<Category> {

      await this.categoryRepository.update(id, data);
      return this.categoryRepository.findOne(id);
  }
}
