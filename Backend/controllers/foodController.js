const Foods = require("../models/food");
const Likes = require("../models/like");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

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
    //foodImage: req.file.path,
    foodRating: req.body.foodRating,
    foodCost: req.body.foodCost,
    foodCostMeal: req.body.foodCostMeal,
  };
  /*upload.single("foodImage"),
    function (req, res) {
      cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        res.status(200).json({
          success: true,
          message: "Uploaded!",
          data: result,
        });
      });
    };*/
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
