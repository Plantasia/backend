import { IsEmpty, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class CreateCategoryDTO {


  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of new category',
    default: '',
  })
  public readonly name: string;


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
  public readonly description: string;


  @ApiProperty({
    type: String,
    description: 'Name of your new category',
    default: '',
  })
  public readonly imageStorage: string;



  @IsEmpty()
  public readonly isActive: boolean;
}
