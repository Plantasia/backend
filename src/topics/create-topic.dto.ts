import { Category } from "../category/category.entity";


export class CreateTopicDTO{
  public readonly name: string;
  public readonly textBody: string;
  public readonly imageStorage:string;
  public          category_id :string;
}