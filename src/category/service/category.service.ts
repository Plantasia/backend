import {Injectable, Inject} from '@nestjs/common';
import {Sequelize} from 'sequelize-typescript';
import {InjectModel} from '@nestjs/sequelize'

import {CreateCategoryDTO} from '../DTO/create-category.dto'
import { Category } from '../model/category.model';
import { uuid } from 'uuidv4';

@Injectable()
export class CategoryService {
  constructor(
    //@Inject('CATEGORIES_REPOSITORY')
    @InjectModel(Category)
    private categoryModel: typeof Category,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({
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
    /** NOTE: The id 'll be generated but boundary(view)
     *  only 'll read this,
     *  Due to this, createCategoryDTO
     *  doesn't need to be having this stored
     */
    category.id = uuid();
    return category.save();
  }

  async update(
    id: string,
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return null;

    /*
      return this.categoryModel.update(id, 

        )*/
  }
}
