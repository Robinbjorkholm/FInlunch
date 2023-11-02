const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");
const authorization = require("../middleware/authorization");

router.post("/registerUser", userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.post("/sendResetEmail", userController.sendResetEmail);
router.get("/me", authorization, userController.getCurrentUser);
router.get("/verifyEmail/:id/:token", userController.verifyEmail);
router.post("/resetPassword/:id/:token", userController.resetPassword);

module.exports = router;
