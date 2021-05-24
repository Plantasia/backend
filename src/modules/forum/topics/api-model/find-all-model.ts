
import { Topic } from '@entities/topic.entity';

export class FindAllModel {
  public topics: Partial<Topic>[];
  public currentPage: number;
  public prevPage: number;
  public nextPage: number;
  public perPage: number;
  public totalRegisters:number;
}
