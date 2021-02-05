
import { Controller, UseGuards, Request, Post, Get, NotFoundException } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateSessionDTO } from './createSessionDTO';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { exception } from 'console';

@ApiTags('Signin & Signup')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)


  @Post('signin')
  @ApiOkResponse({description:"user succesfully logged"})
  @ApiForbiddenResponse({ description:"Forbidden" })
   login(@Request() req: CreateSessionDTO) {

    return this.authService.login(req.user);
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: any) {
    //Colocar o metodo de validar o token
    const userToken = req.headers.authorization;
    
    const userIsLogged = await this.authService.checkToken(userToken)

    if(!userIsLogged){
      throw new NotFoundException({error:"This user is not logged"})
    }

    
    return this.authService.logout(req.user.email);
  }

}