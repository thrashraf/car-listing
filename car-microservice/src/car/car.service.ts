import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Car } from './entity/car.entity';
import { GetCarsDto } from './dto/car.dto';
import { Booking } from './entity/booking.entity';
import * as moment from 'moment';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async getCars(getCarsDto: GetCarsDto) {
    const { name, model, minPrice, maxPrice, startDate, endDate } =
      getCarsDto || {};

    const currentDate = moment().toDate();

    const query = this.carRepository.createQueryBuilder('car');

    if (name !== undefined) {
      query.andWhere('car.name LIKE :name', { name: `%${name}%` });
    }

    if (model !== undefined) {
      query.andWhere('car.model LIKE :model', { model: `%${model}%` });
    }

    if (minPrice !== undefined) {
      query.andWhere('car.pricePerDay >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('car.pricePerDay <= :maxPrice', { maxPrice });
    }

    if (startDate !== undefined || endDate !== undefined) {
      const effectiveStartDate = startDate
        ? moment(startDate).toDate()
        : currentDate;
      const effectiveEndDate = endDate
        ? moment(endDate).toDate()
        : moment().add(10, 'years').toDate();

      query
        .leftJoin(
          'car.bookings',
          'booking',
          '(booking.startDate <= :effectiveEndDate OR booking.endDate >= :effectiveStartDate)',
          {
            effectiveStartDate,
            effectiveEndDate,
          },
        )
        .andWhere('booking.id IS NULL')
        .getMany();
    }

    return await query.getMany();
  }
}
