const Likes = require("../models/like");

const getLikes = async (req, res) => {
  const Like = await Likes.findAll({});
  res.send(Like);
};

const like = async (req, res) => {
  const { foodId, UserId } = req.body;

  const alreadyLiked = await Likes.findOne({
    where: {
      foodId: foodId,
      UserId: UserId,
    },
  });
  if (!alreadyLiked) {
    await Likes.create({ foodId: foodId, UserId: UserId });
    res.json(true);
  } else {
    await Likes.destroy({
      where: {
        foodId: foodId,
        UserId: UserId,
      },
    });
    res.json(false);
  }
};

module.exports = {
  like,
  getLikes,
};
