import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreateCategoryDTO {
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  public readonly author: string;
  @IsNotEmpty()
  public readonly description: string;

  public readonly imageStorage: string;
  @IsEmpty()
  public readonly isActive: boolean;
}
