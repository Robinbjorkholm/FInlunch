const Comments = require("../models/comment");
const Users = require("../models/user");

//get all comments
const getComments = async (req, res) => {
  const comments = await Comments.findAll({
    include: [
      {
        model: Users,

        attributes: ["username", "id"],
      },
    ],
  });
  res.send(comments);
};

//create a new comment
const createComment = async (req, res) => {
  const { username, admin } = req.body.user;
  let newComment = {
    comment: req.body.comment,
    foodId: req.body.FoodId,
    UserId: req.body.UserId,
    username: username,
    admin: admin,
  };
  const createdComment = await Comments.create(newComment);
  res.send(createdComment);
};

//delete comment
const deleteComment = async (req, res) => {
  let commentId = req.params.commentId;
  const comment = await Comments.findOne({ where: { id: commentId } });
  if (comment.UserId === req.body.user.id || req.body.user.admin === true) {
    await Comments.destroy({ where: { id: commentId } });
    res.status(200).send(`Comment with the id  ${commentId} deleted.`);
    console.log("deleted");
  } else {
    res.status(403).send("Wrong user");
    console.log("error");
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
};
