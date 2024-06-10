import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import ".././styles/Like.css";

function Like({ foodId, UserId, Likes, handleLike }) {
  const [foodIsLiked, setfoodIsLiked] = useState(false);
  const [goToLogin, setgoToLogin] = useState(false);
  useEffect(() => {
    likeForFood(foodId, UserId);
  }, []);

  // calculate ammount of likes for each food (likes could instead belong to specific food when fetching from backend so this would not be needed )
  function likeAmount(foodId) {
    const likes = Likes.filter((like) => like.foodId === foodId);
    return likes.length;
  }

  //update ui for like and unliking food
  function likeForFood(foodId, UserId) {
    var likes = Likes.filter((like) => like.foodId === foodId);
    likes = likes.filter((like) => like.UserId === UserId);
    if (likes.length > 0) {
      setfoodIsLiked(true);
    } else {
      setfoodIsLiked(false);
    }
  }

  // Routes the user to login page if they are not logged in
  if (goToLogin) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="flex-row">
      {foodIsLiked ? (
        <BsHeartFill
          color="red"
          fill="red"
          className="like"
          size={24}
          onClick={() => {
            if (!UserId) {
              setgoToLogin(true);
            } else {
              handleLike(foodId, UserId);
              setfoodIsLiked(false);
            }
          }}
        />
      ) : (
        <BsHeart
          className="like"
          size={24}
          onClick={() => {
            if (UserId) {
              handleLike(foodId, UserId);
              setfoodIsLiked(true);
            } else {
              setgoToLogin(true);
            }
          }}
        />
      )}
      <p className="like-amount">{likeAmount(foodId)}</p>
    </div>
  );
}

export default Like;
