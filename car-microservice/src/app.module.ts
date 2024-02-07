import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { Car } from './car/entity/car.entity';
import { User } from './car/entity/users.entity';
import { Booking } from './car/entity/booking.entity';
import typeOrmConfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Car, User, Booking]),
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
