import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { TopicModule } from './topics/topic.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    CategoryModule,
    CommentsModule,
    UserModule,
    AuthModule,
    TopicModule,
  ],
})
export class AppModule {
  constructor() {}
}
