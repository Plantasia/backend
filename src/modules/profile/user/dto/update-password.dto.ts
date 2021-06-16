import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
  @ApiProperty({
    type: String,
    description: 'Old password',
    default: '',
  })
  public oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'new password',
    default: '',
  })
  public newPassword: string;
}
