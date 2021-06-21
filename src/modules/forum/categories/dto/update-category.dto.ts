import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCategoryDTO {

  @IsNotEmpty({message:"Nome da categoria não pode ser vazio"})
  @ApiProperty({
    type: String,
    description: 'Nome da categoria',
    default: '',
  })
  public name?: string;

  @IsNotEmpty({message:"Descrição da categoria não pode ser vazio"})
  @ApiProperty({
    type: String,
    description: 'Descrição da categoria',
    default: '',
  })
  public description?: string;

  @ApiProperty({
    type: String,
    description: 'Imagem da categoria',
    default: '',
  })
  public imageStorage?: string;

  public deleted_at?:string;

  public created_at?: string;

  public isActive?: boolean;

}
