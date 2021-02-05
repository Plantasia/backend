import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator'


export class CreateSessionDTO{

  
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of user',
    default: '',
  })
  public name:string;



  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email of user',
    default: '',
  })
  public email:string;




  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User which comes from Request Object (cookie)',
    default: '',
  })
  public user: any;

  public headers:{authorization};
}