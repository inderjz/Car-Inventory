//Placeholders...
const seedCar = require('./car-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCar();
  console.log('\n----- CARS SEEDED -----\n');

  process.exit(0);
};

seedAll();