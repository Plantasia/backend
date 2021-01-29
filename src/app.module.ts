import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/profile/user/user.module';
import { ForumModule } from './modules/forum/forum.module';
import { BackofficeModule } from './backoffice/backoffice.module';
@Module({
  imports: [TypeOrmModule.forRoot({}), UserModule, AuthModule, ForumModule, BackofficeModule ],
})
export class AppModule {
  constructor() {}
}
