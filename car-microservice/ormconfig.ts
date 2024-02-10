import { Car } from './src/car/entity/car.entity';
import { User } from './src/car/entity/users.entity';
import { Booking } from './src/car/entity/booking.entity';

const typeOrmConfig: any = {
  type: 'mysql',
  host: '172.20.10.3',
  port: 3306,
  database: 'car_listing',
  username: 'admin',
  password: 'root',
  synchronize: true,
  entities: [Car, User, Booking],
  seeds: ['src/car/seed/**/*{.ts,.js}'],
};

export default typeOrmConfig;
