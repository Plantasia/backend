import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
   @InjectRepository(Category)
   private readonly categoryRepository : Repository<Category>
  ){};


    findAll(): Promise<Category[]>{
      return this.categoryRepository.find();
    }


    findOne(id:string): Promise<Category>{
      return this.categoryRepository.findOne(id)
    }

    async remove(id: string): Promise<void>{
       await this.categoryRepository.delete(id);
  }

  async create(id:number) :Promise<Category>{
    const  cat = new Category
    return this.categoryRepository.save(cat);
  }

}
