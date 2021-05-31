import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicDTO {
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
  public readonly imageStorage: string;

  @ApiProperty({
    type: String,
    description: 'The id of category',
    default: '',
  })
  @IsNotEmpty({message:"O campo category_id não pode ser vazio"})
  public category_id: string;

  @ApiProperty({
    type: String,
    description: 'The id of user (author)',
    default: '',
  })
  @IsNotEmpty({message:"O campo user_id não pode ser vazio"})
  public user_id: string;
}
