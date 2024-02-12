import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/guards/auth.guard';
import { getCarsDto } from './dto/cars.dto';

@Controller('cars')
export class CarsController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Get('get')
  greet(): Observable<any> {
    return this.client.send(
      {
        cmd: 'get_cars',
      },
      getCarsDto,
    );
  }
}
