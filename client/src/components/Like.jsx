import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import ".././styles/Like.css";

function Like({ foodId, UserId, Likes, handleLike }) {
  const [foodIsLiked, setfoodIsLiked] = useState(false);
  const [goToLogin, setgoToLogin] = useState(false);
  useEffect(() => {
    likeForFood(foodId, UserId);
  }, []);
  function likeAmount(foodId) {
    const likes = Likes.filter((like) => like.foodId === foodId);
    return likes.length;
  }

  function likeForFood(foodId, UserId) {
    var likes = Likes.filter((like) => like.foodId === foodId);

    likes = likes.filter((like) => like.UserId === UserId);

    if (likes.length > 0) {
      setfoodIsLiked(true);
    } else {
      setfoodIsLiked(false);
    }
  }
  if (goToLogin) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="like-button">
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
