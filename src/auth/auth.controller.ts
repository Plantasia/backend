
import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateSessionDTO } from './createSessionDTO';
import { LocalAuthGuard } from './local-auth.guard';
@ApiTags('Signin & Signup')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
<<<<<<< HEAD
  @Post('SingIn')
  async login(@Request() req: any,  host: ArgumentsHost) {
=======

  @Post('SignIn')
  @ApiOkResponse({description:"user succesfully logged"})
  @ApiForbiddenResponse({ description:"Forbidden" })
  async login(@Request() req: CreateSessionDTO) {
<<<<<<< HEAD
=======

>>>>>>> fcf18d247512b8d1b2adf3c43c3485e202983b9e
>>>>>>> refactor/newArchiteture
    return this.authService.login(req.user);
    
  }
  
  @Get('LogOut')
  async logout(@Request() req: any) {
    return console.log(req.user);
  }

}
