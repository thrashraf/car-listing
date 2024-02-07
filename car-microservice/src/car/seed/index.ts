// import { createConnection } from 'typeorm';
// import { runSeeder } from 'typeorm-seeding';
// import typeOrmConfig from '../../../ormconfig';
// import CreateCars from './car.seed';

// createConnection(typeOrmConfig as any)
//   .then(async (connection) => {
//     try {
//       await runSeeder(CreateCars);
//     } catch (error) {
//       console.error('Error during seeding:', error);
//     } finally {
//       // Close the connection after seeding
//       await connection.close();

//       // Exit the process
//       process.exit();
//     }
//   })
//   .catch((error) => {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   });
