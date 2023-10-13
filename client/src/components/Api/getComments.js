import axios from "axios";

export default function getComments() {
  return axios
    .get(`${process.env.REACT_APP_APIENDPOINT}/comments/getComments`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
