// For future development

const { Car } = require('../models');

const carData = [
  {
    name: 'Nissan GTR R-32',
    type: 'Jdm',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'Nissan GTR R-33',
    type: 'Jdm',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'Nissan GTR R-34',
    type: 'Jdm',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'Nissan GTR R-35',
    type: 'Jdm',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
 
];

const seedCar = () => Car.bulkCreate(carData);

module.exports = seedWhiskey;