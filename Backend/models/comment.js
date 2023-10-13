const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Comments = sequelize.define("Comments", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50],
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 5,
      max: 20,
      notNull: true,
    },
  },
});

module.exports = Comments;
