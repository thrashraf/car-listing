import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetUserDto, RegisterUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserMicroserviceController {
  constructor(private userService: UsersService) {}
  @MessagePattern({ cmd: 'register_user' })
  registerUser(@Payload() data: RegisterUserDto) {
    return this.userService.registerUser(data);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(@Payload() data: GetUserDto) {
    return this.userService.getUser(data);
  }
}
