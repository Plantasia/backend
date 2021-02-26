import { Category } from "@entities/category.entity";

export class PaginatedCategoriesResultDTO{
  public results: Partial<Category>[];
  public currentPage: number;
  public prevPage: number;
  public nextPage:number;
  public totalRegisters: number;

}