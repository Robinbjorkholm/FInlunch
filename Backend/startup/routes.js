const express = require("express");
const food = require("../routes/foods");
const user = require("../routes/users");
const comment = require("../routes/comments");
const foodTypes = require("../routes/foodTypes");
const like = require("../routes/likes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/foods", food);
  app.use("/users", user);
  app.use("/comments", comment);
  app.use("/foodTypes", foodTypes);
  app.use("/likes", like);
};
