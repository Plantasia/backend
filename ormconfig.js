const path = require('path')

module.exports = {
  type: 'mysql',
  username: process.env.ORM_USER,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  host: 'database',
  synchronize: true,
  port: process.env.DATABASE_PORT,
  logging: false,
  entities: ['./build/entitites/*.js'],
  migrations: ['./src/database/migations/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations',
  },
};
