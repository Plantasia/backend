import 'reflect-metadata'
import { AuthModule } from './auth/auth.module';
import { Module,  NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import {AuthService} from './/auth/auth.service'
import {  AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer/mailer.config';
import { CallingSeeders } from './database/seeders/calling-seeders';






@Module({
  imports: [UserModule, AuthModule, ForumModule, AppService,TypeOrmModule.forRoot({}), MailerModule.forRoot(mailerConfig)],
})
export class AppModule {}
