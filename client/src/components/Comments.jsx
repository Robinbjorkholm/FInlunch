import React, { useEffect, useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import * as yup from "yup";
import "../styles/comment.css";

//<li className="comment-username">{comment.User.username}</li> line 106
function Comments({
  foodId,
  UserId,
  Comments,
  admin,
  handleDeleteComment,
  user,
  handleCreateComment,
}) {
  const [createComment, setcreateComment] = useState("");
  const [createCommmentLength, setcreateCommentLength] = useState(0);
  const [goToLogin, setgoToLogin] = useState(false);
  const CommentSchema = yup.object().shape({
    comment: yup
      .string()
      .matches(/^\s*\S[\s\S]*$/, "Comment has to be between 1 & 50 characters.")
      .min(1)
      .max(50),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(CommentSchema),
  });

  function submitComment(event) {
    event.preventDefault();
    try {
      handleSubmit(
        handleCreateComment(createComment, foodId, UserId, user.username)
      );
    } catch (error) {}
  }

  const calculateCommentAge = (commentCreatedAt) => {
    const commentAge = moment(new Date(commentCreatedAt)).fromNow();
    return commentAge;
  };

  if (goToLogin) {
    return <Navigate to="/Login" />;
  }

  return (
    <div>
      <div className="create-comment">
        <form onSubmit={submitComment}>
          {" "}
          {user ? (
            <div>
              <p>{createCommmentLength}/50</p>
              <textarea
                {...register("comment", { required: "comment" })}
                className="comment-text-area"
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => {
                  setcreateComment(e.target.value);
                  setcreateCommentLength(e.target.value.length);
                }}
              />
            </div>
          ) : (
            <textarea
              className="comment-text-area"
              type="text"
              placeholder="Login to comment."
              onFocus={() => setgoToLogin(true)}
            />
          )}
          <div className="comment-button-error">
            <button
              type="submit"
              className="comment-post-button"
              disabled={
                errors.comment || !createComment || createCommmentLength > 50
              }
            >
              Comment
            </button>

            <p className="comment-invalid-error-message">
              Comment has to be between 1 & 50 characters.
            </p>
          </div>
        </form>
      </div>
      <div className="comment-section">
        {Comments.filter((comments) => {
          return comments.foodId === foodId;
        })
          .sort((a, b) => {
            return a.createdAt < b.createdAt ? 1 : -1;
          })
          .map((comment) => {
            return (
              <div key={comment.id} className="comment">
                <ul className="comment-user">
                  <li className="comment-username">{comment.username}</li>
                  {comment.admin ? null : (
                    <li className="comment-user-admin"> CEO </li>
                  )}
                  <li className="comment-username-date-created-separator">
                    &nbsp;&#x2022;&nbsp;
                  </li>
                  <li className="comment-date-created">
                    {calculateCommentAge(comment.createdAt)}
                  </li>

                  {UserId === comment.UserId || admin === true ? (
                    <button
                      className="comment-delete-button"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      <RiDeleteBinLine size="24" />
                    </button>
                  ) : null}
                </ul>
                <li className="comment-comment"> {comment.comment} </li>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Comments;
