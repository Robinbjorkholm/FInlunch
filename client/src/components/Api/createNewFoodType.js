import Axios from "axios";

export default function createNewFoodType(foodType) {
  Axios.post(`${process.env.REACT_APP_APIENDPOINT}/foodTypes/createFoodType`, {
    foodType: foodType,
  }).catch(function (error) {
    console.log(error);
  });
}
