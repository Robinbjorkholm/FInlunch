import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.common["x-authToken"] = Cookies.get("jwt");

export default function deleteFood(id) {
  axios
    .delete(`${process.env.REACT_APP_APIENDPOINT}/foods/${id}`)
    .catch(function (error) {
      console.log(error);
    });
}
