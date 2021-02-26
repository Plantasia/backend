import { User } from "@entities/user.entity";

export class PaginatedUsersResultDTO{
  public results: Partial<User>[];
  public current_page: number;
  public total_pages:number
  public total_registers: number;

}

