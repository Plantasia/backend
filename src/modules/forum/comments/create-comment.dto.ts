import { IsEmpty, IsNotEmpty } from 'class-validator';
import { Topic } from '../../../entities/topic.entity';
import { User } from '@entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Body of Comment',
    default: '',
  })
  public readonly text: string;



  @ApiProperty({
    type: String,
    description: 'Reaction',
    default: '',
  })
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


  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Id of user (author)',
    default: '',
  })
  public user_id: string;
}
