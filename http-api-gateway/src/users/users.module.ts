import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [NatsClientModule, AuthModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
