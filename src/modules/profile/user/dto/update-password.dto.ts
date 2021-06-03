import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDTO {
  
  @ApiProperty({
    type: String,
    description: 'Old password',
    default: '',
  })
  public oldpassword: string;

  @ApiProperty({
    type: String,
    description: 'new password',
    default: '',
  })
  public newpassword: string;
}
