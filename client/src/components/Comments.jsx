import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomeContext } from "../App";

import moment from "moment";
import * as yup from "yup";
import "../styles/comment.css";

function Comments({
  foodId,
  UserId,
  Comments,
  admin,
  handleDeleteComment,
  handleCreateComment,
}) {
  const { user } = useContext(HomeContext);
  const [createComment, setcreateComment] = useState("");
  const [createCommmentLength, setcreateCommentLength] = useState(0);
  const [goToLogin, setgoToLogin] = useState(false);
  const [commentAmount, setcommentAmount] = useState(5);

  const CommentSchema = yup.object().shape({
    comment: yup
      .string()
      .matches(
        /^\s*\S[\s\S]*$/,
        "Comment has to be between 1 & 100 characters."
      )
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
        handleCreateComment(createComment, foodId, UserId, user),
        setcreateComment(),
        setcreateCommentLength(0)(
          (document.getElementById("textarea-comment").value = "")
        )
      );
    } catch (error) {}
  }

  //calculate amounts of comments left to be rendered when user expands comments field
  const calculateCommentsLeft = (Comments, foodId, commentAmount) => {
    let newComments = Comments.filter((comments) => {
      return comments.foodId === foodId;
    });
    console.log(newComments);
    newComments = Math.max(0, newComments.length - commentAmount);
    return newComments;
  };
  //calculate time since the comment was created to be displayed next to the comment inside the comments section
  const calculateCommentAge = (commentCreatedAt) => {
    const commentAge = moment(new Date(commentCreatedAt)).fromNow();
    return commentAge;
  };

  //routes user to login page if they are not logged in
  if (goToLogin) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="test">
      <div className="create-comment">
        <form onSubmit={submitComment}>
          {" "}
          {user ? (
            <div>
              <p>{createCommmentLength}/100</p>
              <textarea
                {...register("comment", { required: "comment" })}
                className="comment-text-area"
                type="text"
                id="textarea-comment"
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
                errors.comment || !createComment || createCommmentLength > 100
              }
            >
              Comment
            </button>

            <p className="comment-invalid-error-message">
              Comment has to be between 1 & 100 characters.
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
          .slice(0, commentAmount)
          .map((comment) => {
            return (
              <div key={comment.id} className="comment">
                <ul className="comment-user">
                  <li className="comment-username">{comment.username}</li>
                  {comment.admin === true && (
                    <li className="comment-user-admin"> ADMIN </li>
                  )}
                  <li className="comment-username-date-created-separator">
                    &nbsp;&#x2022;&nbsp;
                  </li>
                  <li>{calculateCommentAge(comment.createdAt)}</li>

                  {UserId === comment.UserId || admin === true ? (
                    <button
                      className="comment-delete-button"
                      onClick={() => handleDeleteComment(comment, user)}
                    >
                      <RiDeleteBinLine size="24" />
                    </button>
                  ) : null}
                </ul>
                <li className="comment-comment"> {comment.comment} </li>
              </div>
            );
          })}{" "}
        <button
          id="button-load-more-comments"
          onClick={() => setcommentAmount(commentAmount + 5)}
        >
          Load more Comments (
          {calculateCommentsLeft(Comments, foodId, commentAmount)})
        </button>
      </div>
    </div>
  );
}

export default Comments;
