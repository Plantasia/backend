import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  NotFoundException,
  Body,
  Patch,
  Param,
  ValidationPipe,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateSessionDTO } from './createSessionDTO';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NewPasswordDto } from './newPassworDTO';
import { UserService } from '@src/modules/profile/user/user.service';

@ApiTags('Signin & Signup')
@Controller()
export class AuthController {
  constructor( private authService: AuthService,
               private userService: UserService ) { }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOkResponse({ description: 'user succesfully logged' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  login(@Request() req: CreateSessionDTO) {
    console.log(req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin/admin')
  @ApiOkResponse({ description: 'user succesfully logged' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async loginAdmin(@Request() req: CreateSessionDTO) {
    console.log(req.user)

    const isAdmin = await this.userService.checkIfIsAdmin(req.user.id);
    console.log("isAdmin")
    console.log(isAdmin)
    if (!isAdmin) {
      throw new ForbiddenException(" Você não é um administrador")
    }
    return this.authService.login(req.user);
  }


  @UseGuards(LocalAuthGuard)
  @Get('logout')
  async logout(@Request() req: any) {
    const userToken = req.headers.authorization;
    const userIsLogged = await this.authService.checkToken(userToken);

    if (!userIsLogged) {
      throw new NotFoundException({ error: 'Esse usuário não esta logado' });
    }

    return this.authService.logout(req.user.email);
  }

  @Post('/send-recover-email')
  async sendRecoverPasswordEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) newPasswordDto: NewPasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, newPasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }
}
