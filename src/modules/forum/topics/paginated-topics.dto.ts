import { Topic } from "@entities/topic.entity";

export class PaginatedTopicsDTO{
    public results: Partial<Topic>[];
    public currentPage: number;
    public prevPage: number;
    public nextPage:number;
    public totalRegisters: number;
  
  }
