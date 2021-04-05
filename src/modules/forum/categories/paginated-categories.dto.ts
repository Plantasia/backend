import { Category } from "@entities/category.entity";

export class PaginatedCategoriesResultDTO{
  public categories: Category[];
  public currentPage: number;
  public prevPage: number;
  public nextPage:number;
  public perPage: number;



}