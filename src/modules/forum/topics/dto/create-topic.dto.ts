import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicDTO {
  @ApiProperty({
    type: String,
    description: 'Topic name',
    default: '',
  })
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Body text of topic',
    default: '',
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  public category_id: string;

  @ApiProperty({
    type: String,
    description: 'The id of user (author)',
    default: '',
  })
  @IsNotEmpty()
  public user_id: string;
}
