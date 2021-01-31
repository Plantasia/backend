import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
@Module({
  imports: [TypeOrmModule.forRoot({}), UserModule, AuthModule, ForumModule],
})
export class AppModule {
  constructor() {}
}
