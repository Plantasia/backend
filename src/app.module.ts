import { AuthModule } from './auth/auth.module';
import { Module,  NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import {AuthService} from './/auth/auth.service'
import {  AppService } from './app.service';






@Module({
  imports: [UserModule, AuthModule, ForumModule, AppService,TypeOrmModule.forRoot({})],
})
export class AppModule {}
