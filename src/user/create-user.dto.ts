import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  public readonly userDescription: string;
  public readonly role: string;

  public readonly avatar: string;
  @IsNotEmpty()
  public readonly email: string;
  @IsNotEmpty()
  public readonly password: string;

  public readonly isActive: boolean;
  public readonly quarentineNum: number;
}

/** MUST TO CREATE A NEW USER

  * {
	 "name":"string",
	 "email":"marcos_v.23@hotmail.com",
	 "role": "string",
   "password":"string"

    } */
