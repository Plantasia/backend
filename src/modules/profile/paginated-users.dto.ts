import { User } from "@entities/user.entity";

export class PaginatedUsersResultDTO{
  public results: Partial<User>[];
  public currentPage: number;
  public prevPage: number;
  public nextPage:number;
  public perPage:number;
  public totalRegisters: number;

}

