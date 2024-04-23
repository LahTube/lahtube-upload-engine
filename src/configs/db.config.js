const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgresql",
    schema: "1ahtub3_C0r3",
    port: process.env.DB_PORT,
    logging: process.env.NODE_ENV === "development" ? true : false,
  }
);

module.exports = db;
