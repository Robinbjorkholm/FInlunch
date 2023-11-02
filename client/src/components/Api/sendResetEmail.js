import axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function sendResetEmail(email, setemailSent) {
  return axios
    .post(
      `${process.env.REACT_APP_APIENDPOINT}/users/sendResetEmail`,
      {
        email: email,
      },
      { headers: headers }
    )
    .then((response) => {
      setemailSent(true);
    })
    .catch(function (error) {
      const { response } = error;

      return response.data;
    });
}
