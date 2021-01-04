import { IsNotEmpty } from "class-validator";
import { Category } from "../category/category.entity";


export class CreateTopicDTO{
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  public readonly textBody: string;

  public readonly imageStorage:string;
  @IsNotEmpty()
  public          category_id :string;
  @IsNotEmpty()
  public          user_id: string;
}