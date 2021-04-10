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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateSessionDTO } from './createSessionDTO';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { NewPasswordDto } from './newPassworDTO';

@ApiTags('Signin & Signup')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOkResponse({ description: 'user succesfully logged' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  login(@Request() req: CreateSessionDTO) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: any) {
    //Colocar o metodo de validar o token
    const userToken = req.headers.authorization;

    const userIsLogged = await this.authService.checkToken(userToken);

    if (!userIsLogged) {
      throw new NotFoundException({ error: 'This user is not logged' });
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

  @Post('signup')
  async createUser() {}
}
