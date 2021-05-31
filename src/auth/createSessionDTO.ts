import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSessionDTO {
  @IsNotEmpty({message:"Nome do usuário não pode ser vazio"})
  @ApiProperty({
    type: String,
    description: 'Name of user',
    default: '',
  })
  public name: string;

  @IsNotEmpty({message:"Nome do email não pode ser vazio"})
  @ApiProperty({
    type: String,
    description: 'Email of user',
    default: '',
  })
  public email: string;

  @ApiProperty({
    type: String,
    description: 'User which comes from Request Object (cookie)',
    default: '',
  })
  public user: any;

  public headers: { authorization: string };
}
