import Axios from "axios";

const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  },
};

export default function createFood(
  foodName,
  foodType,
  foodDescription,
  //foodAddress,
  //foodImage,
  foodRating,
  foodCost,
  foodCostMeal
) {
  const formData = new FormData();
  formData.append("foodName", foodName);
  formData.append("foodType", foodType);
  formData.append("foodDescription", foodDescription);
  //formData.append("foodAddress", foodAddress);
  //formData.append("foodImage", foodImage);
  formData.append("foodRating", foodRating);
  formData.append("foodCost", foodCost);
  formData.append("foodCostMeal", foodCostMeal);

  Axios.post(
    `${process.env.REACT_APP_APIENDPOINT}/foods/createFood`,
    formData,
    {
      headers: headers,
    }
  ).catch(function (error) {
    console.log(error);
  });
}
