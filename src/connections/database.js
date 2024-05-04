require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // defines the maximum time (in milliseconds) that a connection can be idle before being released
      idle: 10000, // defines the maximum time (in milliseconds) that a connection can be idle in the pool before being released
    },
    logging: console.log, // false for disable logging
  }
);

module.exports = sequelize;
