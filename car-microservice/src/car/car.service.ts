import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Car } from './entity/car.entity';
import { BookingCarDto, GetCarsDto } from './dto/car.dto';
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

  async bookingCar(bookingCarDto: BookingCarDto) {
    try {
      const { carId, startDate, endDate } = bookingCarDto;

      const car = await this.carRepository.findOne({
        where: { id: carId },
        relations: ['bookings'],
      });

      if (!car) {
        throw new Error('Car not found');
      }

      const isCarAvailable = car.bookings.every(
        (booking) =>
          moment(booking.startDate).isAfter(moment(endDate)) ||
          moment(booking.endDate).isBefore(moment(startDate)),
      );

      if (!isCarAvailable) {
        throw new Error('Car is not available');
      }

      const durationInHours = moment(endDate).diff(moment(startDate), 'hours');
      const hourlyRate = car.pricePerDay / 24; // Assuming pricePerDay is for a full day
      const totalPrice = durationInHours * hourlyRate;

      const booking = new Booking();
      booking.car = car;
      booking.startDate = moment(startDate).toDate();
      booking.endDate = moment(endDate).toDate();
      booking.userId = bookingCarDto.userId;
      booking.totalPrice = Number(totalPrice.toFixed(2));

      return await this.bookingRepository.save(booking);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
