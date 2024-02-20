import Axios from "axios";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function createFoodV2(
  foodName,
  foodType,
  foodDescription,

  foodRating,
  foodCost,
  foodCostMeal
) {
  Axios.post(
    `${process.env.REACT_APP_APIENDPOINT}/foods/createFood`,
    {
      foodName: foodName,
      foodDescription: foodDescription,
      foodType: foodType,
      foodRating: foodRating,
      foodCost: foodCost,
      foodCostMeal: foodCostMeal,
    },

    {
      headers: headers,
    }
  ).catch(function (error) {
    console.log(error);
  });
}
