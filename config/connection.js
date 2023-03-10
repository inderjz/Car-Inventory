// Import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// Create connection to our database, pass in your MySQL information for username and password
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME  = 'whiskey_app_db', process.env.DB_USER = 'root', process.env.DB_PW  = 'Livnoor11', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;