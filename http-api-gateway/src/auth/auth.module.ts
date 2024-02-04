import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthMicroserviceController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalStrategy } from './local. strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats'],
        },
      },
    ]),
    JwtModule.register({
      secret: 'thisIsASecretKey',
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
