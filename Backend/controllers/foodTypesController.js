const FoodTypes = require("../models/foodType");

//Get all foodtypes
const getFoodTypes = async (req, res) => {
  const foodTypes = await FoodTypes.findAll({});
  res.send(foodTypes);
};

//Create a new foodtype
const createFoodType = async (req, res) => {
  let newFoodType = {
    foodType: req.body.foodType,
  };
  const createdFoodType = await FoodTypes.create(newFoodType);
  res.send(createdFoodType);
};

// Delete a foodtype
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
