const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Comments = sequelize.define("Comments", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
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
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Comments;
