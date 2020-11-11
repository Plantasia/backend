import {Injectable, Inject} from '@nestjs/common';
import {CreateCategoryDTO} from '../DTO/create-category.dto'
import { Category } from '../model/category.model';
import { uuid } from 'uuidv4';
import { userInfo } from 'os';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoryRepository: typeof Category,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where :{
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const  category =  await this.findOne(id);
    await  category.destroy();
  }

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const category = new Category();

    category.name = createCategoryDTO.name;
    category.description = createCategoryDTO.description;
    category.imageStorage = createCategoryDTO.imageStorage;

    return category.save();
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
