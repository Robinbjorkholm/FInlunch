const dbConfig = require("../config/dbConfig");

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAlieases: false,
  pool: {
    min: dbConfig.Pool.min,
    max: dbConfig.Pool.max,
    acquire: dbConfig.Pool.acquire,
    idle: dbConfig.Pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {})
  .catch((error) => {
    console.log("Unable to connect to the database:", error);
  });

const db = {};
db.sequelize = sequelize;
db.sequelize.sync({ forse: false }).then(() => console.log("synced"));

module.exports = db;
