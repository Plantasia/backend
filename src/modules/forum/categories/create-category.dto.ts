import { IsEmpty, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import { Topic } from '@entities/topic.entity';
import { Comment } from '@entities/comments.entity';
export class CreateCategoryDTO {

  @IsEmpty()
  public id:string


  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of new category',
    default: '',
  })
  public  name: string;


  @IsEmpty()
  public  authorSlug: string;


  @IsEmpty()
  public  authorLogin: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of your new category',
    default: '',
  })
  public  description: string;


  @ApiProperty({
    type: String,
    description: 'Name of your new category',
    default: '',
  })
  public  imageStorage: string;



  @IsEmpty()
  public  isActive: boolean;

  @IsEmpty()
  public  topics: Topic[];

  @IsEmpty()
  public  lastTopic: Topic

  @IsEmpty()
  public qtdeTopics: number;

  @IsEmpty()
  public totalComments: number;

  @IsEmpty()
  public lastComment: Date
}
