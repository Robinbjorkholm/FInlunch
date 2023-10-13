import axios from "axios";

export default function getFoodTypes() {
  return axios
    .get(`${process.env.REACT_APP_APIENDPOINT}/foodTypes/getFoodTypes`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
