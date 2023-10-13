import axios from "axios";

export default function getLikes() {
  return axios
    .get(`${process.env.REACT_APP_APIENDPOINT}/Likes/getLikes`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
