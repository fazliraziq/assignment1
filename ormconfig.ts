import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: 'user',
  password: 'user123',
  database: 'order_book',
  entities: [__dirname + '/**/**/*.entity.{ts,js}'],
  migrations: ['migrations/*.{ts,js}'],
  synchronize: true,
};
export default config;