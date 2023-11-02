const express = require("express");
const router = express.Router();
const { Sequelize, DataTypes } = require("sequelize");
const { body, validationResult } = require("express-validator");
const commentController = require("../controllers/commentController");
const authorization = require("../middleware/authorization");

router.post("/createComment", authorization, commentController.createComment);
router.get("/getComments", commentController.getComments);
router.delete(
  "/deleteComment/:commentId",
  authorization,
  commentController.deleteComment
);

module.exports = router;
