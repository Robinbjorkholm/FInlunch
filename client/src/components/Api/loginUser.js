import Axios from "axios";
import Cookies from "js-cookie";

const headers = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function loginUser(LoginUsername, LoginPassword, setloading) {
  return Axios.post(
    `${process.env.REACT_APP_APIENDPOINT}/users/loginUser`,
    {
      username: LoginUsername,
      password: LoginPassword,
    },
    { headers: headers }
  )
    .then((response) => {
      setloading(false);
      const { data: jwt } = response;
      Cookies.set("jwt", jwt, { expires: 10 });
      window.location.href = "/";
    })
    .catch(function (error) {
      setloading(false);
      const { response } = error;
      return response.data;
    });
}
