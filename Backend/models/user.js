const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Comments = require("./comment");
const Likes = require("./like");
const EmailToken = require("./emailToken");
const jwt = require("jsonwebtoken");

const Users = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 20],
      notNull: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 1024],
      notNull: true,
    },
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 255],
      notNull: true,
    },
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isConfirmed: {
    type: DataTypes.BOOLEAN,
  },
});

Users.prototype.generateToken = function () {
  const Token = jwt.sign(
    { username: this.username, admin: this.admin, id: this.id },
    process.env.JWTPRIVATEKEY
  );
  return Token;
};

Users.hasMany(Comments, {
  onDelete: "cascade",
});
Users.hasMany(Likes, {
  onDelete: "cascade",
});
Comments.belongsTo(Users, {
  onDelete: "cascade",
});
Likes.belongsTo(Users, {
  onDelete: "cascade",
});
Users.hasOne(EmailToken, {
  as: "emailToken",
  foreignKey: "UserId",
});
EmailToken.belongsTo(Users, {
  as: "user",
  foreignKey: "UserId",
});

module.exports = Users;
