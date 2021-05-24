import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Username',
    default: '',
  })
  public name: string;

  @ApiProperty({
    type: String,
    description: 'user bio',
    default: '',
  })
  public bio: string;

  @IsEmpty()
  public role: string;

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    default: '',
  })
  public avatar: string;

  @IsNotEmpty({message: 'Email não pode estar vazio'})
  @ApiProperty({
    type: String,
    description: 'Email',
    default: '',
  })
  public email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
    default: '',
  })
  public password: string;

  @IsEmpty()
  public isActive: boolean;

  @IsEmpty()
  public quarentineNum: number;

  @IsEmpty()
  public tokenLogout: string;

  @IsEmpty()
  public recoverToken: string;
}
