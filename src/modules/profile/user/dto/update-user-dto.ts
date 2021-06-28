import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
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
  public role?: string;

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    default: '',
  })
  public avatar?: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email',
    default: '',
  })
  public email?: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
    default: '',
  })
  public password?: string;

  @IsEmpty()
  public isActive?: boolean;

  @IsEmpty()
  public quarentineNum?: number;

  public isAdmin?: boolean;

  public created_at?: Date;

  public updated_at?: Date;

  public deleted_at?: Date;

  @IsEmpty()
  public tokenLogout?: string;

  @IsEmpty()
  public recoverToken?: string;
}
