const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Likes = sequelize.define("Likes", {});

module.exports = Likes;
