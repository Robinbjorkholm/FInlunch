const FoodTypes = require("../models/foodType");

const getFoodTypes = async (req, res) => {
  const foodTypes = await FoodTypes.findAll({});
  res.send(foodTypes);
};

const createFoodType = async (req, res) => {
  let newFoodType = {
    foodType: req.body.foodType,
  };
  const createdFoodType = await FoodTypes.create(newFoodType);
  res.send(createdFoodType);
};

const deleteFoodType = async (req, res) => {
  let foodTypeId = req.params.id;
  await FoodTypes.destroy({ where: { id: foodTypeId } });
  res.send(`deleted from database`);
};

module.exports = {
  getFoodTypes,
  createFoodType,
  deleteFoodType,
};
