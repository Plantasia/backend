import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('SingIn')
  async login(@Request() req: any) {
    console.log(req.header.barear)
    return this.authService.login(req.user);
  }

  @Get('LogOut')
  async logout(@Request() req: any) {
    return console.log(req.user);
  }

}
