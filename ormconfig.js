const path = require('path');

module.exports = {
  type: 'mysql',
  username: process.env.ORM_USER,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  host: 'database',
  synchronize: false,
  port: 3306,
  logging: true,
  entities: [path.resolve(__dirname, 'build', 'entities', '*')],
  migrations: [path.resolve(__dirname, 'build', 'database', 'migrations', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'build', 'entities', '**.*.js'),
    migrationsDir: path.resolve(
      __dirname,
      'build',
      'database',
      'migrations',
      '*.js',
    ),
  },
};
