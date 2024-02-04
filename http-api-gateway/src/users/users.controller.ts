import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto): Observable<any> {
    return this.client.send(
      {
        cmd: 'register_user',
      },
      registerUserDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  greet(): string {
    return 'Hello, World!';
  }
}
