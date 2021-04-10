import 'reflect-metadata';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer/mailer.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ForumModule,
    TypeOrmModule.forRoot({}),
    MailerModule.forRoot(mailerConfig),
  ],
})
export class AppModule {}
