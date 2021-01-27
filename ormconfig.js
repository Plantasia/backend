const path = require('path');
const AdminUser = require('nestjs-admin').AdminUserEntity

module.exports = {
  type: 'mysql',
  database: 'plantasia',
  username: 'root',
  password: 'plantasia@123',
  host: 'database',
  synchronize: true,
  port: 3306,
  logging: true,
  entities: [path.resolve(__dirname, 'build', 'entities', '*'), AdminUser],
  migrations: [path.resolve(__dirname, 'build', 'database', 'migrations', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'src', 'entities'),
    migrationsDir: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};