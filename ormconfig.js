module.exports = {
  type: 'postgres',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  username: process.env.USERNAME,
  entities: ["dist/**/**/*.entity{.ts,.js}"],
  migrations: ["dist/src/migrations/*.js"],
  migrationsTableName: "plantasia_migrations",
  migrationsRun: true,
  cli: {
    "migrationsDir":  "src/migrations"
  },
  logging: true,

} 