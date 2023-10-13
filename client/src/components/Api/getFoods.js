import axios from "axios";

export default function getFoods() {
  return axios
    .get(`${process.env.REACT_APP_APIENDPOINT}/foods/getFoods`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
