
import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateSessionDTO } from './createSessionDTO';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@ApiTags('Signin & Signup')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)


  @Post('SignIn')
  @ApiOkResponse({description:"user succesfully logged"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async login(@Request() req: CreateSessionDTO) {

    return this.authService.login(req.user);
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('LogOut')
  async logout(@Request() req: any) {
    //Colocar o metodo de validar o token
    return this.authService.logout(req.user.email);
  }

}
