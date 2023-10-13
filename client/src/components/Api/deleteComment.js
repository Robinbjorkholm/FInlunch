import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.common["x-authToken"] = Cookies.get("jwt");

export default function deleteComment(id, user) {
  axios
    .delete(
      `${process.env.REACT_APP_APIENDPOINT}/comments/deleteComment/${id}`,
      { data: user }
    )
    .catch(function (error) {
      console.log(error);
    });
}
