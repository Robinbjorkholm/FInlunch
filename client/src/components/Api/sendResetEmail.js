import axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function sendResetEmail(email, setloading) {
  return axios
    .post(
      `${process.env.REACT_APP_APIENDPOINT}/users/sendResetEmail`,
      {
        email: email,
      },
      { headers: headers }
    )
    .then((response) => {
      setloading(false)
      Cookies.remove("email");
      Cookies.set("email", email, { expires: 10 });

      window.location.href = "/EmailSent";
    })
    .catch(function (error) {
      const { response } = error;
      return response.data;
    });
}
