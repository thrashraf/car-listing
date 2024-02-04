import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/user.dto';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  registerUser(@Body() registerUserDto: RegisterUserDto): Observable<any> {
    return this.client.send(
      {
        cmd: 'register_user',
      },
      registerUserDto,
    );
  }
}
