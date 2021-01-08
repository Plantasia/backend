const path = require('path');

/**
 * acredito que (99% de ctz, rs),
 * ESTE ARQUIVO SERVE PARA CONFIGURAÇÃO DO TYPEORM QUANDO FOR
 * UTILIZAR A CLI. ARQUIVOS DE BUILD SÃO DESCRITOS NO @/ormconfig.json
 */
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
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'src', 'db', 'models'),
    migrationsDir: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
};