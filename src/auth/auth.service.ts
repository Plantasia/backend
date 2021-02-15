import { Injectable,UnauthorizedException, ArgumentsHost, NotFoundException} from '@nestjs/common';
import { UserService } from '../modules/profile/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { tokenToString } from 'typescript';
import { User } from '@entities/user.entity';
import { CreateUserDTO } from '../modules/profile/user/create-user.dto';
import { logoutConstant} from './logout'

import * as bcrypt from 'bcrypt';

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
      //const hash = this.hashingPassword(userPassword);
      return { id: id, name, email};
    }else {
      throw new UnauthorizedException({
        error: 'Incorrect username or password or this users does not exists!'
      });
    }
  }



  /*** 
   *  NOTE:  checkToken(token:string) ==> 
   *   
   *   Only to be used in logout context
   *  to don't permit new using of a token
   *  which was already deactivated by logoff
   * 
   ***/
  async checkToken(token:string){
    
    const userLogged = await this.UserRepository.findOne(
      {
        where:{
        tokenLogout:token
       }
    })
    if( userLogged){
      return userLogged;
    }
    else {
       throw new NotFoundException({error:`The token ${token} was not found!`})
    }
  }

  /** 
   *  NOTE: This is to hashing a password
   *  NOW_NOT_USED!
   * 
   * Function for hashing string, deprecated
   * async hashingPassword(userPassword: string){
   * const saltOrRounds = 5;
   * const hash = await bcrypt.hash(userPassword, saltOrRounds);
   * return hash }
   **/

   /**
    *
    * NOTE:
    *  
    **/
  async updatePassworLogout(token:string, userId:string ){
    const user = new CreateUserDTO();
    user.tokenLogout=token
    const update = this.userService.passwordLogout(userId,user);
    return console.log(update)
  } 

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.sign(payload)
    const update = await this.updatePassworLogout("Bearer "+token,user.id)
    console.log("Logado")
    return {
      access_token: token,
    };
  }


  /**
   * 
   * NOTE: This method is 
   * to clean token from DB 
   * 
   **/
  async logout(userEmail:string) {
   
    const clean = this.nullPasswordLogout(userEmail);
    return console.log(clean)
  }


  async nullPasswordLogout(userEmail:string){
    const user = new CreateUserDTO();
    user.tokenLogout=logoutConstant.constant
    const update = await this.userService.passwordLogoutByEmail(userEmail,user);
    return console.log(update)
  }

}
