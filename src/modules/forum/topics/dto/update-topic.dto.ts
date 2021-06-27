import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTopicDTO {
  @ApiProperty({
    type: String,
    description: 'Topic name',
    default: '',
  })
  @IsNotEmpty({message:"Nome do topico não pode ser vazio"})
  public readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Body text of topic',
    default: '',
  })
  @IsNotEmpty({message:"Não é possível criar uma categoria com o conteúdo vazio!"})
  public readonly textBody: string;

  @ApiProperty({
    type: String,
    description: 'The image of topic',
    default: '',
  })
  public readonly imageStorage?: string;

  public isActive?: boolean
  
  public created_at?: Date
  
  public updated_at?: Date

  public deleted_at?: Date

  @ApiProperty({
    type: String,
    description: 'The id of category',
    default: '',
  })
 
  public category_id?: string;

  @ApiProperty({
    type: String,
    description: 'The id of user (author)',
    default: '',
  })
  public user_id?: string;
}
