import { Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthMicroserviceController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Payload() data: AuthDto) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async authorization(@Payload() data: string) {
    return this.authService.authorization(data);
  }
}
