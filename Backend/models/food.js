const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Comments = require("./comment");
const Likes = require("./like");

const Foods = sequelize.define("Foods", {
  foodName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 255,
      notNull: true,
    },
  },
  foodType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 1,
      max: 255,
    },
  },
  foodDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 1,
      notNull: true,
    },
  },
  foodAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  foodImage: {
    type: DataTypes.STRING,
    allownull: true,
  },

  foodRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
      notNull: true,
    },
  },
  foodCost: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foodCostMeal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Foods.hasMany(Comments, {
  onDelete: "cascade",
  foreignKey: "foodId",
});
Foods.hasMany(Likes, {
  onDelete: "cascade",
  foreignKey: "foodId",
});

module.exports = Foods;
