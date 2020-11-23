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