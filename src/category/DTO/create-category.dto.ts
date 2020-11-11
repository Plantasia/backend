export class CreateCategoryDTO {
  public id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly imageStorage: string;
  public readonly isActive: boolean;
}
