import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {

  @IsNotEmpty({message:"É necessário o corpo do tópico"})
  @ApiProperty({
    type: String,
    description: 'Body of Comment',
    default: '',
  })
  public readonly textBody: string;
  
  @ApiProperty({
    type: String,
    description: 'id do comentário',
    default: '',
  })
  @IsNotEmpty({ message: "É necessário o Id do comentário" })
  public id: string;

}
