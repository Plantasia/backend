import { AuthModule } from './auth/auth.module';
import { Module,  NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import {AuthService} from './/auth/auth.service'
import {  AppService } from './app.service';
import { AdminModule } from '@admin-bro/nestjs';
import { Database, Resource } from "@admin-bro/typeorm";
import AdminBro from 'admin-bro'
//import { UsersModule } from './users/users.module';
//AdminBro.registerAdapter({ Database, Resource })





@Module({
  imports: [TypeOrmModule.forRoot({}), UserModule, AuthModule, ForumModule, AppService,AdminModule.createAdmin({
    adminBroOptions: {
         rootPath: '/admin',
         resources: [],
 }})],
})
export class AppModule {}
