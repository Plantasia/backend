import { Category } from '@entities/category.entity';

export class FindAllModel{
  public categories: Category[];
  public currentPage: number;
  public prevPage: number;
  public nextPage: number;
  public perPage: number;
  public totalRegisters:number;
}
