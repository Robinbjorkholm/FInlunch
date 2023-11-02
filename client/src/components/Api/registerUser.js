import axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function registerUser(username, password, email) {
  return axios
    .post(
      `${process.env.REACT_APP_APIENDPOINT}/users/registerUser`,
      {
        username: username,
        password: password,
        email: email,
      },
      { headers: headers }
    )
    .then((response) => {
      Cookies.set("email", email, { expires: 10 });
      Cookies.set("username", username, { expires: 10 });
      window.location.href = "/ConfirmEmail";
    })
    .catch(function (error) {
      const { response } = error;
      return response.data;
    });
}
