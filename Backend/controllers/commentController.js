const Comments = require("../models/comment");
const Users = require("../models/user");

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

const createComment = async (req, res) => {
  let newComment = {
    comment: req.body.comment,
    foodId: req.body.FoodId,
    UserId: req.body.UserId,
    username: req.body.username,
  };
  const createdComment = await Comments.create(newComment);
  res.send(createdComment);
};

const deleteComment = async (req, res) => {
  let commentId = req.params.commentId;
  let user = req.body.user;
  await Comments.destroy({ where: { id: commentId } });
  res.send(`Comment with the id  ${commentId} deleted.`);
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
};
