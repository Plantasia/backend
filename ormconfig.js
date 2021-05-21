module.exports = {
  type: 'mysql',
  username: process.env.ORM_USER,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  host: 'database',
  synchronize: true,
  port: 3306,
  logging: true,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/database/migations/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir:"src/database/migrations"
  },
};
