require("dotenv").config();

module.exports = {
  HOST: process.env.HOSTNAME,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DATABASE,
  dialect: process.env.DIALECT,

  Pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
