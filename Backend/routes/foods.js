const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Food = require("../models/food");
const foodController = require("../controllers/foodController");
const authorization = require("../middleware/authorization");
const admin = require("../middleware/admin");
const uploadImage = require("../controllers/uploadImage");

router.post(
  "/createFood",
  [authorization, admin, uploadImage],
  foodController.createFood
);
router.get("/getFoods", foodController.getFoods);
router.delete("/:id", [authorization, admin], foodController.deleteFoodById);

module.exports = router;
