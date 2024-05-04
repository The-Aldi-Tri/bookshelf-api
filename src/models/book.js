const Sequelize = require("sequelize");
const sequelize = require("../connection/database");

const Book = sequelize.define(
  "book",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.STRING,
    },
    summary: {
      type: Sequelize.STRING,
    },
    publisher: {
      type: Sequelize.STRING,
    },
    pageCount: {
      type: Sequelize.INTEGER,
    },
    readPage: {
      type: Sequelize.INTEGER,
    },
    reading: {
      type: Sequelize.BOOLEAN,
    },
    finished: {
      type: Sequelize.BOOLEAN,
    },
    insertedAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: "Books",
  }
);

module.exports = Book;
