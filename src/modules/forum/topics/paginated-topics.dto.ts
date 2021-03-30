import { Topic } from "@entities/topic.entity";

export class PaginatedTopicsDTO{
    public topics: Partial<Topic>[];
    public currentPage: number;
    public prevPage: number;
    public nextPage:number;
    public perPage: number;
  
  }
