import { Injectable,UnauthorizedException, ArgumentsHost} from '@nestjs/common';
import { UserService } from '../modules/profile/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Blacklist } from '../entities/blacklist.entity'
import { tokenToString } from 'typescript';
//import {ExpressAdapter} from '@nestjs/platform-express';
import { blacklist1611788910784 } from 'src/database/migrations/1611788910784-blacklist';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    
  ) { }

  async validateUser(userEmail: string, userPassword: string,) {
    const user = await this.userService.findByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      /*const [req, res, next] = host.getArgs();
      console.log(req, res, next)*/
      return { id: id, name, email};
    }else {
      throw new UnauthorizedException({
        error: 'Incorrect username or password'
      });
    }
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
