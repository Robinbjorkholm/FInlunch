import axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function verifyEmail(id, token) {
  return axios
    .get(
      `${process.env.REACT_APP_APIENDPOINT}/users/verifyEmail/${id}/${token}`,

      { headers: headers }
    )
    .catch(function (error) {
      const { response } = error;
      return response.data;
    });
}
