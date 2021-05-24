import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {

  @IsNotEmpty({message:"Não é possível criar uma categoria com o conteúdo vazio!"})
  @ApiProperty({
    type: String,
    description: 'Body of Comment',
    default: '',
  })
  public readonly textBody: string;


  @ApiProperty({
    type: String,
    description: 'Reaction',
    default: '',
  })
  @IsEmpty()
  public readonly reaction: string;


  @IsEmpty()
  public readonly disable: boolean;

  @IsEmpty()
  public readonly hasParenteComment: boolean;


  @IsEmpty()
  public readonly idParentComment: string;
  

  @IsEmpty()
  public readonly indexOrder: number;


  @IsNotEmpty({message:"O campo topic_id não pode ser vazio"})
  @ApiProperty({
    type: String,
    description: 'Id of topic',
    default: '',
  })
  public topic_id: string;

}
