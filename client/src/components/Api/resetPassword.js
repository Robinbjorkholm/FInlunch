import axios from "axios";
import { Navigate } from "react-router-dom";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function resetPassword(password, id, token) {
  return axios
    .post(
      `${process.env.REACT_APP_APIENDPOINT}/users/resetPassword/${id}/${token}`,
      {
        password: password,
      },
      { headers: headers }
    )
    .then((response) => {
      window.location.href = "/Login";
    })
    .catch(function (error) {
      const { response } = error;
      return response.data;
    });
}
