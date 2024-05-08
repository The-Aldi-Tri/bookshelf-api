require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
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
