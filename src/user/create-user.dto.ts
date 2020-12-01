export class CreateUserDTO {
    public readonly name: string;
    public readonly userDescription: string;
    public readonly role: string;
    public readonly avatar: string;
    public readonly email: string;
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