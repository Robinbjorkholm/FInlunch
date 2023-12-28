const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const EmailToken = sequelize.define("EmailToken", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: "cascade",
    onDelete: "cascade",
    references: { model: "Users", key: "id" },
  },

  emailToken: {
    type: DataTypes.STRING,
  },
});

module.exports = EmailToken;
