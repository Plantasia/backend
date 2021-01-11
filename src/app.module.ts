import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/forum/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './modules/forum/comments/comments.module';
import { TopicModule } from './modules/forum/topics/topic.module';
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
