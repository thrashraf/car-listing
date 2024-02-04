import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserMicroserviceController {
  constructor(private userService: UsersService) {}
  @MessagePattern({ cmd: 'register_user' })
  registerUser(@Payload() data: RegisterUserDto) {
    return this.userService.registerUser(data);
  }
}
