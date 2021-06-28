import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Topic } from '@entities/topic.entity';
import { Comment } from '@entities/comments.entity';
export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'Nome da categoria não pode ser vazio' })
  @ApiProperty({
    type: String,
    description: 'Name of new category',
    default: '',
  })
  public name: string;

  public authorId: string;

  public authorEmail?: string;

  @IsNotEmpty({ message: 'Descrição da categoria não pode ser vazio' })
  @ApiProperty({
    type: String,
    description: 'Description of your new category',
    default: '',
  })
  public description: string;

  @ApiProperty({
    type: String,
    description: 'Image of your  category',
    default: '',
  })
  public imageStorage?: string;
}
