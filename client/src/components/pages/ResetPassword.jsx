import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import resetPassword from "../Api/resetPassword";
import Hero from "../Hero";
import "../../styles/LoginSignup.css";

//schema for validating form
const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password has to be between 10 and 30 characters.")
    .min(10)
    .max(30),
  confirmNewPassword: yup
    .string()
    .required("Passwords must match.")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match."),
});
function ResetPassword(isMobileNavigation) {
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [resetPasswordError, setresetPasswordError] = useState();
  const { id, token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ResetPasswordSchema),
  });
  function submit(event) {
    event.preventDefault();
    handleSubmit(
      resetPassword(newPassword,id,token).then((response) => {
        setresetPasswordError(response);
      })
    );
  }

  return (
    <div>
      <Hero isMobileNavigation={isMobileNavigation} />

      <div className="user-page">
        <div className="user-div">
          <div className="login-header-div">
            <h1 className="form-header"> Reset password</h1>
            {resetPasswordError && (
              <p className="login-form-error-message">{resetPasswordError}</p>
            )}
          </div>

          <form className="user-form" onSubmit={submit}>
            <div className="input-div">
              <input
                {...register("newPassword", {
                  required: "newPassword",
                })}
                type="password"
                name="newPassword"
                className="create-user-input"
                placeholder="New password"
                onChange={(e) => {
                  setnewPassword(e.target.value);
                }}
              ></input>
              {errors.newPassword && (
                <p className="form-error-message">
                  Password has to be between 10 and 30 characters.
                </p>
              )}
            </div>
            <div className="input-div">
              <input
                {...register("confirmNewPassword", {
                  required: "confirmNewPassword",
                })}
                type="password"
                name="confirmNewPassword"
                className="create-user-input"
                placeholder="Confirm password"
                onChange={(e) => {
                  setconfirmNewPassword(e.target.value);
                }}
              ></input>
              {errors.confirmNewPassword && (
                <p className="form-error-message">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
            <button
              type="Submit"
              value="Submit"
              disabled={!isValid}
              className="login-create-submit-button"
            >
              {" "}
              Reset password{" "}
            </button>{" "}
            <p className="create-account-invalid-error-message">
              Please enter required fields.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
