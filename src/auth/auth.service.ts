import { Injectable,UnauthorizedException, ArgumentsHost} from '@nestjs/common';
import { UserService } from '../modules/profile/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { tokenToString } from 'typescript';
import { User } from '@entities/user.entity';
import { CreateUserDTO } from '../modules/profile/user/create-user.dto';
import { logoutConstant} from './logout'

import * as bcrypt from 'bcrypt';
import { blacklist1611788910784 } from 'src/database/migrations/1611788910784-blacklist';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private UserRepository: Repository<User>
    
  ) {
    this.UserRepository = UserRepository;
   }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      const hash = this.hashingPassword(userPassword);
      const teste = this.updatePassworLogout((await hash).toString(),id)
      return { id: id, name, email};
    }else {
      throw new UnauthorizedException({
        error: 'Incorrect username or password'
      });
    }
  }

  async hashingPassword(userPassword: string){
    const saltOrRounds = 5;
    const hash = await bcrypt.hash(userPassword, saltOrRounds);
    return hash
  }

  async updatePassworLogout(hash:string, userId:string ){
    const user = new CreateUserDTO();
    user.passwordLogout=hash
    const update = this.userService.passwordLogout(userId,user);
    return console.log(update)
  } 

  async login(user: any) {
    const payload = { email: user.email, sub: user.id+user.passwordLogout };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userEmail:string) {
    const clean = this.nullPasswordLogout(userEmail);
    return console.log(clean)
  }


  async nullPasswordLogout(userEmail:string){
    const user = new CreateUserDTO();
    user.passwordLogout=logoutConstant.constant
    const update = await this.userService.passwordLogoutByEmail(userEmail,user);
    return console.log(update)
  }



}
