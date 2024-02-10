// src/database/factories/car.factory.ts

import { define } from 'typeorm-seeding';
import { Car } from '../../car/entity/car.entity';
import { faker } from '@faker-js/faker';

define(Car, () => {
  const car = new Car();
  car.name = faker.vehicle.model();
  car.model = faker.helpers.arrayElement([
    'Sedan',
    'Coupe',
    'SUV',
    'Hatchback',
    'Convertible',
  ]);
  car.year = String(faker.date.past(20).getFullYear()); // Generate a year from the past 20 years
  car.pricePerDay = faker.datatype.number({ min: 50, max: 200 }); // Updated to use `datatype.number`
  car.available = true;
  car.userId = '1'; // Ensure this is adjusted or dynamically set based on your application's requirements

  return car;
});
