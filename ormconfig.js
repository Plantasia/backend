const path = require('path');

module.exports = {
  type: 'mysql',
  database: 'plantasia',
  username: 'root',
  password: 'plantasia@123',
  host: 'database',
  synchronize: true,
  port: 3306,
  logging: true,
  entities: [path.resolve(__dirname, 'src', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, 'build', 'db', 'migrations', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'src', 'db', 'models'),
    migrationsDir: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
};