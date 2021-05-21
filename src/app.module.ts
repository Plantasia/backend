import 'reflect-metadata';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer/mailer.config';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ForumModule,
    TypeOrmModule.forRoot({}),
    MailerModule.forRoot(mailerConfig),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    })
  ],
})
export class AppModule {}
