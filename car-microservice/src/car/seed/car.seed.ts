// src/seeds/car.seed.ts

import { Connection, EntityManager, Repository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Car } from '../entity/car.entity';

const carNames = [
  'Astra',
  'Camry',
  'Civic',
  'Corolla',
  'Accord',
  'Fusion',
  'Cruze',
  'Optima',
  'Malibu',
  'Altima',
  'Maxima',
  'C-Class',
  'E-Class',
  'Golf',
  'Passat',
  'X5',
  'Mazda3',
  'CX-5',
  'F-150',
  'Silverado',
];
const carModels = ['Sedan', 'Coupe', 'SUV', 'Hatchback', 'Convertible'];

export default class CreateCars implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const entityManager: EntityManager = connection.createEntityManager();
    const carRepository: Repository<Car> = entityManager.getRepository(Car);

    // Check if any cars exist in the database
    const existingCarsCount = await carRepository.count();

    // If there are no existing cars, seed data
    if (existingCarsCount === 0) {
      await factory(Car)()
        .map(async (car: Car) => {
          const randomName =
            carNames[Math.floor(Math.random() * carNames.length)];
          const randomModel =
            carModels[Math.floor(Math.random() * carModels.length)];
          const randomYear = String(2020 + Math.floor(Math.random() * 5));
          const randomPrice = 50 + Math.floor(Math.random() * 150);

          car.name = `${randomYear} ${randomName} ${randomModel}`;
          car.model = randomModel;
          car.year = randomYear;
          car.pricePerDay = randomPrice;
          car.available = true;
          car.userId = 'sampleUserId'; // Replace with a valid user ID

          return car;
        })
        .createMany(20);
    }
  }
}
