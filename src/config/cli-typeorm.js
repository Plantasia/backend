const path = require('path');

/**
 * acredito que (99% de ctz, rs),
 * ESTE ARQUIVO SERVE PARA CONFIGURAÇÃO DO TYPEORM QUANDO FOR
 * UTILIZAR A CLI. ARQUIVOS DE BUILD SÃO DESCRITOS NO @/ormconfig.json
 */
module.exports = {
  type: 'mysql',
  username: process.env.ORM_USER,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  host: 'database',
  synchronize: true,
  port: 3306,
  logging: true,
  entities: path.resolve(__dirname, 'build', 'entities', '**.*.js'),
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'build', 'entities', '**.*.js'),
    migrationsDir: path.resolve(__dirname, '..', 'database', 'migrations'),
  },
};
