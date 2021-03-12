const path = require('path');

module.exports = {
  type: 'mysql',
  database: 'plantasia',
  username: 'root',
  password: 'plantasia@123',
  host: 'database',
  synchronize: false,
  port: 3306,
  logging: true,
  entities: [path.resolve(__dirname, 'build', 'entities', '*')],
  migrations: [path.resolve(__dirname, 'build', 'database', 'migrations', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'src', 'entities'),
    migrationsDir: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};