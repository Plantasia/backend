import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Username',
    default: '',
  })
  public readonly name: string;


  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'user bio',
    default: '',
  })
  public readonly bio: string;




  @IsEmpty()
  public readonly role: string;




  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    default: '',
  })
  public readonly avatar: string;




  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email',
    default: '',
  })
  public readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
    default: '',
  })
  public readonly password: string;

  @IsEmpty()
  public readonly isActive: boolean;

  @IsEmpty()
  public readonly quarentineNum: number;

  public readonly isAdmin: boolean;

  @IsEmpty()
  public tokenLogout: string;
}
