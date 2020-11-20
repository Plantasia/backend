import { Category } from "../category/category.entity";


export class createTopicDTO{
  public readonly name: string;
  public readonly textBody: string;
  public readonly imageStorage:string;
  public readonly reaction:string;
  public          category_id :string;
}