import axios from "axios";
import { Navigate } from "react-router-dom";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function resetPassword(
  password,
  id,
  token,
  setpasswordUpdatedSuccessfully,
  setloading
) {
  return axios
    .post(
      `${process.env.REACT_APP_APIENDPOINT}/users/resetPassword/${id}/${token}`,
      {
        password: password,
      },
      { headers: headers }
    )
    .then((response) => {
      setpasswordUpdatedSuccessfully(true);
      setloading(false);
    })
    .catch(function (error) {
      const { response } = error;
      return response.data;
    });
}
