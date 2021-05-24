import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {
  @IsNotEmpty({message: 'Não é possível criar um comentário vázio'})
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

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Id of topic',
    default: '',
  })
  public topic_id: string;
}
