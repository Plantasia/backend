import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../modules/profile/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { User } from '@entities/user.entity';
import { CreateUserDTO } from '../modules/profile/user/dto/create-user.dto';
import { NewPasswordDto } from './newPassworDTO';
import { UserDTO } from '@src/modules/profile/user/dto/default-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {
    this.UserRepository = UserRepository;
  }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      return { id: id, name, email };
    } else {
      throw new UnauthorizedException({
        error: 'Usuário ou senha incorretas!',
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
  async checkToken(token: string):Promise<User> {
    const userLogged = await this.UserRepository.findOne({
      where: {
        tokenLogout: token,
      },
    });
    if (userLogged) {
      return userLogged;
    } else {
      throw new NotFoundException({
        error: `O token ${token} não foi encontrado!`,
      });
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
  async updatePasswordLogout(token: string, userId: string) {
    const user = new UserDTO();
    user.tokenLogout = token;
    const update = await this.userService.passwordLogout(userId, user);
    return console.log(update);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.sign(payload);
    await this.updatePasswordLogout('Bearer ' + token, user.id);
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
  async logout(userEmail: string) {
    const clean = this.nullPasswordLogout(userEmail);
    return console.log(clean);
  }

  async nullPasswordLogout(userEmail: string) {
    const user = new UserDTO();
    user.tokenLogout = process.env.LOGOUT_CONSTANT;
    const update = await this.userService.passwordLogoutByEmail(userEmail, user);
    return console.log(update);
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await this.UserRepository.save(user);

    const mail = {
      subject: 'Recuperação de senha',
      template: 'recover-password',
      from: process.env.SENDER_EMAIL,
      to: user.email,
      context: {
        token: user.recoverToken,
      },
    };
    await this.mailerService.sendMail(mail);
  }

  async changePassword(
    id: string,
    newPasswordDto: NewPasswordDto,
  ): Promise<void> {
    const { password, passwordConfirmation } = newPasswordDto;

    if (password != passwordConfirmation)
      throw new UnprocessableEntityException('As senhas não conferem');
    const user = new CreateUserDTO();
    user.password = password;
    await this.userService.changePassword(id, newPasswordDto);
  }

  async resetPassword(
    recoverToken: string,
    newPasswordDto: NewPasswordDto,
  ): Promise<void> {
    const user = await this.userService.findByRecoverToken(recoverToken);
    if (!user) throw new NotFoundException('Token inválido.');

    try {
      await this.changePassword(user.id, newPasswordDto);
    } catch (error) {
      throw error;
    }
  }
}
