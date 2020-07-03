module.exports = {
  type: process.env.DATABASE_DRIVER,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  seeds: ['src/**/*.seeder{.ts,.js}'],
  cli: {
    'entitiesDir': 'src/modules',
    'migrationsDir': 'src/migrations'
  }
};
