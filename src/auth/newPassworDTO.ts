import { IsString, MinLength, MaxLength } from 'class-validator';

export class NewPasswordDto {
  @IsString({
    message: 'Informe uma senha válida',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'A senha deve ter no máximo 32 caracteres.',
  })
  password: string;

  passwordConfirmation: string;
}
