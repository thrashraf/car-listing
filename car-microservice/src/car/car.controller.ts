import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingCarDto, GetCarsDto } from './dto/car.dto';
import { CarService } from './car.service';

@Controller('cars')
export class CarMicroserviceController {
  constructor(private carService: CarService) {}
  @MessagePattern({ cmd: 'get_cars' })
  getCars(@Payload() data: GetCarsDto) {
    return this.carService.getCars(data);
  }

  @MessagePattern({ cmd: 'booking_car' })
  bookingCar(@Payload() data: BookingCarDto) {
    return this.carService.bookingCar(data);
  }
}
