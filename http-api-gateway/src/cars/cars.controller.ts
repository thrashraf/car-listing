import { Controller, Post, Inject, UseGuards, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/guards/auth.guard';
import { BookingCarDto, GetCarsDto } from './dto/cars.dto';

@Controller('cars')
export class CarsController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Post('get')
  getCars(@Body() getCarsDto: GetCarsDto): Observable<any> {
    return this.client.send(
      {
        cmd: 'get_cars',
      },
      getCarsDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post('booking-car')
  bookingCar(@Body() BookingCarDto: BookingCarDto): Observable<any> {
    return this.client.send(
      {
        cmd: 'booking_car',
      },
      BookingCarDto,
    );
  }
}
