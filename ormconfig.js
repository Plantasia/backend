const path = require('path')

module.exports = {
  type: 'mysql',
  username: process.env.ORM_USER,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  host: 'database',
  synchronize: true,
  port: 3306,
  logging: true,
  entities: [path.resolve('build', 'entities', '*')],
  migrations: ['./src/database/migations/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations',
  },
};
