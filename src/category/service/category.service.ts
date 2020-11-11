import { Get, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from '../DTO/create-category.dto';
import { Category } from '../entities/category.entity';
import { uuid } from 'uuidv4';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.name = createCategoryDTO.name;
    category.description = createCategoryDTO.description;
    category.imageStorage = createCategoryDTO.imageStorage;

    return this.categoryRepository.save(category);
  }

  async update(
    id: string,
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return null;

    /*
      return this.categoryRepository.update(id, 

        )*/
  }
}
