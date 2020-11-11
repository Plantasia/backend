import {Sequelize} from 'sequelize-typescript';
import { Category  } from '../category/model/category.model'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'plantasia',
      });
      sequelize.addModels([]); /*
       add models here or passing them by modelPaths property*/
      await sequelize.sync();
      return sequelize;
    },
  },
];