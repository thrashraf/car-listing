import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { Car } from './car/entity/car.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      database: 'car_listing',
      username: 'admin',
      password: 'root',
      synchronize: true,
      entities: [Car],
    }),
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
