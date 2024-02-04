import Axios from "axios";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function createNewFoodType(foodType) {
  Axios.post(
    `${process.env.REACT_APP_APIENDPOINT}/foodTypes/createFoodType`,
    {
      foodType: foodType,
    },
    { headers: headers }
  ).catch(function (error) {
    console.log(error);
  });
}
