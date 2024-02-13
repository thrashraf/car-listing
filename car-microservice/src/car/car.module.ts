import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMicroserviceController } from './car.controller';
import { CarService } from './car.service';
import { Car } from './entity/car.entity';
import { Booking } from './entity/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Booking])],
  controllers: [CarMicroserviceController],
  providers: [CarService],
})
export class CarModule {}
