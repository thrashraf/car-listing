import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [NatsClientModule, AuthModule],
  controllers: [CarsController],
  providers: [],
})
export class CarsModule {}
