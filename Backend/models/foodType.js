const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const FoodTypes = sequelize.define("FoodTypes", {
  foodType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 255,
      notNull: true,
    },
  },
});

module.exports = FoodTypes;
