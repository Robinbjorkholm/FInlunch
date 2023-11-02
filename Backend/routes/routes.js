const express = require("express");
const food = require("./foods");
const user = require("./users");
const comment = require("./comments");
const foodTypes = require("./foodTypes");
const like = require("./likes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/foods", food);
  app.use("/users", user);
  app.use("/comments", comment);
  app.use("/foodTypes", foodTypes);
  app.use("/likes", like);
};
