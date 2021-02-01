import { Injectable,UnauthorizedException, ArgumentsHost} from '@nestjs/common';
import { UserService } from '../modules/profile/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Blacklist } from '../entities/blacklist.entity'
import { tokenToString } from 'typescript';
import { User } from '@entities/user.entity';
import { CreateUserDTO } from '../modules/profile/user/create-user.dto';

import * as bcrypt from 'bcrypt';
import { blacklist1611788910784 } from 'src/database/migrations/1611788910784-blacklist';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    
  ) { }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      const hash = this.hashingPassword(userPassword);
     
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

  async updatePassworLogout(hash:CreateUserDTO, userId:string ){
    const update = this.userService.passwordLogout(userId, hash) 
    return console.log(update)
  } 

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  /*async findOne(token: string): Promise<Blacklist> {
    return this.blackListRepository.findOne({
      where: {
        token,
      },
    });
  }

  async logout(user: any){
    const access_token = user.access_token;
    const out = await this.findOne(access_token);
      if (out.token != token){

      }
    
  }*/


}
