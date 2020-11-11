import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/module/category.module';
import { Connection } from 'typeorm';
import { TopicsController } from './topics/controllers/topics.controller';
import { CategoryService } from './category/service/category.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    CategoryModule,
  ],
  controllers: [TopicsController, UserController],
  providers: [CategoryService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
