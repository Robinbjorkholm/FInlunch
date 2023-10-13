import Axios from "axios";

export default async function likeFood(foodId, UserId) {
  return await Axios.post(`${process.env.REACT_APP_APIENDPOINT}/Likes/like`, {
    foodId: foodId,
    UserId: UserId,
  })
 
    .catch(function (error) {
      console.log(error);
    });
}
