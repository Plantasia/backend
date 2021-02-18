import { AuthModule } from './auth/auth.module';
import { Module,  NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import {AuthService} from './/auth/auth.service'
import {  AppService } from './app.service';
import AdminBro from 'admin-bro';
import { AdminModule } from '@admin-bro/nestjs';
import { Database, Resource } from '@admin-bro/typeorm'
import {User} from '@entities/user.entity'

AdminBro.registerAdapter({ Database, Resource })





@Module({
  imports: [UserModule, AuthModule, ForumModule, AppService,TypeOrmModule.forRoot({}),
    AdminModule.createAdmin({
        adminBroOptions: {
            rootPath: '/admin',
            resources: [User],
          },
          auth: {
            authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
            cookieName: 'test',
            cookiePassword: 'testPass',
          },
    }),],
})
export class AppModule {}
