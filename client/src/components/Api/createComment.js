import Axios from "axios";

export default async function createCommment(
  createComment,
  foodId,
  UserId,
  user
) {
  return await Axios.post(
    `${process.env.REACT_APP_APIENDPOINT}/comments/createComment`,
    {
      comment: createComment,
      FoodId: foodId,
      UserId: UserId,
     user:user
    }
  ).catch(function (error) {
    console.log(error);
  });
}
