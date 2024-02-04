import axios from "axios";

export default function deleteFoodType(id) {
  axios
    .delete(
      `${process.env.REACT_APP_APIENDPOINT}/foodTypes/deleteFoodType/${id}`
    )
    .catch(function (error) {
      console.log(error);
    });
}
