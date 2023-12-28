import axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function createAccount(username, password, email, setloading) {
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
      setloading(false);
      Cookies.set("email", email, { expires: 10 });
      Cookies.set("username", username, { expires: 10 });
      window.location.href = "/ConfirmEmail";
    })
    .catch(function (error) {
      setloading(false);
      const { response } = error;
      return response.data;
    });
}
