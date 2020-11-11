import { Module } from '@nestjs/common';
import { CategoryModule } from './category/module/category.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TopicsController } from './topics/controllers/topics.controller';
import { CategoryService } from './category/service/category.service';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import {DatabaseModule} from './database/database-module/database-module.module';
@Module({
  imports: [//ConfigModule.forRoot(),
            

      SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'porangaba2305',
      database: 'plantasia',
      autoLoadModels: true,
      synchronize: true,
    }),CategoryModule],

})
export class AppModule {
  constructor() {}
}
