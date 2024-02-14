const Foods = require("../models/food");
const Likes = require("../models/like");
const uploadImage = require("../controllers/uploadImage");

//get all foods ( could include all comments for that specific food )
const getFoods = async (req, res) => {
  const foods = await Foods.findAll({
    include: [
      {
        model: Likes,
        attributes: ["foodId", "id", "UserId"],
      },
    ],
  });
  res.send(foods);
};

//create a new food
const createFood = async (req, res) => {
  let newFood = {
    foodName: req.body.foodName,
    foodType: req.body.foodType,
    foodDescription: req.body.foodDescription,
    foodAddress: req.body.foodAddress,
    foodImage: req.file.path,
    foodRating: req.body.foodRating,
    foodCost: req.body.foodCost,
    foodCostMeal: req.body.foodCostMeal,
  };
  const createdFood = await Foods.create(newFood);
  res.send(createdFood);
};

//delete a food by using the id
const deleteFoodById = async (req, res) => {
  let foodId = req.params.id;
  let foodName = req.params.foodName;
  await Foods.destroy({ where: { id: foodId } });
  res.send(` ${foodName} deleted from database`);
};

module.exports = {
  getFoods,
  createFood,
  deleteFoodById,
};
