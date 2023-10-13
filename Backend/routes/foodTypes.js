const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const FoodTypes = require("../models/foodType");
const authorization = require("../middleware/authorization");
const admin = require("../middleware/admin");
const foodTypeController = require("../controllers/foodTypesController");

router.post(
  "/createFoodType",
  [authorization, admin],
  foodTypeController.createFoodType
);
router.get("/getFoodTypes", foodTypeController.getFoodTypes);
router.delete(
  "/deleteFoodType/:id",
  [authorization, admin],
  foodTypeController.deleteFoodType
);

module.exports = router;
