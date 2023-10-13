const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Like = require("../models/like");
const likeController = require("../controllers/likeController");
const authorization = require("../middleware/authorization");

router.post("/like", likeController.like);
router.get("/getLikes", likeController.getLikes);

module.exports = router;
