// src/seeds/car.seed.ts

import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Car } from '../../car/entity/car.entity';

export default class CreateCars implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const carRepository = connection.getRepository(Car);

    // Check if any cars exist in the database
    const existingCarsCount = await carRepository.count();

    // If there are no existing cars, seed data
    if (existingCarsCount === 0) {
      await factory(Car)().createMany(20); // Adjust the number of cars to seed as needed
    }
  }
}
