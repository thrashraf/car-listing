import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetCarsDto } from './dto/car.dto';
import { CarService } from './car.service';

@Controller('cars')
export class CarMicroserviceController {
  constructor(private carService: CarService) {}
  @MessagePattern({ cmd: 'get_cars' })
  registerUser(@Payload() data: GetCarsDto) {
    return this.carService.getCars(data);
  }
}
