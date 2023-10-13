import Axios from "axios";

export default async function createCommment(
  createComment,
  foodId,
  UserId,
  username
) {
  return await Axios.post(
    `${process.env.REACT_APP_APIENDPOINT}/comments/createComment`,
    {
      comment: createComment,
      FoodId: foodId,
      UserId: UserId,
      username: username,
    }
  ).catch(function (error) {
    console.log(error);
  });
}
